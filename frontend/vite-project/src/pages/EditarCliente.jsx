import { useEffect, useState } from "react";
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
}