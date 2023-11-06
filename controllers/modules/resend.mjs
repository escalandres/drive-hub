import { Resend } from 'resend';
import { PLANTILLAS, createEmail } from './email.mjs';
const key = process.env.RESEND_API_KEY;

export async function sendRecoverEmail(userEmail, userName, code) {
    try {
        const email = createEmail(PLANTILLAS.recover, userName, code);
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log(email.subject)
        console.log(email.html)
        const data = await resend.emails.send({
            from: 'drivehub@hub.com',
            to: userEmail,
            subject: email.subject,
            html: email.html.toString()
        });
        console.log(data)
        return {success: true, error: ""}
    } catch (error) {
        console.error('Error al enviar el correo. ',error);
        return {success: false, error: error}
    }
}

