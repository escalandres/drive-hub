//NPM modules - ECMAScript Modules
import fs from 'fs';
import path from 'path';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// -------------- My modules --------------
import {serveFiles} from './controllers/modules/searchOnFolder.mjs';
import userRoutes from './routes/user.js';
import uploadRoutes from './routes/upload.js';
import createRoutes from './routes/create.js';
import fileRoutes from './routes/file.js';
import { checkCookie } from './controllers/modules/checkCookie.mjs';


// -------------- Variables modules --------------
const app = express();

// -------------- Variables Globales --------------
// Obtiene la URL del archivo actual
const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);
global.__dirname = __dirname;
global.VIEWS_PATH = path.join(__dirname, 'src', 'views');
global.CONTROLLER_PATH = path.join(__dirname, 'controllers');
global.MODULES_PATH = path.join(__dirname, 'controllers', 'modules');
global.DRIVE_PATH = path.join(__dirname, 'drive');




// -------------- settings --------------
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

// -------------- Configuración de express-session  --------------
app.use(session({
    secret: process.env.KEY, // Cambia esto a una clave secreta fuerte en producción
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000, // 15 minutos (en milisegundos)
        secure: false,             // Solo se envía la cookie en conexiones seguras (HTTPS)
        httpOnly: true,           // La cookie solo es accesible por el servidor (no por JavaScript en el navegador)
        sameSite: 'strict',       // Controla cómo se envía la cookie en las solicitudes del mismo sitio
        path: '/',                // Ruta base donde se aplica la cookie
        domain: 'localhost:5321',    // Dominio para el que se aplicará la cookie
    },
}));

// -------------- Middlewares --------------
const authenticationMiddleware = (req, res, next) => {
    if (req.url.startsWith("/drive/mydrive") ) {
        // Verificar si el usuario no está autenticado
        if (!req.session || !req.session.user) {
            const estatus = checkCookie(req.cookies.AuthToken);
            if(estatus.success){
                req.session.user = estatus.decoded.user
                // next();
            }
            else return res.redirect('/login');
        }
        // console.log('Usuario autenticado');  
    }
    next();
};

// Middleware para manejar rutas no encontradas
const handleNotFound = (req, res, next) => {
    // console.log('err')
    return res.status(404).sendFile(path.join(VIEWS_PATH,'error.html'));
};



// Aplicar los middlewares en orden
app.use(express.static(path.join(__dirname, 'public')));
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    if (!req.session.user) {
        // Redirigir solo si el usuario no está autenticado
        return res.redirect('/login');
    }
    // Si hay una sesión de usuario iniciada, redirige a la ruta /ftp/:userId
    res.redirect(`/drive/mydrive`);
});

app.get('/error', (req,res)=>{
    return res.sendFile(path.join(VIEWS_PATH,'error.html'));
})

app.get('/login', (req,res)=>{
    return res.sendFile(path.join(VIEWS_PATH,'login.html'))
})

app.get('/recover',(req,res)=>{
    return res.sendFile(path.join(VIEWS_PATH,'recover.html'));
})

app.use('/user', userRoutes);


// Aplicar los middlewares en orden
// app.use('/drive/mydrive/:folder?', (req,res,next) =>{
//     const folder = req.params.folder ?? '';
//     // console.log(folder)
//     const fullPath = path.join(DRIVE_PATH,req.session.user.id,folder);
//     express.static(fullPath)(req, res, next);
// });

app.use(fileRoutes);

// app.get('/drive/mydrive/:folder(*)', (req, res) => {
//     // console.log('a')
//     const userID = req.session.user.id;
//     // console.log(req.params.folder)
//     const folder = req.params.folder ?? ''; // Obtener el valor del parámetro opcional
//     var folderInfo = serveFiles(userID,folder);
//     // console.log('---------------------------')
//     // console.log(JSON.stringify(folderInfo))
//      // Leer el archivo HTML y reemplazar los marcadores de posición con los valores correspondientes
//     const htmlTemplate = fs.readFileSync(path.join(VIEWS_PATH,'drive.html'), 'utf8');
//     const html = htmlTemplate
//         .replace('{folderInfo}', JSON.stringify(folderInfo));

//     // Enviar el HTML al cliente >= 
//     // -> 
//     res.send(html);  
// });


// Configura la ruta para manejar las subidas de archivos
app.use('/upload', uploadRoutes);

// Create Folder
app.use('/create',createRoutes);

app.use(handleNotFound);

app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))