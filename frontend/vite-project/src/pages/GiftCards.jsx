import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getGiftCards, createGiftCard, consumirGiftCard } from "../services/giftCardsService";

export default function GiftCards() {
    const [giftCards, setGiftCards] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [montoInicial, setMontoInicial] = useState("");
    const [giftActual, setGiftActual] = useState(null);
    const [modalConsumir, setModalConsumir] = useState(false);
    const [montoConsumir, setMontoConsumir] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const cargarGiftCards = async () => {
        const data = await getGiftCards();
        setGiftCards(data);
    };

    useEffect(() => {
        cargarGiftCards();
    }, []);

    const handleCrearGiftCard = async (event) => {
        event.preventDefault();
        await createGiftCard({ codigo, montoInicial });
        setCodigo("");
        setMontoInicial("");
        await cargarGiftCards();
    };

    const handleConsumirGiftCard = async () => {
        if (!giftActual) return;
        await consumirGiftCard({
            codigo: giftActual.codigo,
            monto: montoConsumir,
            descripcion,
        });
        setModalConsumir(false);
        setMontoConsumir("");
        setDescripcion("");
        await cargarGiftCards();
    };

    return (
        <div>
            <h1>Gift Cards</h1>

            <form onSubmit={handleCrearGiftCard} style={{ marginBottom: "20px" }}>
                <label>
                    Código:
                    <input
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </label>
                <label style={{ marginLeft: "10px" }}>
                    Monto inicial:
                    <input
                        type="number"
                        value={montoInicial}
                        onChange={(e) => setMontoInicial(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Crear gift card</button>
            </form>

            {giftCards.map((gift) => (
                <div key={gift.id} style={{ marginBottom: "16px" }}>
                    <div>
                        <h3>{gift.codigo}</h3>
                        <p>Saldo: ${gift.saldoDisponible.toLocaleString("es-AR")}</p>
                        <p>Estado: {gift.activa ? "Activa" : "Inactiva"}</p>
                    </div>
                    <button
                        onClick={() => {
                            setGiftActual(gift);
                            setModalConsumir(true);
                        }}
                    >
                        Consumir
                    </button>
                </div>
            ))}

            <Modal
                abierto={modalConsumir}
                titulo={giftActual ? `Consumir ${giftActual.codigo}` : "Consumir"}
                onClose={() => setModalConsumir(false)}
            >
                <label>
                    Monto:
                    <input
                        type="number"
                        value={montoConsumir}
                        onChange={(e) => setMontoConsumir(e.target.value)}
                    />
                </label>
                <label style={{ display: "block", marginTop: "10px" }}>
                    Descripción:
                    <input
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </label>
                <button onClick={handleConsumirGiftCard} style={{ marginTop: "10px" }}>
                    Confirmar consumo
                </button>
            </Modal>
        </div>
    );
}
