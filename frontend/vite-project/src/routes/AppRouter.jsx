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
            </Routes>
        </BrowserRouter>
    );
}