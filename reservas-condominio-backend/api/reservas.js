const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva'); // Importa el modelo de Reserva

// Ruta para obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (err) {
        console.error('Error al obtener las reservas', err);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

// Ruta para crear una nueva reserva
router.post('/', async (req, res) => {
    const { date, space } = req.body;

    try {
        const nuevaReserva = new Reserva({ date, space });
        await nuevaReserva.save();
        res.status(201).json({ success: true, reserva: nuevaReserva });
    } catch (err) {
        console.error('Error al crear la reserva', err);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});

router.get('/test', (req, res) => {
    res.json({ message: 'Ruta de reservas funcionando correctamente' });
});


module.exports = router;
