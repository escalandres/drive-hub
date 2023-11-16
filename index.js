//NPM modules - ECMAScript Modules
import path from 'path';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// -------------- My modules --------------
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

app.use(fileRoutes);

// Configura la ruta para manejar las subidas de archivos
app.use('/upload', uploadRoutes);

// Create Folder
app.use('/create',createRoutes);

app.use(handleNotFound);

app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))