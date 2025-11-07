const nodemailer = require('nodemailer');

// Conexion al servicio de Gmail
console.log('Configurando transporter con:', {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        // No mostramos la contraseña por seguridad
        pass: '****'
    },
    tls: {
        // permite conexiones a servidores con certificados no verificados en entornos controlados
        rejectUnauthorized: false
    },
    // timeouts en ms
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    // Credenciales de la cuenta de correo desde donde se enviaran los emails  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        // permite conexiones a servidores con certificados no verificados en entornos controlados
        rejectUnauthorized: false
    },
    // timeouts en ms
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

// Clase del servicio de correo
class emailService {
    static async send(data) {
        const { name, email, subject, message } = data;

        // Plantilla HTML del correo de respuesta
        const emailbody = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 15px; }
                    .content { margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Nuevo mensaje desde el servicio de API</h1>
                    </div>
                    <div class="content">
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Correo:</strong> ${email}</p>
                        <p><strong>Asunto:</strong> ${subject}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${message}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const mailOptions = {
            from: `"Portafolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Nuevo mensaje: ${subject}`,
            html: emailbody,
            replyTo: email
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Error en EmailService:', error);
            console.error('Detalles completos del error:', JSON.stringify(error, null, 2));
            throw new Error('Error al enviar el correo: ' + error.message);
        }
    }
}

module.exports = emailService;