import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });

            if (response.data.token) {
                // Guarda el token en localStorage
                localStorage.setItem('token', response.data.token);

                // Redirige a la página de reservas
                navigate('/reservations');
            } else {
                alert('Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión', error);
            alert('Hubo un problema con el inicio de sesión. Por favor, inténtalo nuevamente.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Bienvenido a Condominio</h1>
                <p>Gestiona tus reservas de espacios comunes de manera sencilla y rápida.</p>
            </div>
            <div className="login-right">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Iniciar Sesión</button>
                    <Link to="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                </form>
                <p>
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
