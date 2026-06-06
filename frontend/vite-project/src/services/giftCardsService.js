const API_URL="http://localhost:3000";

export const getGiftCards=async()=>{
    const res=await fetch(`${API_URL}/api/giftcards`);
    if(!res.ok){
        throw new Error("Error al obtener gift cards");
    }
    return res.json();
};

export const createGiftCard=async(data)=>{
    const res=await fetch(`${API_URL}/api/giftcards`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Error al crear gift card");
    }
    return res.json();
};

export const consumirGiftCard=async(data)=>{
    const res=await fetch(`${API_URL}/api/giftcards/consumir`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if(!res.ok){
        throw new Error("Error al consumir gift card");
    }
    return res.json();
};