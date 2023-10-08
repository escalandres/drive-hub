const fs = require('fs');
const path = require('path');
const {convertFileSize, convertFileDate} = require('./convertUnits');

// class Archivo {
//     constructor(name, modificationDate, extension, size) {
//         this.Name = name;
//         this.ModificationDate = modificationDate;
//         this.Extension = extension;
//         this.Size = size;
//     }
// }

class Archivo {
    constructor() {
        this.Name = '';
        this.ModificationDate = '';
        this.Extension = '';
        this.Size = '';
    }
}

class Folder {
    constructor(path, name) {
        this.Path = path;
        this.Name = name;
        this.Archivos = []; // Inicializamos la lista de archivos como un array vacío
    }

    // Método para agregar un archivo a la lista de archivos
    agregarArchivo(archivo) {
        this.Archivos.push(archivo);
    }
}

// Busqueda carpeta actual
function analizarCarpeta(userID,rutaCarpeta) {
    console.log('analizar')
    console.log(userID,rutaCarpeta)
    const miFolder = new Folder('', "");
    const pathToSearch = rutaCarpeta === '' ? path.join('drive',userID) : path.join('drive',userID,rutaCarpeta)
    console.log('path', pathToSearch)
    // Obtener una lista de elementos en la carpeta
    const elementos = fs.readdirSync(pathToSearch);
    // console.log(elementos)
    // Recorrer la lista de elementos
    elementos.forEach((elemento) => {
        // console.log('hola')
        const archivo1 = new Archivo();
        const rutaElemento = path.join(pathToSearch, elemento);
        const stats = fs.statSync(rutaElemento);
        // console.log(stats)
      if (stats.isFile()) {
        // Es un archivo
        archivo1.Extension = path.extname(elemento);
        archivo1.Name = elemento;
        archivo1.Size = convertFileSize(stats.size);
        archivo1.ModificationDate = convertFileDate(stats.mtime);
        // console.log(`Archivo: ${elemento}`);
        // console.log(`Tamaño: ${convertFileSize(stats.size)}`);
        // console.log(`Fecha de modificación: ${convertFileDate(stats.mtime)}`);
      } else if (stats.isDirectory()) {
        // Es una carpeta
        archivo1.Name = elemento;
        archivo1.ModificationDate = convertFileDate(stats.mtime);
        // console.log(`Carpeta: ${elemento}`);
        // console.log(`Fecha de modificación: ${convertFileDate(stats.mtime)}`);
      }
      miFolder.agregarArchivo(archivo1)
    });
    return miFolder;
}

module.exports = {
    analizarCarpeta
}