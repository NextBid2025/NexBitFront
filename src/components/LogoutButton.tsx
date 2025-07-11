import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al login
    };

    return (
        <button onClick={handleLogout}>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
