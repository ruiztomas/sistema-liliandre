import { useEffect, useState } from "react";
import { getTurnos } from "../services/turnosService";

export default function Turnos(){
    const [turnos, setTurnos]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{ 
        const cargarTurnos=async()=>{
            try{
                const data=await getTurnos();
                setTurnos(data);
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargarTurnos();
    }, []);
    if (loading){
        return <h2>Cargando turnos...</h2>;
    }
    return (
        <div>
            <h1>Turnos</h1>

            {turnos.map((turno)=>(
                <div
                    key={turno.id}
                    style={{
                        border:"1px solid #ddd",
                        padding:"10px",
                        marginBottom:"10px",
                    }}
                >
                    <h3>{turno.cliente.nombre}</h3>

                    <p>
                        Servicio: {turno.servicio.nombre}
                    </p>

                    <p>
                        Profesional: {turno.profesional.nombre}
                    </p>

                    <p>
                        Estado: {turno.estado}
                    </p>
                </div>
            ))}
        </div>
    );
}