import React, { useState } from 'react';
import './LoginRegister.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Lógica para manejar el restablecimiento de la contraseña
    };

    return (
        <div className="auth-container">
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        placeholder="Ingresa tu correo" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="auth-btn">Enviar Instrucciones</button>
            </form>
        </div>
    );
};

export default ForgotPassword;