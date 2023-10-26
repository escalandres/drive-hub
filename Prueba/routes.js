const SERVER = {
    path: "localhost:5321",
    name: "Drive Hub"
}

const DRIVE_FOLDER = {
    path: "/drive/mydrive/",
    name: "My Drive"
}

function eliminarRutaPrincipal(cadenaOriginal) {
    // Definir la subcadena que deseas eliminar
    const subcadenaAEliminar = DRIVE_FOLDER.path;
    // alert(subcadenaAEliminar)
    console.log('cadena',cadenaOriginal)
    // Utilizar el método replace para eliminar la subcadena
    const resultado = cadenaOriginal.replace(subcadenaAEliminar, '');
    // alert(resultado)
    return resultado;
}

function obtenerUltimaParteDeRuta(ruta) {
    // Dividir la ruta en partes utilizando el separador '/'
    const partes = ruta.split('/');
    
    // Obtener la última parte (el último elemento del array)
    const ultimaParte = partes[partes.length - 2];
    
    return ultimaParte;
}

function crearEnlacesDeRuta() {
    const pathContainer = document.getElementById('path-container'); 
    // Obtener la URL actual del navegador
    const url = new URL(window.location.href);
    const ruta = url.pathname; // Obtener la ruta
    //---------------------- Crear elemento principal --------------------
    const enlace = document.createElement('a');
    enlace.textContent = DRIVE_FOLDER.name;
    // Construir la URL a la que redirigir
    enlace.href = DRIVE_FOLDER.path;
    // Agregar el elemento <a> al cuerpo del documento
    pathContainer.appendChild(enlace);

    // Obtener elementos ruta del usuario
    const folders = eliminarRutaPrincipal(ruta)
    console.log('folders',folders)
    // Dividir la ruta en componentes
    const componentes = folders.split('/').filter(Boolean);
    console.log('componentes')
    console.log(componentes)

    //---------------- Crear elementos <a> para cada componente de la ruta ---------------
    for (let i = 0; i < componentes.length; i++) {
        console.log('i', i)
        console.log('length', componentes.length)
        // Agregar un separador ">" entre los enlaces, excepto para el último
        if (i <= componentes.length - 1 || i === 0) {
            // const separador = document.createTextNode(' > ');
            const separador = document.createElement('span');
            separador.textContent = ' > '
            pathContainer.appendChild(separador);
            console.log('>')
        }
        const enlace = document.createElement('a');
        enlace.textContent = componentes[i];
        // Construir la URL a la que redirigir
        const urlComponente = ruta.substring(0, ruta.indexOf(componentes[i]) + componentes[i].length);
        // const urlComponente = SERVER + '/' + componentes[i];
        console.log('urlComponente',urlComponente)
        enlace.href = urlComponente;
        
        // Agregar el elemento <a> al cuerpo del documento
        pathContainer.appendChild(enlace);
        
    }
    let pathName = new URL(window.location.href);
    pathName = obtenerUltimaParteDeRuta(pathName.pathname)
    alert(pathName)
    document.title = pathName + ' - ' + SERVER.name
}

    // Llamar a la función para crear los enlaces de la ruta
    crearEnlacesDeRuta();
