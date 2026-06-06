import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getMovimientos, createMovimiento } from "../services/movimientosService";

export default function Movimientos(){
    const [movimientos, setMovimientos]=useState([]);
    const [modalAbierto, setModalAbierto]=useState(false);
    const [tipo, setTipo]=useState("EGRESO");
    const [monto, setMonto]=useState("");
    const [metodoPago, setMetodoPago]=useState("EFECTIVO");
    const [descripcion, setDescripcion]=useState("");
    const cargarMovimientos=async()=>{
        const data=await getMovimientos();
        setMovimientos(data);
    };
    useEffect(()=>{
        cargarMovimientos();
    }, []);
    const handleGuardar=async()=>{
        await createMovimiento({
            tipo,
            monto,
            metodoPago,
            descripcion,
        });
        await cargarMovimientos();
        setModalAbierto(false);
    };
    return(
        <div>
            <h1>Movimientos</h1>
            <button onClick={()=>setModalAbierto(true)}>
                Nuevo Movimiento
            </button>
            {movimientos.map((movimiento)=>(
                <div key={movimiento.id} 
                    style={{
                        border: "1px solid #ddd", 
                        padding: "10px",
                        marginBottom:"10px",
                    }}
                >
                    <h3>{movimiento.descripcion}</h3>
                    <p>{movimiento.tipo}</p>
                    <p>${movimiento.monto}</p>
                    <p>{movimiento.metodoPago}</p>
                </div>
            ))}
            <Modal
                abierto={modalAbierto}
                titulo="Nuevo Movimiento"
                onClose={() =>setModalAbierto(false)}
            >
                <select
                    value={tipo}
                    onChange={(e)=>setTipo(e.target.value)}
                >
                    <option value="INGRESO">
                        Ingreso
                    </option>
                    <option value="EGRESO">
                        Egreso
                    </option>
                </select>
                <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e)=>setMonto(e.target.value)}
                />
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
                </select>
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                />
                <button
                    onClick={handleGuardar}
                >
                    Guardar
                </button>
            </Modal>
        </div>
    );
}