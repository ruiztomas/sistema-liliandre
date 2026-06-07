import { useEffect, useState } from "react";
import { getTurnos, finalizarTurno } from "../services/turnosService";
import Modal from "../components/Modal";
import ModalNuevoTurno from "../components/ModalNuevoTurno";

const BADGE_CLASS = {
    "Liliana Godoy":    "b-li",
    "Andrea Santillán": "b-as",
    "Silvina Godoy":    "b-si",
};

const METODO_LABEL = {
    EFECTIVO:      "Efectivo",
    MERCADOPAGO:   "Mercado Pago",
    TRANSFERENCIA: "Transferencia",
    TARJETA:       "Tarjeta",
    GIFT_CARD:     "Gift Card",
};

const ESTADO_LABEL = {
    PENDIENTE:   { label: "Pendiente",   cls: "b-warn" },
    CONFIRMADO:  { label: "Confirmado",  cls: "b-in"   },
    FINALIZADO:  { label: "Finalizado",  cls: "b-used" },
    CANCELADO:   { label: "Cancelado",   cls: "b-out"  },
};

export default function Turnos() {
    const [turnos, setTurnos]                       = useState([]);
    const [loading, setLoading]                     = useState(true);
    const [modalNuevo, setModalNuevo]               = useState(false);
    const [modalFinalizar, setModalFinalizar]       = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [metodoPago, setMetodoPago]               = useState("EFECTIVO");
    const [filtroProfesional, setFiltroProfesional] = useState("Todas las profesionales");
    const [filtroEstado, setFiltroEstado]           = useState("Todos");

    const cargarTurnos = async () => {
        try {
            const data = await getTurnos();
            setTurnos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarTurnos();
    }, []);

    const handleFinalizar = async () => {
        try {
            await finalizarTurno(turnoSeleccionado, metodoPago);
            await cargarTurnos();
            setModalFinalizar(false);
            setTurnoSeleccionado(null);
        } catch (error) {
            console.error(error);
        }
    };

    // Métricas
    const pendientes  = turnos.filter(t => t.estado !== "FINALIZADO" && t.estado !== "CANCELADO");
    const finalizados = turnos.filter(t => t.estado === "FINALIZADO");
    const hoy         = new Date().toDateString();
    const turnosHoy   = turnos.filter(t => new Date(t.fecha).toDateString() === hoy);

    // Filtrado
    const turnosFiltrados = turnos.filter(t => {
        const matchProf   = filtroProfesional === "Todas las profesionales" || t.profesional?.nombre === filtroProfesional;
        const matchEstado = filtroEstado === "Todos" || t.estado === filtroEstado;
        return matchProf && matchEstado;
    });

    if (loading) {
        return (
            <div>
                <div className="sec-head">
                    <div className="sec-title">Turnos</div>
                    <div className="sec-divider"></div>
                </div>
                <p style={{ color: "#aaa", padding: "20px 0" }}>Cargando turnos...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Encabezado */}
            <div className="sec-head">
                <div className="sec-title">Turnos</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total turnos</div>
                    <div className="metric-value purple">{turnos.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Pendientes</div>
                    <div className="metric-value amber">{pendientes.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Finalizados</div>
                    <div className="metric-value green">{finalizados.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Turnos hoy</div>
                    <div className="metric-value">{turnosHoy.length}</div>
                </div>
            </div>

            {/* Listado */}
            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Todos los turnos</div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <select value={filtroProfesional} onChange={e => setFiltroProfesional(e.target.value)}>
                            <option>Todas las profesionales</option>
                            <option>Liliana Godoy</option>
                            <option>Andrea Santillán</option>
                            <option>Silvina Godoy</option>
                        </select>
                        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                            <option value="Todos">Todos los estados</option>
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="CONFIRMADO">Confirmado</option>
                            <option value="FINALIZADO">Finalizado</option>
                            <option value="CANCELADO">Cancelado</option>
                        </select>
                        <button onClick={() => setModalNuevo(true)}>+ Nuevo</button>
                    </div>
                </div>

                {turnosFiltrados.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>
                        Sin turnos para mostrar.
                    </div>
                )}

                {turnosFiltrados.map((turno) => {
                    const estado     = ESTADO_LABEL[turno.estado] ?? { label: turno.estado, cls: "" };
                    const profNombre = turno.profesional?.nombre ?? "";
                    const badgeCls   = BADGE_CLASS[profNombre] ?? "";
                    const fechaDate  = new Date(turno.fecha);
                    const hora       = fechaDate.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                    const fecha      = fechaDate.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });

                    return (
                        <div key={turno.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                            <div className="agenda-time" style={{ minWidth: "48px", textAlign: "center" }}>
                                <div style={{ fontSize: "13px", fontWeight: "600" }}>{hora}</div>
                                <div style={{ fontSize: "10px", color: "#aaa" }}>{fecha}</div>
                            </div>
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div className="mov-concepto">{turno.cliente?.nombre}</div>
                                <div className="mov-meta">
                                    {profNombre && (
                                        <span className={`badge ${badgeCls}`} style={{ fontSize: "10px" }}>
                                            {profNombre.split(" ")[0]}
                                        </span>
                                    )}
                                    {turno.servicio?.nombre && (
                                        <span style={{ fontSize: "11px", color: "#888" }}>{turno.servicio.nombre}</span>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                                <span className={`badge ${estado.cls}`} style={{ fontSize: "10px" }}>
                                    {estado.label}
                                </span>
                                {turno.estado !== "FINALIZADO" && turno.estado !== "CANCELADO" && (
                                    <button
                                        style={{ fontSize: "11px", padding: "3px 10px", cursor: "pointer" }}
                                        onClick={() => { setTurnoSeleccionado(turno.id); setModalFinalizar(true); }}
                                    >
                                        Finalizar
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <ModalNuevoTurno
                abierto={modalNuevo}
                onClose={() => setModalNuevo(false)}
                onSuccess={cargarTurnos}
            />

            <Modal
                abierto={modalFinalizar}
                titulo="Finalizar Turno"
                onClose={() => setModalFinalizar(false)}
            >
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="MERCADOPAGO">Mercado Pago</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                    <option value="TARJETA">Tarjeta</option>
                    <option value="GIFT_CARD">Gift Card</option>
                </select>
                <button onClick={handleFinalizar}>Confirmar</button>
            </Modal>
        </div>
    );
}