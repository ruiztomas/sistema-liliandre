{/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClienteById } from "../services/clientesService";
import { Link } from "react-router-dom";

export default function ClienteDetalle() {
    const { id } = useParams();

    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarCliente = async () => {
            try {
                const data = await getClienteById(id);
                setCliente(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        cargarCliente();
    }, [id]);

    if (loading) {
        return <h2>Cargando cliente...</h2>;
    }

    if (!cliente) {
        return <h2>Cliente no encontrado</h2>;
    }

    return (
        <div>
            <h1>{cliente.nombre}</h1>

            <p>
                📞 {cliente.telefono || "-"}
            </p>

            <p>
                ✉️ {cliente.email || "-"}
            </p>

            <Link to={`/clientes/${cliente.id}/editar`}>
                <button>
                    Editar cliente
                </button>
            </Link>
            
            <h2>Historial de Turnos</h2>

            {cliente.turnos.length === 0 ? (
                <p>No tiene turnos registrados</p>
            ) : (
                cliente.turnos.map((turno) => (
                    <div
                        key={turno.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p>
                            Fecha:
                            {" "}
                            {new Date(
                                turno.fecha
                            ).toLocaleString()}
                        </p>

                        <p>
                            Servicio:
                            {" "}
                            {turno.servicio.nombre}
                        </p>

                        <p>
                            Profesional:
                            {" "}
                            {turno.profesional.nombre}
                        </p>

                        <p>
                            Estado:
                            {" "}
                            {turno.estado}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}*/}
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getClienteById } from "../services/clientesService";

const BADGE_CLASS = {
    "Liliana Godoy":    "b-li",
    "Andrea Santillán": "b-as",
    "Silvina Godoy":    "b-si",
};

const ESTADO_LABEL = {
    PENDIENTE:  { label: "Pendiente",  cls: "b-warn" },
    CONFIRMADO: { label: "Confirmado", cls: "b-in"   },
    FINALIZADO: { label: "Finalizado", cls: "b-used" },
    CANCELADO:  { label: "Cancelado",  cls: "b-out"  },
};

const iniciales = (nombre) =>
    nombre.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();

export default function ClienteDetalle() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getClienteById(id);
                setCliente(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]);

    if (loading) {
        return (
            <div>
                <div className="sec-head">
                    <div className="sec-title">Cliente</div>
                    <div className="sec-divider"></div>
                </div>
                <p style={{ color: "#aaa", padding: "20px 0" }}>Cargando cliente...</p>
            </div>
        );
    }

    if (!cliente) {
        return (
            <div>
                <div className="sec-head">
                    <div className="sec-title">Cliente</div>
                    <div className="sec-divider"></div>
                </div>
                <p style={{ color: "#aaa", padding: "20px 0" }}>Cliente no encontrado.</p>
            </div>
        );
    }

    const turnos       = cliente.turnos ?? [];
    const finalizados  = turnos.filter(t => t.estado === "FINALIZADO").length;
    const pendientes   = turnos.filter(t => t.estado !== "FINALIZADO" && t.estado !== "CANCELADO").length;

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Cliente</div>
                <div className="sec-divider"></div>
            </div>

            {/* Perfil */}
            <div className="card" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="prof-info">
                        <div className="av" style={{ background: "#7F77DD", color: "#fff", width: "44px", height: "44px", fontSize: "16px" }}>
                            {iniciales(cliente.nombre)}
                        </div>
                        <div>
                            <div className="prof-name" style={{ fontSize: "16px" }}>{cliente.nombre}</div>
                            <div className="mov-meta">
                                {cliente.telefono && <span>📞 {cliente.telefono}</span>}
                                {cliente.email    && <span>✉ {cliente.email}</span>}
                            </div>
                        </div>
                    </div>
                    <Link to={`/clientes/${cliente.id}/editar`}>
                        <button style={{ fontSize: "12px" }}>Editar</button>
                    </Link>
                </div>
                {cliente.notas && (
                    <div style={{ marginTop: "12px", fontSize: "12px", color: "#888", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}>
                        {cliente.notas}
                    </div>
                )}
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total turnos</div>
                    <div className="metric-value purple">{turnos.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Finalizados</div>
                    <div className="metric-value green">{finalizados}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Pendientes</div>
                    <div className="metric-value amber">{pendientes}</div>
                </div>
            </div>

            {/* Historial */}
            <div className="card">
                <div className="card-title">Historial de turnos</div>

                {turnos.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>
                        Sin turnos registrados.
                    </div>
                )}

                {turnos.map((turno) => {
                    const fechaDate  = new Date(turno.fecha);
                    const hora       = fechaDate.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                    const fecha      = fechaDate.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
                    const profNombre = turno.profesional?.nombre ?? "";
                    const badgeCls   = BADGE_CLASS[profNombre] ?? "";
                    const estado     = ESTADO_LABEL[turno.estado] ?? { label: turno.estado, cls: "" };

                    return (
                        <div key={turno.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                            <div className="agenda-time" style={{ minWidth: "48px", textAlign: "center" }}>
                                <div style={{ fontSize: "13px", fontWeight: "600" }}>{hora}</div>
                                <div style={{ fontSize: "10px", color: "#aaa" }}>{fecha}</div>
                            </div>
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div className="mov-concepto">{turno.servicio?.nombre}</div>
                                <div className="mov-meta">
                                    {profNombre && (
                                        <span className={`badge ${badgeCls}`} style={{ fontSize: "10px" }}>
                                            {profNombre.split(" ")[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className={`badge ${estado.cls}`} style={{ fontSize: "10px", flexShrink: 0 }}>
                                {estado.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}