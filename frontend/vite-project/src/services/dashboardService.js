const API_URL="http://localhost:3000";

export const getDashboard=async()=>{
    const res=await fetch(`${API_URL}/api/dashboard`);
    if(!res.ok){throw new Error("Error al obtener dashboard");}
    return res.json();
};