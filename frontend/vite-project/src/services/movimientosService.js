const API_URL="http://localhost:3000";

export const getMovimientos=async()=>{
    const res=await fetch(`${API_URL}/api/movimientos`);
    if(!res.ok){
        throw new Error("Error al obtener movimientos");
    }
    return res.json();
};

export const createMovimiento=async(data)=>{
    const res=await fetch(`${API_URL}/api/movimientos`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Error al crear movimiento");
    }
    return res.json();
};