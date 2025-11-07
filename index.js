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


// Función de validación de email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


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


        // Validación de los campos
        if (!name?.trim()) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        if (!email?.trim() || !validateEmail(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        if (!subject?.trim()) {
            return res.status(400).json({ error: 'El asunto es requerido' });
        }
        if (!message?.trim()) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
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


// Ruta de estado para verificar que la API está en línea
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        service: 'Email Service API',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Indica que el servidor este escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});