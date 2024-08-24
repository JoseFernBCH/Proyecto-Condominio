const fetchReservations = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/reservas');
        setReservations(response.data);
    } catch (error) {
        console.error('Error al obtener las reservas', error);
    }
};
