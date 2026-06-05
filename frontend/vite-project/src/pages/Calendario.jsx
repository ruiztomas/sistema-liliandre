import { useEffect, useState } from "react";
import { getTurnos } from "../services/turnosService";

export default function Calendario() {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = async () => {
        const data = await getTurnos();
        setTurnos(data);
    };

    return (
        <div>
            <h1>Calendario</h1>

            {turnos.map((turno) => (
                <div key={turno.id}>
                    <strong>
                        {new Date(turno.fecha).toLocaleString()}
                    </strong>

                    {" - "}

                    {turno.cliente.nombre}
                </div>
            ))}
        </div>
    );
}