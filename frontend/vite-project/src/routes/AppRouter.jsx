import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Turnos from "../pages/Turnos";
import Clientes from "../pages/Clientes";
import Servicios from "../pages/Servicios";
import Profesionales from "../pages/Profesionales";
import Movimientos from "../pages/Movimientos";
import GiftCards from "../pages/GiftCards";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/profesionales" element={<Profesionales />} />
                <Route path="/movimientos" element={<Movimientos />} />
                <Route path="/giftcards" element={<GiftCards />} />
            </Routes>
        </BrowserRouter>
    );
}