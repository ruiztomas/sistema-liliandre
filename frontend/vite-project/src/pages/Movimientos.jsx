import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getMovimientos, createMovimiento } from "../services/movimientosService";
import "../styles/Movimientos.css";

const BADGE_CLASS = {
    Liliana: "b-li",
    Andrea:  "b-as",
    Silvina: "b-si",
};

const METODO_LABEL = {
    EFECTIVO:      "Efectivo",
    MERCADOPAGO:   "Mercado Pago",
    TRANSFERENCIA: "Transferencia",
    TARJETA:       "Tarjeta",
    GIFT_CARD:     "Gift Card",
    BANCO:         "Banco",
    VOUCHER:       "Voucher",
};

export default function MovimientosSection() {
    const [movimientos, setMovimientos] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    // Form state
    const [tipo, setTipo]             = useState("INGRESO");
    const [monto, setMonto]           = useState("");
    const [metodoPago, setMetodoPago] = useState("EFECTIVO");
    const [descripcion, setDescripcion] = useState("");

    // Filtros
    const [filtroProfesional, setFiltroProfesional] = useState("Todas las profesionales");
    const [filtroTipo, setFiltroTipo]               = useState("Entrada y salida");

    const cargarMovimientos = async () => {
        const data = await getMovimientos();
        setMovimientos(data);
    };

    useEffect(() => {
        cargarMovimientos();
    }, []);

    const handleGuardar = async () => {
        await createMovimiento({ tipo, monto, metodoPago, descripcion });
        await cargarMovimientos();
        setModalAbierto(false);
        // Reset form
        setTipo("INGRESO");
        setMonto("");
        setMetodoPago("EFECTIVO");
        setDescripcion("");
    };

    // Métricas calculadas
    const entradas    = movimientos.filter(m => m.tipo === "INGRESO");
    const salidas     = movimientos.filter(m => m.tipo === "EGRESO");
    const giftCards   = movimientos.filter(m => m.metodoPago === "GIFT_CARD");
    const totalEntradas  = entradas.reduce((acc, m) => acc + Number(m.monto), 0);
    const totalSalidas   = salidas.reduce((acc, m) => acc + Number(m.monto), 0);
    const saldoActual    = totalEntradas - totalSalidas;

    const formatPeso = (n) =>
        "$" + Number(n).toLocaleString("es-AR");

    // Filtrado
    const movimientosFiltrados = movimientos.filter(m => {
        const matchProfesional =
            filtroProfesional === "Todas las profesionales" ||
            m.profesional === filtroProfesional;
        const matchTipo =
            filtroTipo === "Entrada y salida" ||
            (filtroTipo === "Solo entradas" && m.tipo === "INGRESO") ||
            (filtroTipo === "Solo salidas"  && m.tipo === "EGRESO");
        return matchProfesional && matchTipo;
    });

    return (
        <div>
            {/* Encabezado */}
            <div className="sec-head">
                <div className="sec-title">Movimientos</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Saldo actual</div>
                    <div className="metric-value green">{formatPeso(saldoActual)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Entradas</div>
                    <div className="metric-value">{formatPeso(totalEntradas)}</div>
                    <div className="metric-sub">{entradas.length} registros</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Salidas</div>
                    <div className="metric-value red">{formatPeso(totalSalidas)}</div>
                    <div className="metric-sub">{salidas.length} registros</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Gift Cards usadas</div>
                    <div className="metric-value purple">{giftCards.length}</div>
                    <div className="metric-sub">
                        {formatPeso(giftCards.reduce((acc, m) => acc + Number(m.monto), 0))}
                    </div>
                </div>
            </div>

            {/* Tabla de movimientos */}
            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Todos los movimientos</div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <select
                            value={filtroProfesional}
                            onChange={e => setFiltroProfesional(e.target.value)}
                        >
                            <option>Todas las profesionales</option>
                            <option>Liliana</option>
                            <option>Andrea</option>
                            <option>Silvina</option>
                        </select>
                        <select
                            value={filtroTipo}
                            onChange={e => setFiltroTipo(e.target.value)}
                        >
                            <option>Entrada y salida</option>
                            <option>Solo entradas</option>
                            <option>Solo salidas</option>
                        </select>
                        <button onClick={() => setModalAbierto(true)}>
                            + Nuevo
                        </button>
                    </div>
                </div>

                {movimientosFiltrados.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>
                        Sin movimientos para mostrar.
                    </div>
                )}

                {movimientosFiltrados.map((mov) => {
                    const esIngreso  = mov.tipo === "INGRESO";
                    const esGiftCard = mov.metodoPago === "GIFT_CARD";
                    const tieneMeta  = mov.profesional || mov.hora || mov.ticket || esGiftCard;
                    return (
                        <div key={mov.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                            <div className={`mov-icon ${esIngreso ? "mov-in" : "mov-out"}`}>
                                {esIngreso ? "↑" : "↓"}
                            </div>
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div className="mov-concepto">{mov.descripcion}</div>
                                {tieneMeta && (
                                    <div className="mov-meta">
                                        {mov.profesional && (
                                            <span
                                                className={`badge ${BADGE_CLASS[mov.profesional] ?? ""}`}
                                                style={{ fontSize: "10px" }}
                                            >
                                                {mov.profesional}
                                            </span>
                                        )}
                                        {mov.hora    && <span>{mov.hora} hs</span>}
                                        {mov.ticket  && <span>Ticket #{mov.ticket}</span>}
                                        {esGiftCard  && (
                                            <span className="badge b-gc" style={{ fontSize: "10px" }}>
                                                Gift Card
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div className={`mov-amount ${esIngreso ? "in" : "out"}`}>
                                    {esIngreso ? "+" : "-"}{formatPeso(mov.monto)}
                                </div>
                                <div className="mov-pago-label">
                                    {METODO_LABEL[mov.metodoPago] ?? mov.metodoPago}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal nuevo movimiento */}
            <Modal
                abierto={modalAbierto}
                titulo="Nuevo Movimiento"
                onClose={() => setModalAbierto(false)}
            >
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="INGRESO">Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                </select>

                <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={e => setMonto(e.target.value)}
                />

                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="MERCADOPAGO">Mercado Pago</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                    <option value="GIFT_CARD">Gift Card</option>
                </select>

                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />

                <button onClick={handleGuardar}>Guardar</button>
            </Modal>
        </div>
    );
}