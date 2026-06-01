const API_URL="http://localhost:3000";

export const getTurnos=async()=>{
    const res=await fetch(`${API_URL}/turnos`);
    if(!response.ok){
        throw new Error("Error al obtener turnos");
    }
    return response.json();
};
