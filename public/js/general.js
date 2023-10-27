import {ALERT_TYPE} from "./vars.js";

//Función para mostrar el panel
export function showLoading() {
    panel.style.display = "";
}

// Función para ocultar el panel
export function hideLoading() {
    panel.style.display = "none";
}

// document.addEventListener("DOMContentLoaded", function() {
//     // Código a ejecutar cuando el DOM ha sido cargado completamente
//     // mostrarPanel();
//     const currentYear = new Date().getFullYear();
//     document.getElementById('currentYear').textContent = currentYear;

//     // if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//     //     themeToggle.click();
//     // }
// });

export function reloadPage(){
    setTimeout(location.reload(),3000);
}

export const alerta = {
    success: (message) => {
        SendAlert(message, ALERT_TYPE.success);
    },
    error: (message) => {
        SendAlert(message, ALERT_TYPE.error);
    },
    info: (message) => {
        SendAlert(message, ALERT_TYPE.info);
    },
};

function SendAlert(message, type) {
    let bg = "";
    if (type === "success") bg = "linear-gradient(to right, #2ECC71, #27AE60)";
    else if (type === "error") bg = "linear-gradient(to right, #FF5733, #E74C3C)";
    else if (type === "info") bg = "linear-gradient(to right, #2c79ec, #3983f1)";
    else bg = "linear-gradient(to right, #2c79ec, #3983f1)";
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: bg,
        },
        onClick: function () {},
    }).showToast();
}


// function SendAlert(message, type){
//     let bg = ""
//     if(type === "success") bg = "linear-gradient(to right, #2ECC71, #27AE60)"
//     else if(type === "error") bg = "linear-gradient(to right, #FF5733, #E74C3C)"
//     else if(type === "info") bg = "linear-gradient(to right, #2c79ec, #3983f1)"
//     else bg = "linear-gradient(to right, #2c79ec, #3983f1)"
//     Toastify({
//         text: message,
//         duration: 3000,
//         newWindow: true,
//         close: true,
//         gravity: "top", // `top` or `bottom`
//         position: "right", // `left`, `center` or `right`
//         stopOnFocus: true, // Prevents dismissing of toast on hover
//         style: {
//             background: bg,
//         },
//         onClick: function(){} // Callback after click
//     }).showToast();
// }