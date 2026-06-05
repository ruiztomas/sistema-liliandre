import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClientes } from "../services/clientesService";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            const data = await getClientes(search);
            setClientes(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Clientes</h1>

            <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={cargarClientes}>
                Buscar
            </button>

            {clientes.map((cliente) => (
                <div
                    key={cliente.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>
                        <Link to={`/clientes/${cliente.id}`}>
                            {cliente.nombre}
                        </Link>
                    </h3>

                    <p>
                        Teléfono: {cliente.telefono || "-"}
                    </p>

                    <p>
                        Email: {cliente.email || "-"}
                    </p>
                </div>
            ))}
        </div>
    );
}