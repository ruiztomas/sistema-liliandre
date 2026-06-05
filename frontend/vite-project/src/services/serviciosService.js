const API_URL="http://localhost:3000";

export const getServicios=async()=>{
    const res=await fetch(
        `${API_URL}/api/servicios`
    );
    if(!res.ok){
        throw new Error("Error al obtener servicios");
    }
    return res.json();
};