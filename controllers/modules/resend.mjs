import { Resend } from 'resend';
import { PLANTILLAS, createEmail } from './email.mjs';
const key = process.env.RESEND_API_KEY;

export async function sendEmail(userEmail, userName, code) {
    try {
        const email = createEmail(PLANTILLAS.recover, userName, code);
        const resend = new Resend(key);
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userEmail,
            subject: email.subject,
            html: email.html
        });
        return {success: true, error: ""}
    } catch (error) {
        console.error('Error al enviar el correo. ',error);
        return {success: false, error: error}
    }
}

