export default function GiftCardsSection () {
    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Gift Card</div>
                <div className="sec-divider"></div>
            </div>

            <div className="metrics" style={{marginBottom:"10px"}}>
                <div className="metric">
                    <div className="metric-label">Gift Cards activas</div>
                    <div className="metric-value purple">3</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Saldo total emitido</div>
                    <div className="metric-value green">$75.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Saldo disponible</div>
                    <div className="metric-value">$60.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Usadas este mes</div>
                    <div className="metric-value amber">1</div>
                    <div className="metric-sub">$15.000</div>
                </div>
            </div>

            <div className="two-col" style={{marginBottom:"10px"}}>
                <div className="gc-visual">
                    <div className="gc-logo">bella. gift card</div>
                    <div className="gc-code">GC-2026-0042</div>
                    <div className="gc-meta">Para: <strong>Valentina Cruz</strong> · de: Romina Torres</div>
                    <div className="gc-amount">$25.000</div>
                </div>
                <div className="card" style={{display:"flex",flexDirection:"column",gap:"10px",justifyContent:"center"}}>
                    <div style={{fontSize:"13px",fontWeight:"500"}}>Nueva Gift Card</div>
                    <div style={{fontSize:"12px",color:"#888",lineHeight:"1.5"}}>Registrá el pago y asignala a un beneficiario. Sin fecha de vencimiento.</div>
                    <button style={{background:"#7F77DD",color:"#fff",border:"none",borderRadius:"8px",padding:"10px",fontSize:"13px",fontWeight:"500",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>+ Crear Gift Card</button>
                </div>
            </div>

            <div className="card">
                <div className="card-title">Todas las Gift Cards</div>

                <div className="row" style={{gap:"12px",alignItems:"flex-start"}}>
                    <div className="gc-num">GC-2026-0042</div>
                    <div style={{flex:1}}>
                    <div className="gc-beneficiario">Valentina Cruz</div>
                    <div className="gc-comprador">Comprada por Romina Torres · 2 mayo 2026</div>
                </div>
                <div style={{textAlign:"right"}}>
                    <div className="gc-monto">$25.000</div>
                    <div className="gc-saldo">Saldo: $25.000</div>
                    <span className="badge b-in" style={{fontSize:"10px",marginTop:"4px",display:"inline-block"}}>Disponible</span>
                </div>
            </div>

            <div className="row" style={{gap:"12px",alignItems:"flex-start"}}>
                <div className="gc-num">GC-2026-0038</div>
                <div style={{flex:1}}>
                    <div className="gc-beneficiario">María González</div>
                    <div className="gc-comprador">Comprada por Andrea Pérez · 28 abril 2026</div>
                </div>
                <div style={{textAlign:"right"}}>
                    <div className="gc-monto">$35.000</div>
                    <div className="gc-saldo">Saldo: $35.000</div>
                    <span className="badge b-in" style={{fontSize:"10px",marginTop:"4px",display:"inline-block"}}>Disponible</span>
                </div>
            </div>

            <div className="row" style={{gap:"12px",alignItems:"flex-start"}}>
                <div className="gc-num">GC-2026-0031</div>
                <div style={{flex:"1"}}>
                    <div className="gc-beneficiario">Sofía Méndez</div>
                    <div className="gc-comprador">Comprada por Laura Torres · 15 abril 2026</div>
                </div>
                <div style={{textAlign:"right"}}>
                    <div className="gc-monto">$15.000</div>
                    <div className="gc-saldo">Saldo: $0</div>
                    <span className="badge b-used" style={{fontSize:"10px",marginTop:"4px",display:"inline-block"}}>Agotada</span>
                </div>
            </div>
        </div>
    </div>
    );
}