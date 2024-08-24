import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name: `${firstName} ${lastName}`, // Combina el nombre y apellido en un solo campo
                email,
                password,
            });

            if (response.data.token) {
                navigate('/login'); // Redirige a la página de inicio de sesión
            } else {
                alert('Error en el registro');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Error: ' + error.response.data.msg);
            } else {
                console.error('Error en la solicitud de registro', error);
                alert('Error en el registro, intenta nuevamente.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Crear una cuenta</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Apellido" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                        />
                    </div>
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
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirmar contraseña" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Registrarse</button>
                </form>
                <p>
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
