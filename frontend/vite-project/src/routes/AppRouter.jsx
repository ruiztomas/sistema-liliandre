import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Turnos from "../pages/Turnos";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/turnos" element={<Turnos />} />
            </Routes>
        </BrowserRouter>
    );
}
0