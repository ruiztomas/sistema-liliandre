import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getServicios, createServicio, updateServicio } from "../services/serviciosService";

export default function Servicios(){
    const[servicios, setServicios]=useState([]);
    const cargarServicios=async()=>{
        const data=await getServicios();
        setServicios(data);
    };
    const[modalAbierto, setModalAbierto]=useState(false);
    const[modoEdicion, setModoEdicion]=useState(false);
    const[servicioActual, setServicioActual]=useState(null);
    const[nombre, setNombre]=useState("");
    const[precio, setPrecio]=useState("");
    useEffect(()=>{
        cargarServicios();
    }, []);
    const handleGuardar=async()=>{
        if (!nombre.trim()) {
            alert("Debes ingresar un nombre");
            return;
        }
        if (!precio || Number(precio) <= 0) {
            alert("Debes ingresar un precio válido");
            return;
        }
        try{
            const payload={
                nombre,
                precio: Number(precio),
            };
            if(modoEdicion){
                await updateServicio(servicioActual.id, payload);
            } else {
                await createServicio(payload);
            }
            await cargarServicios();
            setModalAbierto(false);
        } catch(error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Servicios</h1>
            <button onClick={()=>{
                setModoEdicion(false);
                setNombre("");
                setPrecio("");
                setModalAbierto(true);
            }}
            >
                Nuevo Servicio
            </button>
            {servicios.map((servicio)=>{
                return( 
                    <div
                        key={servicio.id}
                        style={{
                            border:"1px solid #ddd",
                            padding:"10px",
                            marginBottom:"10px",
                        }}
                    >
                        <h3>{servicio.nombre}</h3>
                        <p>
                            Precio:
                            ${servicio.precio.toLocaleString("es-AR")}
                        </p>
                        <button
                            onClick={()=>{
                                setModoEdicion(true);
                                setServicioActual(servicio);
                                setNombre(servicio.nombre);
                                setPrecio(servicio.precio);
                                setModalAbierto(true);
                            }}
                        >
                            Editar
                        </button>
                    </div>
                );
            })}
            <Modal
                abierto={modalAbierto}
                titulo={
                    modoEdicion
                        ? "Editar Servicio"
                        : "Nuevo Servicio"
                }
                onClose={()=>setModalAbierto(false)}
            >
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e)=>setPrecio(e.target.value)}
                />
                
                <button onClick={handleGuardar}>
                    Guardar
                </button>
            </Modal>
        </div>
    );
};