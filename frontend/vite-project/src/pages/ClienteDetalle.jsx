import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClienteById } from "../services/clientesService";
import { Link } from "react-router-dom";

export default function ClienteDetalle() {
    const { id } = useParams();

    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarCliente = async () => {
            try {
                const data = await getClienteById(id);
                setCliente(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        cargarCliente();
    }, [id]);

    if (loading) {
        return <h2>Cargando cliente...</h2>;
    }

    if (!cliente) {
        return <h2>Cliente no encontrado</h2>;
    }

    return (
        <div>
            <h1>{cliente.nombre}</h1>

            <p>
                📞 {cliente.telefono || "-"}
            </p>

            <p>
                ✉️ {cliente.email || "-"}
            </p>

            <Link to={`/clientes/${cliente.id}/editar`}>
                <button>
                    Editar cliente
                </button>
            </Link>
            
            <h2>Historial de Turnos</h2>

            {cliente.turnos.length === 0 ? (
                <p>No tiene turnos registrados</p>
            ) : (
                cliente.turnos.map((turno) => (
                    <div
                        key={turno.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p>
                            Fecha:
                            {" "}
                            {new Date(
                                turno.fecha
                            ).toLocaleString()}
                        </p>

                        <p>
                            Servicio:
                            {" "}
                            {turno.servicio.nombre}
                        </p>

                        <p>
                            Profesional:
                            {" "}
                            {turno.profesional.nombre}
                        </p>

                        <p>
                            Estado:
                            {" "}
                            {turno.estado}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}