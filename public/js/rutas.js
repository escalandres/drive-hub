const MAIN_PATH = {
    path: "http://localhost:5321/drive/mydrive/",
    name: "My Drive"
}

function eliminarRutaPrincipal(cadenaOriginal) {
    // Definir la subcadena que deseas eliminar
    const subcadenaAEliminar = '/drive/mydrive';
    alert(subcadenaAEliminar)
    console.log('cadena',cadenaOriginal)
    // Utilizar el método replace para eliminar la subcadena
    const resultado = cadenaOriginal.replace(subcadenaAEliminar, '');
    alert(resultado)
    return resultado;
}

function crearEnlacesDeRuta() {
    const pathContainer = document.getElementById('path-container'); 
    // Obtener la URL actual del navegador
    const url = new URL(window.location.href);
    const ruta = url.pathname; // Obtener la ruta
    console.log('ruta',ruta)
    //---------------------- Crear elemento principal --------------------
    const enlace = document.createElement('a');
    enlace.textContent = MAIN_PATH.name;
    // Construir la URL a la que redirigir
    enlace.href = MAIN_PATH.path;
    // Agregar el elemento <a> al cuerpo del documento
    pathContainer.appendChild(enlace);

    // Obtener elementos ruta del usuario
    const folders = eliminarRutaPrincipal(ruta)
    
    // Dividir la ruta en componentes
    const componentes = folders.split('/').filter(Boolean);
    console.log('componentes')
    console.log(componentes)
    //---------------- Crear elementos <a> para cada componente de la ruta ---------------
    for (let i = 0; i < componentes.length; i++) {
        const enlace = document.createElement('a');
        enlace.textContent = componentes[i];
        // Construir la URL a la que redirigir
        const urlComponente = MAIN_PATH + folders.substring(0, folders.indexOf(componentes[i]) + componentes[i].length);
        enlace.href = urlComponente;
        
        // Agregar el elemento <a> al cuerpo del documento
        pathContainer.appendChild(enlace);
        // Agregar un separador ">" entre los enlaces, excepto para el último
        if (i < componentes.length - 1) {
            const separador = document.createTextNode(' > ');
            pathContainer.appendChild(separador);
        }
    }
}

    // Llamar a la función para crear los enlaces de la ruta
    crearEnlacesDeRuta();
