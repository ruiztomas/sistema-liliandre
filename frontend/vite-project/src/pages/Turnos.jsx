import { useEffect, useState } from "react";
import { createTurno, getTurnos, finalizarTurno } from "../services/turnosService";
import { getProfesionales } from "../services/profesionalesService";
import { getServicios } from "../services/serviciosService";
import Modal from "../components/Modal"; 

export default function Turnos(){
    const [turnos, setTurnos]=useState([]);
    const [loading, setLoading]=useState(true);
    const [profesionales, setProfesionales]=useState([]);
    const [servicios, setServicios]=useState([]);
    const [formData, setFormData]=useState({
        nombre:"",
        telefono:"",
        fecha:"",
        servicioId:"",
        profesionalId:"",
    });
    const [modalAbierto, setModalAbierto] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [metodoPago, setMetodoPago] = useState("EFECTIVO");

    useEffect(()=>{ 
        const cargarDatos=async()=>{
            try{
                const[
                    turnosData,
                    profesionalesData,
                    serviciosData,
                ]=await Promise.all([
                    getTurnos(),
                    getProfesionales(),
                    getServicios(),
                ]);
                setTurnos(turnosData);
                setProfesionales(profesionalesData);
                setServicios(serviciosData);
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);
    if (loading){
        return <h2>Cargando turnos...</h2>;
    }
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await createTurno({
                fecha:formData.fecha,
                cliente:{
                    nombre:formData.nombre,
                    telefono:formData.telefono,
                },
                servicioId:Number(formData.servicioId),
                profesionalId:Number(formData.profesionalId),
            });
            const nuevosTurnos=await getTurnos();
            setTurnos(nuevosTurnos);
            setFormData({
                nombre:"",
                telefono:"",
                fecha:"",
                servicioId:"",
                profesionalId:"",
            });
        } catch(error) {
            console.error(error);
            alert("Error al crear turno");
        }
    };
    const handleFinalizar=async()=>{
        try{
            await finalizarTurno(turnoSeleccionado, metodoPago);
            const data=await getTurnos();
            setTurnos(data);
            setModalAbierto(false);
        }catch(error){
            console.error(error);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    border:"1px solid #0000",
                    padding:"20px",
                    marginBottom:"20px",
                }}
            >
                <h2>Nuevo Turno</h2>

                <input 
                    type="text"
                    name="nombre"
                    placeholder="Nombre del cliente"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <br /><br />

                <input 
                    type="text"
                    name="telefono"
                    placeholder="Telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                <br /><br />

                <input 
                    type="datetime-local"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="servicioId"
                    value={formData.servicioId}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar servicio</option>
                    {servicios.map((servicio)=>(
                        <option key={servicio.id} value={servicio.id}>
                            {servicio.nombre}
                        </option>
                    ))}
                </select>

                <br /><br />

                <select
                    name="profesionalId"
                    value={formData.profesionalId}
                    onChange={handleChange}
                >
                    <option value="">Seleccionar profesional</option>
                    {profesionales.map((profesional)=>(
                        <option key={profesional.id} value={profesional.id}>
                            {profesional.nombre}
                        </option>
                        )
                    )}
                </select>
                
                <br /><br />

                <button type="submit">
                    Crear Turno
                </button>
            </form>
            
            <h1>Turnos</h1>

            {turnos.map((turno)=>(
                <div
                    key={turno.id}
                    style={{
                        border:"1px solid #000000",
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
                        Fecha: {" "} {new Date(turno.fecha).toLocaleString()}
                    </p>
                    <p
                        style={{
                            color:
                                turno.estado==="FINALIZADO"
                                    ?"green"
                                    :"orange",
                                fontWeight:"bold",
                        }}
                    >
                        Estado: {turno.estado}
                    </p>
                    {turno.estado !== "FINALIZADO" && (
                        <button
                            onClick={()=>{
                                setTurnoSeleccionado(turno.id);
                                setModalAbierto(true);
                            }}
                        >
                            Finalizar
                        </button>
                    )}
                </div>
            ))}
            <Modal
                abierto={modalAbierto}
                titulo="Finalizar Turno"
                onClose={()=>setModalAbierto(false)}
            >
                <select
                    value={metodoPago}
                    onChange={(e)=>setMetodoPago(e.target.value)}
                >
                    <option value="EFECTIVO">
                        Efectivo
                    </option>
                    <option value="MERCADOPAGO">
                        Mercado Pago
                    </option>
                    <option value="TRANSFERENCIA">
                        Transferencia
                    </option>
                    <option value="TARJETA">
                        Tarjeta
                    </option>
                    <option value="GIFT_CARD">
                        Gift Card
                    </option>
                </select>
                <button onClick={handleFinalizar}>
                    Confirmar
                </button>
            </Modal>
        </div>
    );
}