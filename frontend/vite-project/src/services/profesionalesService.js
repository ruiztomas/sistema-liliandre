const API_URL="http://localhost:3000";

export const getProfesionales=async()=>{
    const res=await fetch(`${API_URL}/api/profesionales`);
    if(!res.ok){
        throw new Error("Error al obtener profesionales");
    }
    return res.json();
};

export const createProfesional=async(data)=>{
    const res=await fetch(
        `${API_URL}/api/profesionales`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Error al crear profesional");
    }
    return res.json();
};

export const updateProfesional = async (id, data) => {
    const res = await fetch(
        `${API_URL}/api/profesionales/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        throw new Error(
            "Error al actualizar profesional"
        );
    }

    return res.json();
};