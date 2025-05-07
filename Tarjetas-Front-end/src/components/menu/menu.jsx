import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './styles/menu.css';


function NavMenu() {
    const [menuActive, setMenuActive] = useState(false);
    const navigate = useNavigate(); // Importar useNavigate para redirigir

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleLogout = () => {
        localStorage.removeItem('tokenTarjeta'); // Eliminar el token del localStorage
        navigate('/login'); // Redirigir a la página de inicio de sesión
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Tarjetas SOSA</h1>


                <div className="navbar-menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </div>

                <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
                    <li><a href="crear">Crear Tarjeta</a></li>
                    <li><a href="lista">Mis Tarjetas</a></li>
                    <li><a href="#!" onClick={handleLogout}>Cerrar Sesión</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavMenu;
