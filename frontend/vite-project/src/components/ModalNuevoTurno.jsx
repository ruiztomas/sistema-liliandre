import { useState, useEffect } from "react";
import Modal from "./Modal";
import { createTurno } from "../services/turnosService";
import { getProfesionales } from "../services/profesionalesService";
import { getServicios } from "../services/serviciosService";

export default function ModalNuevoTurno({ abierto, onClose, onSuccess }) {
    const [nombre, setNombre]               = useState("");
    const [telefono, setTelefono]           = useState("");
    const [fecha, setFecha]                 = useState("");
    const [servicioId, setServicioId]       = useState("");
    const [profesionalId, setProfesionalId] = useState("");

    const [servicios, setServicios]         = useState([]);
    const [profesionales, setProfesionales] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            const [serviciosData, profesionalesData] = await Promise.all([
                getServicios(),
                getProfesionales(),
            ]);
            setServicios(serviciosData);
            setProfesionales(profesionalesData);
        };
        cargarDatos();
    }, []);

    const resetForm = () => {
        setNombre("");
        setTelefono("");
        setFecha("");
        setServicioId("");
        setProfesionalId("");
    };

    const handleGuardar = async () => {
        try {
            await createTurno({
                fecha,
                cliente: { nombre, telefono },
                servicioId: Number(servicioId),
                profesionalId: Number(profesionalId),
            });
            resetForm();
            onClose();
            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("Error al crear turno");
        }
    };

    return (
        <Modal
            abierto={abierto}
            titulo="Nuevo Turno"
            onClose={() => { resetForm(); onClose(); }}
        >
            <input
                type="text"
                placeholder="Nombre del cliente"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teléfono del cliente"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
            />
            <input
                type="datetime-local"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
            <select value={servicioId} onChange={e => setServicioId(e.target.value)}>
                <option value="">Seleccionar servicio</option>
                {servicios.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
            </select>
            <select value={profesionalId} onChange={e => setProfesionalId(e.target.value)}>
                <option value="">Seleccionar profesional</option>
                {profesionales.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <button onClick={handleGuardar}>Crear Turno</button>
        </Modal>
    );
}