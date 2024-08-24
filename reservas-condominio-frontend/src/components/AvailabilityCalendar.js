import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservations.css';

const AvailabilityCalendar = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        // Obtener las reservas desde el backend
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservas');
                setReservas(response.data);
            } catch (error) {
                console.error('Error al cargar las reservas', error);
            }
        };

        fetchReservas();
    }, []);

    // Función para aplicar la clase CSS a los días reservados
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return reservas.some(
                (reserva) =>
                    new Date(reserva.date).getDate() === date.getDate() &&
                    new Date(reserva.date).getMonth() === date.getMonth() &&
                    new Date(reserva.date).getFullYear() === date.getFullYear()
            )
                ? 'reserved-day'
                : null;
        }
    };

    return (
        <div className="calendar-container">
            <h3>Calendario de Disponibilidad</h3>
            <Calendar
                value={new Date()}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default AvailabilityCalendar;
