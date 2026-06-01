export default function MovimientosSection(){
    return(
        <div>
            <div className="sec-head">
                <div className="sec-title">Movimientos</div>
                <div className="sec-divider"></div>
            </div>

            <div className="metrics" style={{marginBottom:"10px"}}>
                <div className="metric">
                    <div className="metric-label">Saldo actual</div>
                    <div className="metric-value green">$134.000</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Entradas</div>
                    <div className="metric-value">$134.000</div>
                    <div className="metric-sub">8 registros</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Salidas</div>
                    <div className="metric-value red">$0</div>
                    <div className="metric-sub">0 registros</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Gift Cards usadas</div>
                    <div className="metric-value purple">1</div>
                    <div className="metric-sub">$15.000</div>
                </div>
            </div>

            <div className="card">
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px"}}>
                    <div className="card-title" style={{margin:0}}>Todos los movimientos</div>
                    <div style={{display:"flex", gap:"8px"}}>
                        <select><option>Todas las profesionales</option><option>Liliana</option><option>Andrea</option><option>Silvina</option></select>
                        <select><option>Entrada y salida</option><option>Solo entradas</option><option>Solo salidas</option></select>
                    </div>
                </div>

                <div className="row" style={{gap:"12px"}}>
                    <div className="mov-icon mov-in">↑</div>
                    <div style={{flex:"1"}}>
                    <div className="mov-concepto">Kaping</div>
                    <div className="mov-meta"><span className="badge b-li" style={{fontSize:"10px"}}>Liliana</span><span>10:30 hs</span><span>Ticket #001</span></div>
                </div>
                <div><div className="mov-amount in">+$20.000</div><div className="mov-pago-label">Efectivo</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-in">↑</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Lift de pestañas</div>
                    <div className="mov-meta"><span className="badge b-as" style={{fontSize:"10px"}}>Andrea</span><span>12:00 hs</span><span>Ticket #002</span></div>
                </div>
                <div><div className="mov-amount in">+$22.000</div><div className="mov-pago-label">Mercado Pago</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-in">↑</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Depilación</div>
                    <div className="mov-meta"><span className="badge b-si" style={{fontSize:"10px"}}>Silvina</span><span>13:30 hs</span><span>Ticket #003</span></div>
                </div>
                <div><div className="mov-amount in">+$18.000</div><div className="mov-pago-label">Efectivo</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-in">↑</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Bronceado</div>
                    <div className="mov-meta"><span className="badge b-li" style={{fontSize:"10px"}}>Liliana</span><span>14:30 hs</span><span>Ticket #004</span><span className="badge b-gc" style={{fontSize:"10px"}}>Gift Card</span></div>
                </div>
                <div><div className="mov-amount in">+$15.000</div><div className="mov-pago-label">Gift Card</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-out">↓</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Retiro de caja</div>
                    <div className="mov-meta"><span className="badge b-as" style={{fontSize:"10px"}}>Andrea</span><span>15:00 hs</span></div>
                </div>
                <div><div className="mov-amount out">-$12.000</div><div className="mov-pago-label">Efectivo</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-in">↑</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Uñas gel</div>
                    <div className="mov-meta"><span className="badge b-as" style={{fontSize:"10px"}}>Andrea</span><span>16:30 hs</span><span>Ticket #005</span></div>
                </div>
                <div><div className="mov-amount in">+$25.000</div><div className="mov-pago-label">Banco</div></div>
            </div>

            <div className="row" style={{gap:"12px"}}>
                <div className="mov-icon mov-in">↑</div>
                <div style={{flex:"1"}}>
                    <div className="mov-concepto">Kaping</div>
                    <div className="mov-meta"><span className="badge b-si" style={{fontSize:"10px"}}>Silvina</span><span>17:30 hs</span><span>Ticket #006</span></div>
                </div>
                <div><div className="mov-amount in">+$7.000</div><div className="mov-pago-label">Voucher</div></div>
            </div>
        </div>
    </div>
    );
}