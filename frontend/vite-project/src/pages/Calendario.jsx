import { useEffect, useState } from "react";
import { getTurnos } from "../services/turnosService";

const BADGE_CLASS = {
    "Liliana Godoy":    "b-li",
    "Andrea Santillán": "b-as",
    "Silvina Godoy":    "b-si",
};

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

export default function Calendario() {
    const [turnos, setTurnos]       = useState([]);
    const [hoy]                     = useState(new Date());
    const [anio, setAnio]           = useState(hoy.getFullYear());
    const [mes, setMes]             = useState(hoy.getMonth());
    const [diaSeleccionado, setDiaSeleccionado] = useState(hoy.getDate());

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = async () => {
        const data = await getTurnos();
        setTurnos(data);
    };

    // -- Helpers calendario --
    const primerDiaMes  = new Date(anio, mes, 1).getDay();
    const diasEnMes     = new Date(anio, mes + 1, 0).getDate();

    const turnosDelMes = turnos.filter(t => {
        const f = new Date(t.fecha);
        return f.getFullYear() === anio && f.getMonth() === mes;
    });

    const turnosPorDia = (dia) =>
        turnosDelMes.filter(t => new Date(t.fecha).getDate() === dia);

    const turnosDiaSeleccionado = turnosPorDia(diaSeleccionado)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const irMesAnterior = () => {
        if (mes === 0) { setMes(11); setAnio(a => a - 1); }
        else setMes(m => m - 1);
        setDiaSeleccionado(1);
    };

    const irMesSiguiente = () => {
        if (mes === 11) { setMes(0); setAnio(a => a + 1); }
        else setMes(m => m + 1);
        setDiaSeleccionado(1);
    };

    const esHoy = (dia) =>
        dia === hoy.getDate() && mes === hoy.getMonth() && anio === hoy.getFullYear();

    // Celdas del grid (blancos + días)
    const celdas = [
        ...Array(primerDiaMes).fill(null),
        ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
    ];

    return (
        <div>
            {/* Encabezado */}
            <div className="sec-head">
                <div className="sec-title">Calendario</div>
                <div className="sec-divider"></div>
            </div>

            <div className="two-col" style={{ marginBottom: "10px", alignItems: "flex-start" }}>
                {/* Grilla del mes */}
                <div className="card">
                    {/* Navegación mes */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                        <button
                            onClick={irMesAnterior}
                            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#888", padding: "0 6px" }}
                        >‹</button>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                            {MESES[mes]} {anio}
                        </div>
                        <button
                            onClick={irMesSiguiente}
                            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#888", padding: "0 6px" }}
                        >›</button>
                    </div>

                    {/* Cabecera días semana */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
                        {DIAS.map(d => (
                            <div key={d} style={{ textAlign: "center", fontSize: "10px", color: "#aaa", fontWeight: "600", padding: "4px 0" }}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Días */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
                        {celdas.map((dia, i) => {
                            if (!dia) return <div key={`blank-${i}`} />;
                            const cantidad   = turnosPorDia(dia).length;
                            const seleccionado = dia === diaSeleccionado;
                            const hoyFlag    = esHoy(dia);
                            return (
                                <div
                                    key={dia}
                                    onClick={() => setDiaSeleccionado(dia)}
                                    style={{
                                        textAlign: "center",
                                        padding: "6px 2px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        background: seleccionado ? "#7F77DD" : hoyFlag ? "#f0efff" : "transparent",
                                        color: seleccionado ? "#fff" : hoyFlag ? "#7F77DD" : "#333",
                                        fontWeight: seleccionado || hoyFlag ? "600" : "400",
                                        fontSize: "13px",
                                        position: "relative",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    {dia}
                                    {cantidad > 0 && (
                                        <div style={{
                                            width: "5px", height: "5px",
                                            borderRadius: "50%",
                                            background: seleccionado ? "#fff" : "#7F77DD",
                                            margin: "2px auto 0",
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Turnos del día seleccionado */}
                <div className="card">
                    <div className="card-title" style={{ marginBottom: "14px" }}>
                        {diaSeleccionado} de {MESES[mes]}
                    </div>

                    {turnosDiaSeleccionado.length === 0 && (
                        <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0", fontSize: "13px" }}>
                            Sin turnos este día.
                        </div>
                    )}

                    {turnosDiaSeleccionado.map((turno) => {
                        const hora      = new Date(turno.fecha).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                        const profNombre = turno.profesional?.nombre ?? "";
                        const badgeCls  = BADGE_CLASS[profNombre] ?? "";
                        const finalizado = turno.estado === "FINALIZADO";

                        return (
                            <div key={turno.id} className="row" style={{ gap: "10px", alignItems: "center" }}>
                                <div className="agenda-time">{hora}</div>
                                <div style={{ flex: "1", minWidth: 0 }}>
                                    <div className="agenda-name">{turno.cliente?.nombre}</div>
                                    <div className="mov-meta">
                                        {profNombre && (
                                            <span className={`badge ${badgeCls}`} style={{ fontSize: "10px" }}>
                                                {profNombre.split(" ")[0]}
                                            </span>
                                        )}
                                        {turno.servicio?.nombre && (
                                            <span className="agenda-serv">{turno.servicio.nombre}</span>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className={`badge ${finalizado ? "b-used" : "b-warn"}`}
                                    style={{ fontSize: "10px", flexShrink: 0 }}
                                >
                                    {finalizado ? "Finalizado" : "Pendiente"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}