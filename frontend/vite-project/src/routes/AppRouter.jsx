import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar         from "../components/Sidebar";
import AlertBox        from "../components/AlertBox";
import Dashboard       from "../pages/Dashboard";
import Turnos          from "../pages/Turnos";
import Calendario      from "../pages/Calendario";
import Clientes        from "../pages/Clientes";
import ClienteDetalle  from "../pages/ClienteDetalle";
import EditarCliente   from "../pages/EditarCliente";
import Profesionales   from "../pages/Profesionales";
import Servicios       from "../pages/Servicios";
import Movimientos     from "../pages/Movimientos";
import GiftCards       from "../pages/GiftCards";
import Reportes        from "../pages/Reportes";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Sidebar />
                <div className="app-main">
                    {/*<AlertBox />*/}
                    <div className="wrap">
                        <Routes>
                            <Route path="/"                    element={<Dashboard />}      />
                            <Route path="/turnos"              element={<Turnos />}         />
                            <Route path="/calendario"          element={<Calendario />}     />
                            <Route path="/clientes"            element={<Clientes />}       />
                            <Route path="/clientes/:id"        element={<ClienteDetalle />} />
                            <Route path="/clientes/:id/editar" element={<EditarCliente />}  />
                            <Route path="/profesionales"       element={<Profesionales />}  />
                            <Route path="/servicios"           element={<Servicios />}      />
                            <Route path="/movimientos"         element={<Movimientos />}    />
                            <Route path="/giftcards"           element={<GiftCards />}      />
                            <Route path="/reportes"            element={<Reportes />}       />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}