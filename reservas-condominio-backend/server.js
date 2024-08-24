//CODIGO server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const reservationRoutes = require('./api/reservas');
const authRoutes = require('./routes/auth'); // Importa el archivo de rutas de autenticación

const app = express();

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/reservas_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((err) => {
    console.error('Error al conectar a la base de datos', err);
});

// Montar rutas
app.use('/api', authRoutes);
app.use('/api/reservas', reservationRoutes);

mongoose.connect('mongodb://localhost:27017/reservas_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Inicia el servidor en el puerto 5000
app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});
