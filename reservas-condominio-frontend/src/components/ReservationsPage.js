import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservations.css';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [space, setSpace] = useState('');
    const [userEmail, setUserEmail] = useState(''); // Estado para el correo electrónico del usuario
    const [message, setMessage] = useState('');
    const [spaceDetails, setSpaceDetails] = useState(null);
    const [reservas, setReservas] = useState([]);
    
    const navigate = useNavigate(); // Reemplaza useHistory por useNavigate

    useEffect(() => {
        // Función para obtener todas las reservas desde el backend
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservas');
                setReservas(response.data);
            } catch (error) {
                console.error('Error al obtener las reservas', error);
            }
        };

        fetchReservations();
    }, []);

    const handleReservation = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/reservas', {
                date,
                time,
                space,
                userEmail, // Añadimos el correo del usuario
            });

            if (response.data.success) {
                setMessage('Reserva realizada con éxito');
                setReservas([...reservas, response.data.reserva]); // Actualiza las reservas locales
            } else {
                setMessage('Error al realizar la reserva');
            }
        } catch (error) {
            console.error('Error en la solicitud de reserva', error);
            setMessage('Error en el servidor al realizar la reserva');
        }
    };

    const handleSpaceChange = (e) => {
        const selectedSpace = e.target.value;
        setSpace(selectedSpace);

        // Detalles específicos para cada espacio común
        let spaceDetails = {};

        if (selectedSpace === 'gimnasio') {
            spaceDetails = {
                name: 'Zona de Parrillas',
                rules: 'Limpiar después de usar, no hacer ruido después de las 10 PM.',
                capacity: 'Capacidad: 15 personas',
                description: 'Espacio al aire libre con parrillas modernas y mesas. Ideal para reuniones familiares y eventos sociales.'
            };
        } else if (selectedSpace === 'piscina') {
            spaceDetails = {
                name: 'Piscina',
                rules: 'Ducha obligatoria antes de entrar, no correr en la zona de la piscina.',
                capacity: 'Capacidad: 20 personas',
                description: 'Piscina exterior, abierta de 6:00 AM a 9:00 PM. Ideal para nadar y relajarse.'
            };
        } else if (selectedSpace === 'sala_reuniones') {
            spaceDetails = {
                name: 'Sala de Reuniones',
                rules: 'Reservar con anticipación, mantener el orden y la limpieza.',
                capacity: 'Capacidad: 15 personas',
                description: 'Sala equipada con proyector, ideal para reuniones de trabajo o eventos pequeños.'
            };
        }

        setSpaceDetails(spaceDetails);
    };

    // Función para aplicar la clase CSS a los días reservados
    const isReservedDay = (date) => {
        return reservas.some(
            (reserva) =>
                new Date(reserva.date).toDateString() === date.toDateString()
        );
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        // Aquí puedes añadir la lógica para limpiar la sesión o token del usuario
        navigate('/login'); // Redirige al usuario a la página de login
    };

    return (
        <div className="reservations-container">
            <div className="reservations-form">
                <h2>Realizar una Reserva</h2>
                <form onSubmit={handleReservation}>
                    <div className="form-group">
                        <label>Fecha:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Hora:</label>
                        <input 
                            type="time" 
                            value={time} 
                            onChange={(e) => setTime(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Espacio:</label>
                        <select 
                            value={space} 
                            onChange={handleSpaceChange} 
                            required
                        >
                            <option value="">Seleccione un espacio</option>
                            <option value="gimnasio">Zona de Parrillas</option>
                            <option value="piscina">Piscina</option>
                            <option value="sala_reuniones">Sala de reuniones</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Confirma Email:</label> {/* Campo para el correo electrónico */}
                        <input 
                            type="email" 
                            value={userEmail} 
                            onChange={(e) => setUserEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Reservar</button>
                </form>
                {message && <p>{message}</p>}

                {/* Calendario de Disponibilidad */}
                <div className="calendar-container">
                    <h3>Calendario de Disponibilidad</h3>
                    <Calendar
                        value={new Date()}
                        onChange={setDate}
                        tileClassName={({ date, view }) => 
                            isReservedDay(date) ? 'reserved-day' : null
                        }
                    />
                </div>

                {/* Detalles del Espacio */}
                {spaceDetails && (
                    <div className="space-details">
                        <h3>Detalles del Espacio</h3>
                        <p><strong>Nombre:</strong> {spaceDetails.name}</p>
                        <p><strong>Capacidad:</strong> {spaceDetails.capacity}</p>
                        <p><strong>Reglas:</strong> {spaceDetails.rules}</p>
                        <p>{spaceDetails.description}</p>
                    </div>
                )}

                <button onClick={handleLogout} className="auth-btn logout-btn">Cerrar Sesión</button>
            </div>
            <div className="images-container">
                <img src="/img1.jpg" alt="Espacio 1" />
                <img src="/img2.jpg" alt="Espacio 2" />
                <img src="/img3.jpg" alt="Espacio 3" />
                <img src="/img4.jpg" alt="Espacio 4" />
            </div>
        </div>
    );
};

export default ReservationsPage;
