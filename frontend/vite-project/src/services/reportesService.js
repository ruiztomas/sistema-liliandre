const API_URL = "http://localhost:3000";

export const getResumenReportes=async()=>{
    const res = await fetch(
        `${API_URL}/api/reportes/resumen`
    );
    if (!res.ok) {
        throw new Error("Error al obtener reportes");
    }
    return res.json();
};