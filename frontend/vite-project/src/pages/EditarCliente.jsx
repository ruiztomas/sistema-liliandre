{/*import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getClienteById,
    updateCliente
} from "../services/clientesService";

export default function EditarCliente() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [notas, setNotas] = useState("");

    useEffect(() => {
        const cargarCliente = async () => {
            const cliente = await getClienteById(id);

            setNombre(cliente.nombre || "");
            setTelefono(cliente.telefono || "");
            setEmail(cliente.email || "");
            setNotas(cliente.notas || "");
        };

        cargarCliente();
    }, [id]);

    const guardar = async (e) => {
        e.preventDefault();

        try {
            await updateCliente(id, {
                nombre,
                telefono,
                email,
                notas,
            });

            alert("Cliente actualizado");
            navigate(`/clientes/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Editar Cliente</h1>

            <form onSubmit={guardar}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                    placeholder="Notas"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                />

                <button type="submit">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}*/}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClienteById, updateCliente } from "../services/clientesService";

export default function EditarCliente() {
    const { id }       = useParams();
    const navigate     = useNavigate();
    const [nombre, setNombre]     = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail]       = useState("");
    const [notas, setNotas]       = useState("");

    useEffect(() => {
        const cargar = async () => {
            const cliente = await getClienteById(id);
            setNombre(cliente.nombre   || "");
            setTelefono(cliente.telefono || "");
            setEmail(cliente.email     || "");
            setNotas(cliente.notas     || "");
        };
        cargar();
    }, [id]);

    const guardar = async () => {
        try {
            await updateCliente(id, { nombre, telefono, email, notas });
            navigate(`/clientes/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Editar Cliente</div>
                <div className="sec-divider"></div>
            </div>

            <div className="card">
                <div className="card-title" style={{ marginBottom: "14px" }}>Datos del cliente</div>

                <div className="row" style={{ flexDirection: "column", gap: "10px", alignItems: "stretch" }}>
                    <div>
                        <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", fontWeight: "500" }}>Nombre</div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            style={{ width: "100%", boxSizing: "border-box" }}
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", fontWeight: "500" }}>Teléfono</div>
                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            style={{ width: "100%", boxSizing: "border-box" }}
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", fontWeight: "500" }}>Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: "100%", boxSizing: "border-box" }}
                        />
                    </div>
                    <div>
                        <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "4px", fontWeight: "500" }}>Notas</div>
                        <textarea
                            placeholder="Notas internas sobre el cliente"
                            value={notas}
                            onChange={e => setNotas(e.target.value)}
                            style={{ width: "100%", boxSizing: "border-box", minHeight: "80px" }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "16px" }}>
                    <button
                        style={{ fontSize: "12px", background: "none", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}
                        onClick={() => navigate(`/clientes/${id}`)}
                    >
                        Cancelar
                    </button>
                    <button onClick={guardar}>Guardar cambios</button>
                </div>
            </div>
        </div>
    );
}