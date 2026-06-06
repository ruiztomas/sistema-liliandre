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

export const createServicio=async(data)=>{
    const res=await fetch(
        `${API_URL}/api/servicios`,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Ya existe un servicio con ese nombre");
    }
    return res.json();
};

export const updateServicio=async(id, data)=>{
    const res=await fetch(
        `${API_URL}/api/servicios/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Error al actualizar servicio");
    }
    return res.json();
};