//NPM modules
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//My modules
import {serveFiles} from './src/modules/searchOnFolder.mjs';

//Variables modules
const app = express();
// Obtiene la URL del archivo actual
const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);

//settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Middlewares
const authenticationMiddleware = (req, res, next) => {
    if (req.url.startsWith("/mydrive")) {
      // Verificar si el usuario no está autenticado
    if (!req.session || !req.session.user) {
        //console.log('Usuario no autenticado. Redirigiendo a /login');
        return res.redirect('/login');
    }
    }
    next();
};

// Middleware para manejar rutas no encontradas
const handleNotFound = (req, res, next) => {
    // console.log('err')
    return res.status(404).sendFile(path.join(__dirname,'src','views','error.html'));
};

// Aplicar los middlewares en orden
app.use(express.static(path.join(__dirname, 'public')));
// app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.send('Bienvenido')
});

// Aplicar los middlewares en orden
app.use('/drive/mydrive/:folder?', (req,res,next) =>{
    const folder = req.params.folder ?? '';
    // console.log(folder)
    const fullPath = path.join(__dirname, 'drive','alguien',folder);
    express.static(fullPath)(req, res, next);
});

app.get('/drive/mydrive/:folder(*)', (req, res) => {
    // console.log('a')
    const userID = 'alguien';
    // console.log(req.params.folder)
    const folder = req.params.folder ?? ''; // Obtener el valor del parámetro opcional
    var folderInfo = serveFiles(userID,folder);
    // console.log('---------------------------')
    // console.log(folderInfo)
     // Leer el archivo HTML y reemplazar los marcadores de posición con los valores correspondientes
    const htmlTemplate = fs.readFileSync(path.join(__dirname,'src','views','drive.html'), 'utf8');
    const html = htmlTemplate
        .replace('{folderInfo}', JSON.stringify(folderInfo));

    // Enviar el HTML al cliente >= 
    // -> 
    res.send(html);  
});

app.use(handleNotFound);

app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))