import "../styles/Dashboard.css";
import Topbar from "../components/Topbar";
import AlertBox from "../components/AlertBox";
import DashboardSection from "../components/DashboardSection";
import MovimientosSection from "../components/MovimientosSection";
import IngresosSection from "../components/IngresosSection";
import GiftCardsSection from "../components/GiftCardsSection";

export default function Dashboard() {
    return (
        <>
        <meta charSet="UTF-8" />
        <Topbar />
        <div className="wrap">
            {/* ALERTA */}
            <AlertBox />

            {/* DASHBOARD */} 
            <DashboardSection />

            {/* MOVIMIENTOS */}
            <MovimientosSection />
        
            {/* INGRESOS */}
            <IngresosSection />

            {/* GIFT CARD */}
            <GiftCardsSection />
        </div>
    </>
    );
}