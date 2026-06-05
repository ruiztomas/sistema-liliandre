import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createTurno } from "../services/turnosService";
import { getProfesionales } from "../services/profesionalesService";
import { getServicios } from "../services/serviciosService";

export default function NuevoTurno(){
    const [nombre, setNombre]=useState("");
    const [telefono, setTelefono]=useState("");
    const [fecha, setFecha]=useState("");
    const [servicioId, setServicioId]=useState("");
    const [profesionalId, setProfesionalId]=useState("");
    const [observaciones, setObservaciones]=useState("");

    const [servicios, setServicios]=useState([]);
    const [profesionales, setProfesionales]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const cargarDatos=async()=>{
            const serviciosData=await getServicios();
            const profesionalesData=await getProfesionales();
            setServicios(serviciosData);
            setProfesionales(profesionalesData);
        };
        cargarDatos();
    },[]);
    const guardarTurno=async(e)=>{
        e.preventDefault();
        try{
            await createTurno({
                fecha,
                observaciones,
                cliente:{
                    nombre,
                    telefono,
                },
                servicioId,
                profesionalId,
            });
            alert("Turno creado");
            setNombre("");
            setTelefono("");
            setFecha("");
            setServicioId("");
            setProfesionalId("");
            setObservaciones("");
            navigate("/turnos");
        } catch(error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Nuevo Turno</h1>

            <form onSubmit={guardarTurno}>
                <input 
                    type="text"
                    placeholder="Nombre del cliente"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Telefono del cliente"
                    value={telefono}
                    onChange={(e)=>setTelefono(e.target.value)}
                />
                <input 
                    type="datetime-local"
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}
                />
                <select
                    value={servicioId}
                    onChange={(e)=>setServicioId(e.target.value)}
                >
                    <option value="">
                        Seleccionar servicio
                    </option>
                    {servicios.map((servicio)=>(
                        <option key={servicio.id} value={servicio.id}>
                            {servicio.nombre}
                        </option>
                    ))}
                </select>
                <select value={profesionalId} onChange={(e)=>setProfesionalId(e.target.value)}>
                    <option value="">
                        Seleccionar profesional
                    </option>
                    {profesionales.map((profesional)=>(
                        <option key={profesional.id} value={profesional.id}>
                            {profesional.nombre}
                        </option>              
                    ))}
                </select>
                <textarea 
                    placeholder="Observaciones"
                    value={observaciones}
                    onChange={(e)=>setObservaciones(e.target.value)}
                />
                <button type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
}
