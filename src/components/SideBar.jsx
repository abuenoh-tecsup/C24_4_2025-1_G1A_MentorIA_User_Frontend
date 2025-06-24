import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Asumiendo que usas React Router para la navegación

function SideBar({ className = "" }) {
    const location = useLocation(); // Obtiene la ubicación actual para el enlace activo
    const [isOpen, setIsOpen] = useState(false); // Para controlar la apertura del sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`sidebar-component ${className} ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                {/* Botón para toggle del sidebar en móviles */}
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <span className="sidebar-toggle-icon">☰</span> {/* Icono de menú */}
                </button>
            </div>
            <nav className="sidebar-nav">
                <ul className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
                    <li className="sidebar-item">
                        <Link 
                            to="/" 
                            className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            <span className="sidebar-text">Inicio</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link 
                            to="/courses" 
                            className={`sidebar-link ${location.pathname === '/courses' ? 'active' : ''}`}
                        >
                            <span className="sidebar-text">Cursos</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link 
                            to="/users" 
                            className={`sidebar-link ${location.pathname === '/users' ? 'active' : ''}`}
                        >
                            <span className="sidebar-text">Usuarios</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link 
                            to="/settings" 
                            className={`sidebar-link ${location.pathname === '/settings' ? 'active' : ''}`}
                        >
                            <span className="sidebar-text">Configuración</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p>&copy; {new Date().getFullYear()} Mi Aplicación</p>
            </div>
        </aside>
    );
}

export default SideBar;
