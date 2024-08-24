const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

module.exports = router;