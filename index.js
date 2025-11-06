require('dotenv').config();

const express = require('express');
const cors = require('cors');
const EmailService = require('./emailService')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS nos permitira aceptar solicitudes desde diferentes dominios
app.use(cors());
// Express nos permite que el servidor pueda procesar peticiones con estructura JSON
app.use(express.json());




// Rutas
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
})

app.post('/api/send-email', async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // Validacion de los datos recibidos
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        await EmailService.send({
            name,
            email,
            subject,
            message
        });

        res.status(200).json({ message: 'Correo enviado correctamente' });

    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
});

// Indica que el servidor este escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});