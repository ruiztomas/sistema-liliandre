import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getGiftCards, createGiftCard, consumirGiftCard } from "../services/giftCardsService";
import "../styles/GiftCards.css";

const formatPeso = (n) => "$" + Number(n).toLocaleString("es-AR");

const formatFecha = (dateStr) =>
    new Date(dateStr).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

export default function GiftCardsSection() {
    const [giftCards, setGiftCards] = useState([]);

    // Modal crear
    const [modalCrear, setModalCrear]       = useState(false);
    const [codigo, setCodigo]               = useState("");
    const [montoInicial, setMontoInicial]   = useState("");
    const [beneficiario, setBeneficiario]   = useState("");
    const [comprador, setComprador]         = useState("");

    // Modal consumir
    const [modalConsumir, setModalConsumir] = useState(false);
    const [giftActual, setGiftActual]       = useState(null);
    const [montoConsumir, setMontoConsumir] = useState("");
    const [descripcion, setDescripcion]     = useState("");

    const cargarGiftCards = async () => {
        const data = await getGiftCards();
        setGiftCards(data);
    };

    useEffect(() => {
        cargarGiftCards();
    }, []);

    const handleCrearGiftCard = async () => {
        await createGiftCard({ codigo, montoInicial, beneficiario, comprador });
        setCodigo("");
        setMontoInicial("");
        setBeneficiario("");
        setComprador("");
        setModalCrear(false);
        await cargarGiftCards();
    };

    const handleConsumirGiftCard = async () => {
        if (!giftActual) return;
        try {
            await consumirGiftCard({
                codigo: giftActual.codigo,
                monto: montoConsumir,
                descripcion,
            });
        } catch (error) {
            alert(error.message);
        }
        setModalConsumir(false);
        setGiftActual(null);
        setMontoConsumir("");
        setDescripcion("");
        await cargarGiftCards();
    };

    // Métricas
    const activas        = giftCards.filter(g => g.activa);
    const totalEmitido   = giftCards.reduce((acc, g) => acc + Number(g.montoInicial), 0);
    const totalDisponible = giftCards.reduce((acc, g) => acc + Number(g.saldoDisponible), 0);
    const usadasEsteMes  = giftCards.filter(g => {
        if (!g.ultimoUso) return false;
        const uso = new Date(g.ultimoUso);
        const hoy = new Date();
        return uso.getMonth() === hoy.getMonth() && uso.getFullYear() === hoy.getFullYear();
    });
    const totalUsadoMes  = usadasEsteMes.reduce((acc, g) => acc + Number(g.montoUsadoMes ?? 0), 0);

    // Gift Card destacada (primera activa)
    const gcDestacada = activas[0] ?? null;

    return (
        <div>
            {/* Encabezado */}
            <div className="sec-head">
                <div className="sec-title">Gift Card</div>
                <div className="sec-divider"></div>
            </div>

            {/* Métricas */}
            <div className="metrics" style={{ marginBottom: "10px" }}>
                <div className="metric">
                    <div className="metric-label">Gift Cards activas</div>
                    <div className="metric-value purple">{activas.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Saldo total emitido</div>
                    <div className="metric-value green">{formatPeso(totalEmitido)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Saldo disponible</div>
                    <div className="metric-value">{formatPeso(totalDisponible)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Usadas este mes</div>
                    <div className="metric-value amber">{usadasEsteMes.length}</div>
                    <div className="metric-sub">{formatPeso(totalUsadoMes)}</div>
                </div>
            </div>

            {/* Visual destacada + panel crear */}
            <div className="two-col" style={{ marginBottom: "10px" }}>
                <div className="gc-visual">
                    <div className="gc-logo">LILI-ANDRE Gift Cards</div>
                    {gcDestacada ? (
                        <>
                            <div className="gc-code">{gcDestacada.codigo}</div>
                            <div className="gc-meta">
                                Para: <strong>{gcDestacada.beneficiario ?? "—"}</strong>
                                {gcDestacada.comprador ? ` · de: ${gcDestacada.comprador}` : ""}
                            </div>
                            <div className="gc-amount">{formatPeso(gcDestacada.saldoDisponible)}</div>
                        </>
                    ) : (
                        <div className="gc-code" style={{ opacity: 0.5 }}>Sin gift cards activas</div>
                    )}
                </div>
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: "500" }}>Nueva Gift Card</div>
                    <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.5" }}>
                        Registrá el pago y asignala a un beneficiario. Sin fecha de vencimiento.
                    </div>
                    <button
                        style={{ background: "#7F77DD", color: "#fff", border: "none", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
                        onClick={() => setModalCrear(true)}
                    >
                        + Crear Gift Card
                    </button>
                </div>
            </div>

            {/* Listado */}
            <div className="card">
                <div className="card-title">Todas las Gift Cards</div>

                {giftCards.length === 0 && (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "20px 0" }}>
                        Sin gift cards registradas.
                    </div>
                )}

                {giftCards.map((gift) => {
                    const agotada = !gift.activa || Number(gift.saldoDisponible) === 0;
                    return (
                        <div key={gift.id} className="row" style={{ gap: "12px", alignItems: "flex-start" }}>
                            <div className="gc-num">{gift.codigo}</div>
                            <div style={{ flex: 1 }}>
                                <div className="gc-beneficiario">{gift.beneficiario ?? "—"}</div>
                                <div className="gc-comprador">
                                    {gift.comprador ? `Comprada por ${gift.comprador} · ` : ""}
                                    {gift.createdAt ? formatFecha(gift.createdAt) : ""}
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div className="gc-monto">{formatPeso(gift.montoInicial)}</div>
                                <div className="gc-saldo">Saldo: {formatPeso(gift.saldoDisponible)}</div>
                                <span
                                    className={`badge ${agotada ? "b-used" : "b-in"}`}
                                    style={{ fontSize: "10px", marginTop: "4px", display: "inline-block" }}
                                >
                                    {agotada ? "Agotada" : "Disponible"}
                                </span>
                                {!agotada && (
                                    <div style={{ marginTop: "6px" }}>
                                        <button
                                            style={{ fontSize: "11px", padding: "4px 10px", cursor: "pointer" }}
                                            onClick={() => { setGiftActual(gift); setModalConsumir(true); }}
                                        >
                                            Consumir
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal crear */}
            <Modal
                abierto={modalCrear}
                titulo="Nueva Gift Card"
                onClose={() => setModalCrear(false)}
            >
                <input
                    placeholder="Código (ej: GC-2026-0043)"
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Monto inicial"
                    value={montoInicial}
                    onChange={e => setMontoInicial(e.target.value)}
                />
                <input
                    placeholder="Beneficiario (para quién es)"
                    value={beneficiario}
                    onChange={e => setBeneficiario(e.target.value)}
                />
                <input
                    placeholder="Comprador (quién la compra)"
                    value={comprador}
                    onChange={e => setComprador(e.target.value)}
                />
                <button onClick={handleCrearGiftCard}>Crear Gift Card</button>
            </Modal>

            {/* Modal consumir */}
            <Modal
                abierto={modalConsumir}
                titulo={giftActual ? `Consumir ${giftActual.codigo}` : "Consumir"}
                onClose={() => { setModalConsumir(false); setGiftActual(null); }}
            >
                <input
                    type="number"
                    placeholder="Monto a consumir"
                    value={montoConsumir}
                    onChange={e => setMontoConsumir(e.target.value)}
                />
                <input
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
                <button onClick={handleConsumirGiftCard}>Confirmar consumo</button>
            </Modal>
        </div>
    );
}
