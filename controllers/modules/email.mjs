import handlebars from 'handlebars';
import fs from 'fs';

export var PLANTILLAS = {
    recover: {
        subject: "Recuperar cuenta",
        file: 'p-recover.html'
    },
}

export function createEmail(plantilla, name, code) {
    const source = fs.readFileSync(plantilla.file, 'utf8');
    // Define los valores a reemplazar en la plantilla
    const replacements = {
        name: name,
        code: code,
    };
    // Compila la plantilla con Handlebars
    const template = handlebars.compile(source);

    // Llena la plantilla con los valores de reemplazo
    const html = template(replacements);
    return { subject: plantilla.subject, html: html };
}