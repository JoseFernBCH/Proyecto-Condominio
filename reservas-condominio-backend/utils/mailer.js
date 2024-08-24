// mailer.js
const nodemailer = require('nodemailer');

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'jfernanj29@gmail.com',
    subject: 'Prueba de nodemailer',
    text: 'Este es un correo de prueba para verificar nodemailer.'
}, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo:', error);
    } else {
        console.log('Correo enviado:', info.response);
    }
});


// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true, // Activa el log
    debug: true   // Activa el debug
});

const sendConfirmationEmail = (userEmail, reservationDetails) => {
    console.log('Enviando correo a:', userEmail);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Confirmación de Reserva',
        text: `Tu reserva para el ${reservationDetails.date} a las ${reservationDetails.time} ha sido confirmada.
        Detalles del espacio: ${reservationDetails.space}. 
        ¡Gracias por reservar con nosotros!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = { sendConfirmationEmail };
