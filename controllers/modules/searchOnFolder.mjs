import fs from 'fs';
import path from 'path';
import {convertFileSize, convertFileDate} from './convertUnits.mjs';

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
export function serveFiles(userID,rutaCarpeta) {
    const miFolder = new Folder('', "");
    const pathToSearch = rutaCarpeta === '' ? path.join(DRIVE_PATH,userID) : path.join(DRIVE_PATH,userID,rutaCarpeta)
    const elementos = fs.readdirSync(pathToSearch);
    // Recorrer la lista de elementos
    elementos.forEach((elemento) => {
        const archivo1 = new Archivo();
        const rutaElemento = path.join(pathToSearch, elemento);
        const stats = fs.statSync(rutaElemento);
      if (stats.isFile()) {
        // Es un archivo
        archivo1.Extension = path.extname(elemento);
        archivo1.Name = elemento;
        archivo1.Size = convertFileSize(stats.size);
        archivo1.ModificationDate = convertFileDate(stats.mtime);
      } else if (stats.isDirectory()) {
        // Es una carpeta
        archivo1.Name = elemento;
        archivo1.ModificationDate = convertFileDate(stats.mtime);
      }
      miFolder.agregarArchivo(archivo1)
    });
    return miFolder;
}