import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClientes } from "../services/clientesService";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [search, setSearch]     = useState("");

    const cargarClientes = async () => {
        try {
            const data = await getClientes(search);
            setClientes(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { cargarClientes(); }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") cargarClientes();
    };

    const iniciales = (nombre) =>
        nombre.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Clientes</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Total clientes</div>
                    <div className="metric-value purple">{clientes.length}</div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div className="card-title" style={{ margin: 0 }}>Todos los clientes</div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ fontSize: "12px" }}
                        />
                        <button onClick={cargarClientes}>Buscar</button>
                    </div>
                </div>

                {clientes.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>Sin clientes para mostrar.</div>
                )}

                {clientes.map((cliente) => {
                    const ini = iniciales(cliente.nombre);
                    return (
                        <div key={cliente.id} className="row" style={{ gap: "12px", alignItems: "center" }}>
                            <div className="av" style={{ background: "#7F77DD", color: "#fff", flexShrink: 0 }}>
                                {ini}
                            </div>
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div className="prof-name">
                                    <Link to={`/clientes/${cliente.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                        {cliente.nombre}
                                    </Link>
                                </div>
                                <div className="mov-meta">
                                    {cliente.telefono && <span>📞 {cliente.telefono}</span>}
                                    {cliente.email    && <span>✉ {cliente.email}</span>}
                                </div>
                            </div>
                            <Link
                                to={`/clientes/${cliente.id}`}
                                style={{ fontSize: "11px", padding: "3px 10px", flexShrink: 0, textDecoration: "none" }}
                                className="badge b-in"
                            >
                                Ver →
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}