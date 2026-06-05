import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import {
    getProfesionales,
    createProfesional,
    updateProfesional,
} from "../services/profesionalesService";

export default function Profesionales() {
    const [profesionales, setProfesionales] = useState([]);
    const cargarProfesionales = async () => {
        const data = await getProfesionales();
        setProfesionales(data);
    };
    const [modalAbierto, setModalAbierto]=useState(false);
    const [modoEdicion, setModoEdicion]=useState(false);
    const [profesionalActual, setProfesionalActual]=useState(null);
    const [nombre, setNombre]=useState("");
    const [color, setColor]=useState("#000000");
    useEffect(() => {
        cargarProfesionales();
    }, []);
    const handleGuardar=async()=>{
        try{
            if(modoEdicion){
                await updateProfesional(
                    profesionalActual.id,
                    {
                        nombre,
                        color,
                    }
                );
            }else{
                await createProfesional({
                    nombre,
                    color,
                });
            }
            await cargarProfesionales();
            setModalAbierto(false);
        }catch(error){
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Profesionales</h1>
            
            <button onClick={()=>{
                setModoEdicion(false);
                setNombre("");
                setColor("#000000");
                setModalAbierto(true);
            }}
            >
                Nuevo Profesional
            </button>

            {profesionales.map((profesional) => (
                <div
                    key={profesional.id}
                    style={{
                        border:"1px solid #ddd",
                        padding:"10px",
                        marginBottom:"10px",
                    }}
                >
                    <h3>
                        {profesional.nombre}
                    </h3>

                    <p>
                        Color: {profesional.color}
                    </p>

                    <button onClick={()=>{
                        setModoEdicion(true);
                        setProfesionalActual(profesional);
                        setNombre(profesional.nombre);
                        setColor(profesional.color);
                        setModalAbierto(true);
                    }}>
                        Editar
                    </button>
                </div>
            ))}
            <Modal
                abierto={modalAbierto}
                titulo={
                    modoEdicion
                        ? "Editar Profesional"
                        : "Nuevo Profesional"
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
                    type="color"
                    value={color}
                    onChange={(e)=>setColor(e.target.value)}
                />
                <button onClick={handleGuardar}>
                    Guardar
                </button>
            </Modal>
        </div>
    );
}