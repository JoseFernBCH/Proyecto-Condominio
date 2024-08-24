import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta el puerto si es necesario
});

export const getEspacios = () => api.get('/espacios');
export const createReserva = (data) => api.post('/reservas', data);
export const login = (data) => api.post('/login', data);