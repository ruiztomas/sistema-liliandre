import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getProfesionales, createProfesional, updateProfesional } from "../services/profesionalesService";

const BADGE_CLASS = {
    "Liliana Godoy":    "b-li",
    "Andrea Santillán": "b-as",
    "Silvina Godoy":    "b-si",
};

export default function Profesionales() {
    const [profesionales, setProfesionales]       = useState([]);
    const [modalAbierto, setModalAbierto]         = useState(false);
    const [modoEdicion, setModoEdicion]           = useState(false);
    const [profesionalActual, setProfesionalActual] = useState(null);
    const [nombre, setNombre]                     = useState("");
    const [color, setColor]                       = useState("#7F77DD");

    const cargarProfesionales = async () => {
        const data = await getProfesionales();
        setProfesionales(data);
    };

    useEffect(() => { cargarProfesionales(); }, []);

    const abrirNuevo = () => {
        setModoEdicion(false);
        setProfesionalActual(null);
        setNombre("");
        setColor("#7F77DD");
        setModalAbierto(true);
    };

    const abrirEdicion = (prof) => {
        setModoEdicion(true);
        setProfesionalActual(prof);
        setNombre(prof.nombre);
        setColor(prof.color);
        setModalAbierto(true);
    };

    const handleGuardar = async () => {
        try {
            if (modoEdicion) await updateProfesional(profesionalActual.id, { nombre, color });
            else await createProfesional({ nombre, color });
            await cargarProfesionales();
            setModalAbierto(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Profesionales</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total profesionales</div>
                    <div className="metric-value purple">{profesionales.length}</div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Equipo</div>
                    <button onClick={abrirNuevo}>+ Nuevo</button>
                </div>

                {profesionales.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>Sin profesionales registradas.</div>
                )}

                {profesionales.map((prof) => {
                    const iniciales = prof.nombre.substring(0, 2).toUpperCase();
                    const badgeCls  = BADGE_CLASS[prof.nombre] ?? "";
                    return (
                        <div key={prof.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                            <div className="prof-info" style={{ flex: "1" }}>
                                <div className="av" style={{ background: prof.color || "#7F77DD", color: "#fff" }}>
                                    {iniciales}
                                </div>
                                <div>
                                    <div className="prof-name">{prof.nombre}</div>
                                    {badgeCls && (
                                        <span className={`badge ${badgeCls}`} style={{ fontSize: "10px" }}>{prof.nombre.split(" ")[0]}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                style={{ fontSize: "11px", padding: "3px 10px", cursor: "pointer", flexShrink: 0 }}
                                onClick={() => abrirEdicion(prof)}
                            >
                                Editar
                            </button>
                        </div>
                    );
                })}
            </div>

            <Modal
                abierto={modalAbierto}
                titulo={modoEdicion ? "Editar Profesional" : "Nueva Profesional"}
                onClose={() => setModalAbierto(false)}
            >
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontSize: "13px", color: "#888" }}>Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                </div>
                <button onClick={handleGuardar}>Guardar</button>
            </Modal>
        </div>
    );
}