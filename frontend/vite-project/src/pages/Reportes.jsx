import { useEffect, useState } from "react";
import { getResumenReportes } from "../services/reportesService";

const BADGE_CLASS = {
    "Liliana Godoy":    "b-li",
    "Andrea Santillán": "b-as",
    "Silvina Godoy":    "b-si",
};

const METODO_LABEL = {
    EFECTIVO:      "Efectivo",
    MERCADOPAGO:   "Merc. Pago",
    TRANSFERENCIA: "Transferencia",
    TARJETA:       "Tarjeta",
    GIFT_CARD:     "Gift Card",
    BANCO:         "Banco",
    VOUCHER:       "Voucher",
};

const BAR_COLORS_PROF   = ["#1D9E75", "#7F77DD", "#EF9F27", "#378ADD"];
const BAR_COLORS_METODO = ["#1D9E75", "#7F77DD", "#378ADD", "#BA7517", "#EF9F27"];

const formatPeso = (n) => "$" + Number(n).toLocaleString("es-AR");

export default function IngresosSection() {
    const [reportes, setReportes]             = useState(null);
    const [periodo, setPeriodo]               = useState("día");
    const [filtroProfesional, setFiltroProfesional] = useState("Todas las profesionales");

    useEffect(() => {
        const cargar = async () => {
            const data = await getResumenReportes();
            setReportes(data);
        };
        cargar();
    }, []);

    if (!reportes) {
        return (
            <div>
                <div className="sec-head">
                    <div className="sec-title">Ingresos</div>
                    <div className="sec-divider"></div>
                </div>
                <p style={{ color: "#aaa", padding: "20px 0" }}>Cargando reportes...</p>
            </div>
        );
    }

    // --- Métricas ---
    const totalPeriodo   = reportes.ingresosPorProfesional?.reduce((acc, p) => acc + Number(p.total), 0) ?? 0;
    const totalTurnos    = reportes.ingresosPorProfesional?.reduce((acc, p) => acc + Number(p.turnos ?? 0), 0) ?? 0;
    const promedioPorTurno = totalTurnos > 0 ? Math.round(totalPeriodo / totalTurnos) : 0;

    // Mejor método de pago
    const metodos = reportes.ingresosPorMetodo ?? [];
    const mejorMetodo = metodos.length > 0
        ? metodos.reduce((a, b) => Number(a.total) > Number(b.total) ? a : b)
        : null;

    // Máximo para calcular % de barras
    const maxProf   = Math.max(...(reportes.ingresosPorProfesional ?? []).map(p => Number(p.total)), 1);
    const maxMetodo = Math.max(...metodos.map(m => Number(m.total)), 1);

    return (
        <div>
            {/* Encabezado */}
            <div className="sec-head">
                <div className="sec-title">Ingresos</div>
                <div className="sec-divider"></div>
            </div>

            {/* Filtros */}
            <div className="filter-row">
                {["día", "mes", "año"].map(p => (
                    <button
                        key={p}
                        className={`filter-btn${periodo === p ? " active" : ""}`}
                        onClick={() => setPeriodo(p)}
                    >
                        Por {p}
                    </button>
                ))}
                <select
                    value={filtroProfesional}
                    onChange={e => setFiltroProfesional(e.target.value)}
                >
                    <option>Todas las profesionales</option>
                    <option>Liliana Godoy</option>
                    <option>Andrea Santillán</option>
                    <option>Silvina Godoy</option>
                </select>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total del período</div>
                    <div className="metric-value green">{formatPeso(totalPeriodo)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Promedio por turno</div>
                    <div className="metric-value">{formatPeso(promedioPorTurno)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mejor método</div>
                    <div className="metric-value purple" style={{ fontSize: "1rem" }}>
                        {mejorMetodo ? (METODO_LABEL[mejorMetodo.metodo] ?? mejorMetodo.metodo) : "—"}
                    </div>
                    <div className="metric-sub">
                        {mejorMetodo ? formatPeso(mejorMetodo.total) : ""}
                    </div>
                </div>
                <div className="metric">
                    <div className="metric-label">Turnos atendidos</div>
                    <div className="metric-value amber">{totalTurnos}</div>
                </div>
            </div>

            {/* Barras */}
            <div className="two-col" style={{ marginBottom: "10px" }}>
                {/* Por profesional */}
                <div className="card">
                    <div className="card-title">Por profesional</div>
                    {(reportes.ingresosPorProfesional ?? []).map((p, i) => (
                        <div key={i} className="bar-wrap">
                            <div className="bar-label">{p.nombre.split(" ")[0]}</div>
                            <div className="bar-bg">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${Math.round((Number(p.total) / maxProf) * 100)}%`,
                                        background: BAR_COLORS_PROF[i % BAR_COLORS_PROF.length],
                                    }}
                                />
                            </div>
                            <div className="bar-val">{formatPeso(p.total)}</div>
                        </div>
                    ))}
                </div>

                {/* Por método de pago */}
                <div className="card">
                    <div className="card-title">Por método de pago</div>
                    {metodos.map((m, i) => (
                        <div key={i} className="bar-wrap">
                            <div className="bar-label">{METODO_LABEL[m.metodo] ?? m.metodo}</div>
                            <div className="bar-bg">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${Math.round((Number(m.total) / maxMetodo) * 100)}%`,
                                        background: BAR_COLORS_METODO[i % BAR_COLORS_METODO.length],
                                    }}
                                />
                            </div>
                            <div className="bar-val">{formatPeso(m.total)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detalle de turnos */}
            <div className="card">
                <div className="card-title">Detalle del {periodo}</div>

                {(reportes.detalleTurnos ?? []).length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>
                        Sin registros para mostrar.
                    </div>
                )}

                {(reportes.detalleTurnos ?? [])
                    .filter(t =>
                        filtroProfesional === "Todas las profesionales" ||
                        t.profesional === filtroProfesional
                    )
                    .map((turno, i) => {
                        const esGiftCard = turno.metodoPago === "GIFT_CARD";
                        return (
                            <div key={i} className="row" style={{ gap: "12px" }}>
                                <div style={{ flex: "1", minWidth: 0 }}>
                                    <div className="mov-concepto">{turno.servicio}</div>
                                    <div className="mov-meta">
                                        {turno.profesional && (
                                            <span
                                                className={`badge ${BADGE_CLASS[turno.profesional] ?? ""}`}
                                                style={{ fontSize: "10px" }}
                                            >
                                                {turno.profesional.split(" ")[0]}
                                            </span>
                                        )}
                                        {turno.hora && <span>{turno.hora} hs</span>}
                                        {esGiftCard && (
                                            <span className="badge b-gc" style={{ fontSize: "10px" }}>
                                                Gift Card
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div className="mov-amount in">{formatPeso(turno.monto)}</div>
                                    <div className="mov-pago-label">
                                        {METODO_LABEL[turno.metodoPago] ?? turno.metodoPago}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}