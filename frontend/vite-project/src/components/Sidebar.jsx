import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const NAV_LINKS = [
    { to: "/",              label: "Dashboard",     icon: "⊞" },
    { to: "/turnos",        label: "Turnos",        icon: "📅" },
    { to: "/calendario",    label: "Calendario",    icon: "🗓" },
    { to: "/clientes",      label: "Clientes",      icon: "👤" },
    { to: "/movimientos",   label: "Movimientos",   icon: "💸" },
    { to: "/giftcards",     label: "Gift Cards",    icon: "🎁" },
    { to: "/reportes",      label: "Reportes",      icon: "📊" },
    { to: "/profesionales", label: "Profesionales", icon: "✂️" },
    { to: "/servicios",     label: "Servicios",     icon: "🗒" },
];

const hoy = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
});
const fechaFormateada = hoy.charAt(0).toUpperCase() + hoy.slice(1);

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/*<div className="sidebar-logo">
                Lili<span>-</span>Andrea
            </div>*/}

            <nav className="sidebar-nav">
                {NAV_LINKS.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            "sidebar-link" + (isActive ? " sidebar-link-active" : "")
                        }
                    >
                        <span className="sidebar-icon">{icon}</span>
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="av" style={{ background: "#7F77DD", color: "#fff" }}>LA</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Lili-Andrea</div>
                    <div style={{ fontSize: "10px", color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fechaFormateada}</div>
                </div>
            </div>
        </aside>
    );
}