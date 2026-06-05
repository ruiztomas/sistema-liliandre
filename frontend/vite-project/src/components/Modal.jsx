export default function Modal({
    abierto,
    titulo,
    children,
    onClose,
}) {
    if (!abierto) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    minWidth: "350px",
                }}
            >
                <h2>{titulo}</h2>

                {children}

                <button
                    onClick={onClose}
                    style={{
                        marginTop: "15px",
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}