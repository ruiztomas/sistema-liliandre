import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getServicios, createServicio, updateServicio } from "../services/serviciosService";

const formatPeso = (n) => "$" + Number(n).toLocaleString("es-AR");

export default function Servicios() {
    const [servicios, setServicios]         = useState([]);
    const [modalAbierto, setModalAbierto]   = useState(false);
    const [modoEdicion, setModoEdicion]     = useState(false);
    const [servicioActual, setServicioActual] = useState(null);
    const [nombre, setNombre]               = useState("");
    const [precio, setPrecio]               = useState("");

    const cargarServicios = async () => {
        const data = await getServicios();
        setServicios(data);
    };

    useEffect(() => { cargarServicios(); }, []);

    const abrirNuevo = () => {
        setModoEdicion(false);
        setServicioActual(null);
        setNombre("");
        setPrecio("");
        setModalAbierto(true);
    };

    const abrirEdicion = (servicio) => {
        setModoEdicion(true);
        setServicioActual(servicio);
        setNombre(servicio.nombre);
        setPrecio(servicio.precio);
        setModalAbierto(true);
    };

    const handleGuardar = async () => {
        if (!nombre.trim()) { alert("Debes ingresar un nombre"); return; }
        if (!precio || Number(precio) <= 0) { alert("Debes ingresar un precio válido"); return; }
        try {
            const payload = { nombre, precio: Number(precio) };
            if (modoEdicion) await updateServicio(servicioActual.id, payload);
            else await createServicio(payload);
            await cargarServicios();
            setModalAbierto(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Servicios</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total servicios</div>
                    <div className="metric-value purple">{servicios.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Precio promedio</div>
                    <div className="metric-value green">
                        {servicios.length > 0
                            ? formatPeso(Math.round(servicios.reduce((acc, s) => acc + s.precio, 0) / servicios.length))
                            : "$0"}
                    </div>
                </div>
                <div className="metric">
                    <div className="metric-label">Precio más alto</div>
                    <div className="metric-value">
                        {servicios.length > 0
                            ? formatPeso(Math.max(...servicios.map(s => s.precio)))
                            : "$0"}
                    </div>
                </div>
                <div className="metric">
                    <div className="metric-label">Precio más bajo</div>
                    <div className="metric-value amber">
                        {servicios.length > 0
                            ? formatPeso(Math.min(...servicios.map(s => s.precio)))
                            : "$0"}
                    </div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Todos los servicios</div>
                    <button onClick={abrirNuevo}>+ Nuevo</button>
                </div>

                {servicios.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>Sin servicios registrados.</div>
                )}

                {servicios.map((servicio) => (
                    <div key={servicio.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                        <div style={{ flex: "1", minWidth: 0 }}>
                            <div className="mov-concepto">{servicio.nombre}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                            <div style={{ fontWeight: "600", fontSize: "14px", color: "#1D9E75" }}>
                                {formatPeso(servicio.precio)}
                            </div>
                            <button
                                style={{ fontSize: "11px", padding: "3px 10px", cursor: "pointer" }}
                                onClick={() => abrirEdicion(servicio)}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                abierto={modalAbierto}
                titulo={modoEdicion ? "Editar Servicio" : "Nuevo Servicio"}
                onClose={() => setModalAbierto(false)}
            >
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
                <button onClick={handleGuardar}>Guardar</button>
            </Modal>
        </div>
    );
}