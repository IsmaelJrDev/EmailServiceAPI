const nodemailer = require('nodemailer');

// Conexion al servicio de Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Para abrir el puerto 465
    // Credenciales de la cuenta de correo desde donde se enviaran los emails  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Clase del serviicio de correo
class emailService {
    static async send(data){
        const {
            name,
            email,
            subject,
            message
        } = data;

        // Configuracion del correo destinatario 
        const recieverEmail = process.env.EMAIL_USER
        
        // Cuerpo del correo 
        const emailbody = `
            <h1>Nuevo mensaje de ${name}</h1>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong> ${message}</p>
        `;

        const mailOptions = {
            from: `"${name}" <${email}>`, // Remitente
            to: recieverEmail, // Destinatario
            subject: subject, // Asunto
            html: emailbody // Cuerpo del correo en formato HTML
        };

        try{
            await transporter.sendMail(mailOptions);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.error('Error en EmailService:', error);
            throw new Error('Error al enviar el correo: ' + error.message);
        }
    }
}

module.exports = emailService;