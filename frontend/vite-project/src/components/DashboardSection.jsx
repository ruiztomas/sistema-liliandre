import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

export default function DashboardSection(){
    const[dashboard, setDashboard]=useState(null);
    useEffect(()=>{
        const cargarDashboard=async()=>{
            const data=await getDashboard();
            setDashboard(data);
        };
        cargarDashboard();
    }, []);
    if(!dashboard){
        return <p>Cargando...</p>
    }
    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Dashboard</div>
                <div className="sec-divider"></div>
            </div>

            <div className="metrics" style={{marginBottom:"10px"}}>
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

        <div className="two-col" style={{marginBottom:"10px"}}>
            <div className="card">
                <div className="card-title">Saldo por profesional</div>
                {dashboard.resumenProfesionales.map((profesional) => (
                    <div key={profesional.nombre} className="row">
                        <div className="prof-info">
                            <div className="av" style={{background:profesional.color ||"#6b70ff",color:"white",}}>
                                {profesional.nombre
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </div>
                            <div>
                                <div className="prof-name">
                                    {profesional.nombre}
                                </div>
                                <div className="prof-sub">
                                    {profesional.cantidad}
                                    {" "}
                                    turnos
                                </div>
                            </div>
                        </div>
                        <div style={{fontSize:"14px",fontWeight:"500",}}>
                            ${profesional.total.toLocaleString("es-AR")}
                        </div>
                    </div>
                ))}
            </div>
                {/*<div className="row">
                <div className="prof-info">
                    <div className="av av-li">LI</div>
                    <div><div className="prof-name">Liliana Godoy</div><div className="prof-sub">3 movimientos</div></div>
                </div>
                <div style={{fontSize:"14px",fontWeight:"500"}}>$67.000</div>
                </div>
                <div className="row">
                <div className="prof-info">
                    <div className="av av-as">AS</div>
                    <div><div className="prof-name">Andrea Santillán</div><div className="prof-sub">3 movimientos</div></div>
                </div>
                <div style={{fontSize:"14px",fontWeight:"500"}}>$42.000</div>
            </div>
            <div className="row">
                <div className="prof-info">
                    <div className="av av-si">SI</div>
                    <div><div className="prof-name">Silvina Godoy</div><div className="prof-sub">2 movimientos</div></div>
                </div>
                <div style={{fontSize:"14px",fontWeight:"500"}}>$25.000</div>
                </div>*/}

            <div className="card">
                <div className="card-title">Saldo por tipo de pago</div>
                {dashboard.ingresosPorMetodo.map((item)=>(
                    <div key={item.metodoPago} className="row">
                        <div style={{color:"#888", fontSize:"13px",}}>
                            {item.metodoPago==="MERCADOPAGO"
                                ? "Mercado Pago"
                                : item.metodoPago==="TRANSFERENCIA"
                                ? "Transferencia"
                                : item.metodoPago==="GIFT_CARD"
                                ? "Gift Card"
                                : item.metodoPago==="TARJETA"
                                ? "Tarjeta"
                                : "Efectivo"}
                        </div>
                        <div style={{fontSize:"13px", fontWeight:"500",}}>
                            ${item._sum.monto.toLocaleString("es-AR")}
                        </div>
                    </div>
                ))}
                {/*<div className="row"><div style={{display:"flex",alignItems:"center",color:"#888",fontSize:"13px"}}><span className="dot" style={{background:"#1D9E75"}}></span>Efectivo</div><div style={{fontSize:"13px",fontWeight:"500"}}>$97.000</div></div>
                <div className="row"><div style={{display:"flex",alignItems:"center",color:"#888",fontSize:"13px"}}><span className="dot" style={{background:"#7F77DD"}}></span>Mercado Pago</div><div style={{fontSize:"13px",fontWeight:"500"}}>$22.000</div></div>
                <div className="row"><div style={{display:"flex",alignItems:"center",color:"#888",fontSize:"13px"}}><span className="dot" style={{background:"#378ADD"}}></span>Banco</div><div style={{fontSize:"13px",fontWeight:"500"}}>$10.000</div></div>
                <div className="row"><div style={{display:"flex",alignItems:"center",color:"#888",fontSize:"13px"}}><span className="dot" style={{background:"#BA7517"}}></span>Voucher</div><div style={{fontSize:"13px",fontWeight:"500"}}>$5.000</div></div>
                <div className="row"><div style={{display:"flex",alignItems:"center",color:"#888",fontSize:"13px"}}><span className="dot" style={{background:"#D85A30"}}></span>Tarjeta</div><div style={{fontSize:"13px",fontWeight:"500"}}>$0</div></div>*/}
            </div>
        </div>

        <div className="card">
            <div className="card-title">Agenda de hoy</div>
            {dashboard.agendaHoy.map((turno)=>(
                <div
                    key={turno.id}
                    className="row"
                    style={{gap: "10px"}}
                >
                    <div className="agenda-time">
                        {new Date(turno.fecha).toLocaleTimeString(
                            "es-AR",
                            {
                                hour:"2-digit",
                                minute:"2-digit",
                            }
                        )}
                    </div>
                    <div style={{flex:"1"}}>
                        <div className="agenda-name">{turno.cliente.nombre}</div>
                        <div className="agenda-serv">{turno.servicio.nombre}</div>
                    </div>
                    <div className="badge">{turno.profesional.nombre}</div>
                </div>
            ))}
            {/*<div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">10:00</div>
                <div style={{flex:"1"}}><div className="agenda-name">María González</div><div className="agenda-serv">Kaping</div></div>
                <div className="badge b-li">Liliana</div>
            </div>
            <div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">11:30</div>
                <div style={{flex:"1"}}><div className="agenda-name">Carla Rodríguez</div><div className="agenda-serv">Lift de pestañas</div></div>
                <div className="badge b-as">Andrea</div>
            </div>
            <div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">13:00</div>
                <div style={{flex:"1"}}><div className="agenda-name">Valentina Cruz</div><div className="agenda-serv">Depilación</div></div>
                <div className="badge b-si">Silvina</div>
            </div>
            <div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">14:00</div>
                <div style={{flex:"1"}}><div className="agenda-name">Sofía Méndez</div><div className="agenda-serv">Bronceado · Gift Card</div></div>
                <div className="badge b-li">Liliana</div>
            </div>
            <div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">16:00</div>
                <div style={{flex:"1"}}><div className="agenda-name">Laura Pérez</div><div className="agenda-serv">Uñas gel</div></div>
                <div className="badge b-as">Andrea</div>
            </div>
            <div className="row" style={{gap:"10px"}}>
                <div className="agenda-time">17:30</div>
                <div style={{flex:"1"}}><div className="agenda-name">Romina Torres</div><div className="agenda-serv">Kaping</div></div>
                <div className="badge b-si">Silvina</div>
            </div>*/}
        </div>
    </div>
    );
}