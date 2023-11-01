export function convertFileSize(fileSizeInBytes) {
    // console.log(fileSizeInBytes)
    if(fileSizeInBytes === ""){
        return "------";
    }
    else{
        if (fileSizeInBytes < 1024) {
            return fileSizeInBytes + " B";
        } else if (fileSizeInBytes < 1024 * 1024) {
            return (fileSizeInBytes / 1024).toFixed(2) + " kB";
        } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
            return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
        } else {
            return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        }
    }
}

export function convertFileDate(fechaEnFormatoPersonalizado) {
    const meses = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
    ];

    const fechaActual = new Date();
    const fechaFormateada = new Date(fechaEnFormatoPersonalizado);

    if (isNaN(fechaFormateada.getTime())) {
        return "Fecha inválida";
    }

    const dia = fechaFormateada.getDate();
    const mes = meses[fechaFormateada.getMonth()];
    const año = fechaFormateada.getFullYear();
    const horaFormateada = fechaFormateada.toLocaleTimeString();

    if (fechaActual.toDateString() === fechaFormateada.toDateString()) {
        return `${dia} ${mes} ${año} ${horaFormateada}`;
    } else {
        return `${dia} ${mes} ${año}`;
    }
}