import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import ModalNuevoTurno from "./ModalNuevoTurno";

export default function DashboardSection() {
    const [dashboard, setDashboard] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarDashboard = async () => {
        const data = await getDashboard();
        setDashboard(data);
    };

    useEffect(() => {
        cargarDashboard();
    }, []);

    if (!dashboard) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Dashboard</div>
                <div className="sec-divider"></div>
            </div>

            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Saldo total en caja</div>
                    <div className="metric-value green">${dashboard.balanceMes.toLocaleString("es-AR")}</div>
                    <div className="metric-sub warn">Máx: $20.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Total entradas</div>
                    <div className="metric-value">${dashboard.ingresosMes.toLocaleString("es-AR")}</div>
                    <div className="metric-sub">8 movimientos</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Total salidas</div>
                    <div className="metric-value amber">${dashboard.egresosMes.toLocaleString("es-AR")}</div>
                    <div className="metric-sub">0 movimientos</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Turnos hoy</div>
                    <div className="metric-value purple">{dashboard.turnosHoy}</div>
                    <div className="metric-sub">2 pendientes</div>
                </div>
            </div>

            <div className="two-col" style={{ marginBottom: "10px" }}>
                <div className="card">
                    <div className="card-title">Saldo por profesional</div>
                    {dashboard.resumenProfesionales.map((profesional) => (
                        <div key={profesional.nombre} className="row">
                            <div className="prof-info">
                                <div className="av" style={{ background: profesional.color || "#6b70ff", color: "white" }}>
                                    {profesional.nombre.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="prof-name">{profesional.nombre}</div>
                                    <div className="prof-sub">{profesional.cantidad} turnos</div>
                                </div>
                            </div>
                            <div style={{ fontSize: "14px", fontWeight: "500" }}>
                                ${profesional.total.toLocaleString("es-AR")}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <div className="card-title">Saldo por tipo de pago</div>
                    {dashboard.ingresosPorMetodo.map((item) => (
                        <div key={item.metodoPago} className="row">
                            <div style={{ color: "#888", fontSize: "13px" }}>
                                {item.metodoPago === "MERCADOPAGO"  ? "Mercado Pago"
                                : item.metodoPago === "TRANSFERENCIA" ? "Transferencia"
                                : item.metodoPago === "GIFT_CARD"   ? "Gift Card"
                                : item.metodoPago === "TARJETA"     ? "Tarjeta"
                                : "Efectivo"}
                            </div>
                            <div style={{ fontSize: "13px", fontWeight: "500" }}>
                                ${item._sum.monto.toLocaleString("es-AR")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Agenda de hoy</div>
                    <button onClick={() => setModalAbierto(true)}>+ Nuevo Turno</button>
                </div>

                {dashboard.agendaHoy.map((turno) => (
                    <div key={turno.id} className="row" style={{ gap: "10px" }}>
                        <div className="agenda-time">
                            {new Date(turno.fecha).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div style={{ flex: "1" }}>
                            <div className="agenda-name">{turno.cliente.nombre}</div>
                            <div className="agenda-serv">{turno.servicio.nombre}</div>
                        </div>
                        <div className="badge">{turno.profesional.nombre}</div>
                    </div>
                ))}
            </div>

            <ModalNuevoTurno
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onSuccess={cargarDashboard}
            />
        </div>
    );
}