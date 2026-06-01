export default function IngresosSection(){
    return (
        <div>
            <div className="sec-head">
                <div className="sec-title">Ingresos</div>
                <div className="sec-divider"></div>
            </div>

            <div className="filter-row">
                <button className="filter-btn active">Por día</button>
                <button className="filter-btn">Por mes</button>
                <button className="filter-btn">Por año</button>
                <select><option>Todas las profesionales</option><option>Liliana Godoy</option><option>Andrea Santillán</option><option>Silvina Godoy</option></select>
            </div>

            <div className="metrics" style={{marginBottom:"10px"}}>
                <div className="metric">
                    <div className="metric-label">Total del período</div>
                    <div className="metric-value green">$134.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Promedio por turno</div>
                    <div className="metric-value">$22.333</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mejor método</div>
                    <div className="metric-value purple" style={{fontSize:"1rem"}}>Efectivo</div>
                    <div className="metric-sub">$97.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Turnos atendidos</div>
                    <div className="metric-value amber">6</div>
                </div>
            </div>

            <div className="two-col" style={{marginBottom:"10px"}}>
                <div className="card">
                    <div className="card-title">Por profesional</div>
                    <div className="bar-wrap"><div className="bar-label">Liliana</div><div className="bar-bg"><div className="bar-fill" style={{width:"50%", background:"#1D9E75"}}></div></div><div className="bar-val">$67.000</div></div>
                    <div className="bar-wrap"><div className="bar-label">Andrea</div><div className="bar-bg"><div className="bar-fill" style={{width:"31%", background:"#7F77DD"}}></div></div><div className="bar-val">$42.000</div></div>
                    <div className="bar-wrap"><div className="bar-label">Silvina</div><div className="bar-bg"><div className="bar-fill" style={{width:"19%", background:"#EF9F27"}}></div></div><div className="bar-val">$25.000</div></div>
                </div>
                <div className="card">
                    <div className="card-title">Por método de pago</div>
                    <div className="bar-wrap"><div className="bar-label">Efectivo</div><div className="bar-bg"><div className="bar-fill" style={{width:"72%", background:"#1D9E75"}}></div></div><div className="bar-val">$97.000</div></div>
                    <div className="bar-wrap"><div className="bar-label">Merc. Pago</div><div className="bar-bg"><div className="bar-fill" style={{width:"16%", background:"#7F77DD"}}></div></div><div className="bar-val">$22.000</div></div>
                    <div className="bar-wrap"><div className="bar-label">Banco</div><div className="bar-bg"><div className="bar-fill" style={{width:"7%", background:"#378ADD"}}></div></div><div className="bar-val">$10.000</div></div>
                    <div className="bar-wrap"><div className="bar-label">Voucher</div><div className="bar-bg"><div className="bar-fill" style={{width:"4%", background:"#BA7517"}}></div></div><div className="bar-val">$5.000</div></div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">Detalle del día</div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Kaping</div><div className="mov-meta"><span className="badge b-li" style={{fontSize:"10px"}}>Liliana</span><span>10:30 hs</span></div></div>
                    <div><div className="mov-amount in">$20.000</div><div className="mov-pago-label">Efectivo</div></div>
                </div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Lift de pestañas</div><div className="mov-meta"><span className="badge b-as" style={{fontSize:"10px"}}>Andrea</span><span>12:00 hs</span></div></div>
                    <div><div className="mov-amount in">$22.000</div><div className="mov-pago-label">Mercado Pago</div></div>
                </div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Depilación</div><div className="mov-meta"><span className="badge b-si" style={{fontSize:"10px"}}>Silvina</span><span>13:30 hs</span></div></div>
                    <div><div className="mov-amount in">$18.000</div><div className="mov-pago-label">Efectivo</div></div>
                </div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Bronceado</div><div className="mov-meta"><span className="badge b-li" style={{fontSize:"10px"}}>Liliana</span><span>14:30 hs</span><span className="badge b-gc" style={{fontSize:"10px"}}>Gift Card</span></div></div>
                    <div><div className="mov-amount in">$15.000</div><div className="mov-pago-label">Gift Card</div></div>
                </div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Uñas gel</div><div className="mov-meta"><span className="badge b-as" style={{fontSize:"10px"}}>Andrea</span><span>16:30 hs</span></div></div>
                    <div><div className="mov-amount in">$25.000</div><div className="mov-pago-label">Banco</div></div>
                </div>
                <div className="row" style={{gap:"12px"}}>
                    <div style={{flex:"1"}}><div className="mov-concepto">Kaping</div><div className="mov-meta"><span className="badge b-si" style={{fontSize:"10px"}}>Silvina</span><span>17:30 hs</span></div></div>
                    <div><div className="mov-amount in">$7.000</div><div className="mov-pago-label">Voucher</div></div>
                </div>
        </div>
    </div>
    );
}