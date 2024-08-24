const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    space: {
        type: String,
        required: true
    }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;
