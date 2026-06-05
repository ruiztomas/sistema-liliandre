const API_URL = "http://localhost:3000";

export const getClientes = async (search = "") => {
    const res = await fetch(
        `${API_URL}/api/clientes?search=${search}`
    );

    if (!res.ok) {
        throw new Error("Error al obtener clientes");
    }

    return res.json();
};

export const getClienteById = async (id) => {
    const res = await fetch(
        `${API_URL}/api/clientes/${id}`
    );

    if (!res.ok) {
        throw new Error("Error al obtener cliente");
    }

    return res.json();
};

export const updateCliente = async (id, data) => {
    const res = await fetch(
        `http://localhost:3000/api/clientes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        throw new Error("Error al actualizar cliente");
    }

    return res.json();
};