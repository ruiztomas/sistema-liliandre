const API_URL="http://localhost:3000";

export const getTurnos=async()=>{
    const res=await fetch(`${API_URL}/api/turnos`);
    if(!res.ok){
        throw new Error("Error al obtener turnos");
    }
    return res.json();
};

export const createTurno=async(data)=>{
    const res=await fetch(`${API_URL}/api/turnos`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
    });
    if(!res.ok){
        throw new Error("Error al crear turno");
    }
    return res.json();
};
export const finalizarTurno=async(id, metodoPago)=>{
    const res=await fetch(
        `${API_URL}/api/turnos/${id}/finalizar`,
        { 
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                metodoPago,
            }),
        }
    );
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
    return data;
};