import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Link } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Turnos from "../pages/Turnos";
import NuevoTurno from "../pages/NuevoTurno";
import Calendario from "../pages/Calendario";
import Clientes from "../pages/Clientes";
import ClienteDetalle from "../pages/ClienteDetalle";
import EditarCliente from "../pages/EditarCliente";
import Profesionales from "../pages/Profesionales";
import Servicios from "../pages/Servicios";
import Movimientos from "../pages/Movimientos";
import GiftCards from "../pages/GiftCards";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <nav
                style={{
                    display:"flex",
                    gap:"20px",
                    padding:"20px",
                    borderBottom:"1px solid #ccc",
                }}
            >
                <Link to="/">Dashboard</Link>
                <Link to="/turnos">Turnos</Link>
                <Link to="/nuevo-turno">Nuevo Turno</Link>
                <Link to="/calendario">Calendario</Link>
                <Link to="/clientes">Clientes</Link>
                <Link to="/profesionales">Profesionales</Link>
                <Link to="/servicios">Servicios</Link>
                <Link to="/movimientos">Movimientos</Link>
                <Link to="/giftcards">Gift Cards</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/nuevo-turno" element={<NuevoTurno />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes/:id" element={<ClienteDetalle />} />
                <Route path="/clientes/:id/editar" element={<EditarCliente />} />
                <Route path="/profesionales" element={<Profesionales />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/movimientos" element={<Movimientos />} />
                <Route path="/giftcards" element={<GiftCards />} />
            </Routes>
        </BrowserRouter>
    );
}