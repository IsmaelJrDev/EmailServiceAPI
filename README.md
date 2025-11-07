# Email Service API

API para enviar emails de forma segura desde aplicaciones web. Diseñada específicamente para integrarse con portafolios y formularios de contacto.

## Resumen
Esta API proporciona un endpoint seguro para enviar emails utilizando NodeJS y Nodemailer. Incluye validación de datos, manejo de errores y una estructura HTML personalizada para los correos.

## Demo en línea
[URL de tu demo cuando la despliegues]

## Requisitos
- Node.js 14+
- npm (incluido con Node.js)
- Cuenta de Gmail (para el servicio de envío)

## Instalación y ejecución local

### Clona el repositorio:
```bash
git clone https://github.com/IsmaelJrDev/EmailServiceAPI.git
cd EmailServiceAPI
```

### Instalar dependencias:
```bash
npm install
```

### Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto:
```plaintext
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-password-de-aplicacion
PORT=5000
```

### Ejecutar en modo desarrollo:
```bash
npm run dev
```

La aplicación quedará accesible en http://localhost:5000

## Estructura del repositorio
- `index.js` — servidor Express y configuración principal.
- `emailService.js` — lógica del servicio de correo.
- `.env` — configuración de variables de entorno.
- `package.json` — dependencias y scripts.
- `README.md` — archivo de presentación.

## API (resumen de endpoints)

### GET /api/status
Verifica el estado del servicio.

Respuesta (JSON):
```json
{
    "status": "online",
    "service": "Email Service API",
    "version": "1.0.0"
}
```

### POST /api/send-email
Envía un email con los datos proporcionados.

Payload ejemplo:
```json
{
    "name": "Nombre del remitente",
    "email": "email@remitente.com",
    "subject": "Asunto del mensaje",
    "message": "Contenido del mensaje"
}
```

Respuesta exitosa (JSON):
```json
{
    "message": "Correo enviado correctamente"
}
```

Respuesta de error (JSON):
```json
{
    "error": "Mensaje de error específico"
}
```

Ejemplo curl:
```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test Subject","message":"Test Message"}'
```

## Notas técnicas
- Utiliza Nodemailer para el envío de correos
- Implementa CORS para permitir solicitudes desde diferentes dominios
- Incluye validación de campos y formato de email
- Utiliza plantillas HTML personalizadas para los correos
- Manejo de errores y respuestas apropiadas

## Configuración de Gmail
1. Habilitar la verificación en dos pasos en tu cuenta de Gmail
2. Generar una "Contraseña de aplicación"
3. Usar esa contraseña en la variable `EMAIL_PASSWORD`

## Deploy
Puedes desplegar esta API en plataformas como:
- Render
- Heroku
- Railway
- Vercel

Asegúrate de configurar las variables de entorno en la plataforma de despliegue.

## Archivos relevantes
- `index.js`
- `emailService.js`
- `.env`
- `package.json`
- `README.md`

## Seguridad
- No expone credenciales sensibles
- Valida el formato de los emails
- Implementa manejo de errores
- Utiliza variables de entorno para la configuración

## Licencia
MIT
API que permite el envio de correos electronicos para un proyecto web.
