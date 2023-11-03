//NPM modules - ECMAScript Modules
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';

//My modules
import {serveFiles} from './controllers/modules/searchOnFolder.mjs';
import userRoutes from './routes/user.js';
import uploadRoutes from './routes/upload.js';
import createRoutes from './routes/create.js';



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

// Configuración de express-session
app.use(session({
    secret: process.env.KEY, // Cambia esto a una clave secreta fuerte en producción
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 1000 * 60 * 15, // 15 minutos (en milisegundos)
    //     secure: false,             // Solo se envía la cookie en conexiones seguras (HTTPS)
    //     httpOnly: true,           // La cookie solo es accesible por el servidor (no por JavaScript en el navegador)
    //     sameSite: 'strict',       // Controla cómo se envía la cookie en las solicitudes del mismo sitio
    //     path: '/',                // Ruta base donde se aplica la cookie
    //     domain: 'localhost:3001',    // Dominio para el que se aplicará la cookie
    // },
}));

//Middlewares
const authenticationMiddleware = (req, res, next) => {
    if (req.url.startsWith("/drive/mydrive")) {
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
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    if (!req.session.user) {
        // Redirigir solo si el usuario no está autenticado
        return res.redirect('/login');
    }

    // Si hay una sesión de usuario iniciada, redirige a la ruta /ftp/:userId
    res.redirect(`/drive/mydrive`);
});

app.get('/login', (req,res)=>{
    return res.sendFile(path.join(__dirname,'src','views','login.html'))
})

app.get('/recover',(req,res)=>{
    return res.sendFile(path.join(__dirname,'src','views','recover.html'));
})


app.get('/check-otp',(req,res)=>{
    return res.sendFile(path.join(__dirname,'src','views','otp.html'));
})

app.use('/user', userRoutes);

// Aplicar los middlewares en orden
app.use('/drive/mydrive/:folder?', (req,res,next) =>{
    const folder = req.params.folder ?? '';
    // console.log(folder)
    const fullPath = path.join(__dirname, 'drive',req.session.user.id,folder);
    express.static(fullPath)(req, res, next);
});

app.get('/drive/mydrive/:folder(*)', (req, res) => {
    // console.log('a')
    const userID = req.session.user?.id;
    // console.log(req.params.folder)
    const folder = req.params.folder ?? ''; // Obtener el valor del parámetro opcional
    var folderInfo = serveFiles(userID,folder);
    // console.log('---------------------------')
    // console.log(JSON.stringify(folderInfo))
     // Leer el archivo HTML y reemplazar los marcadores de posición con los valores correspondientes
    const htmlTemplate = fs.readFileSync(path.join(__dirname,'src','views','drive.html'), 'utf8');
    const html = htmlTemplate
        .replace('{folderInfo}', JSON.stringify(folderInfo));

    // Enviar el HTML al cliente >= 
    // -> 
    res.send(html);  
});

// Middleware personalizado para agregar req.session.user.id al cuerpo de la solicitud
// app.use('/upload', (req, res, next) => {
//     req.userId = req.session.user.id;
//     next();
// });

// app.post('/upload/file1', (req,res,next)=>{
//     console.log('archivos')
//     console.log(req)
// })

  // Configura la ruta para manejar las subidas de archivos
app.use('/upload', uploadRoutes);

// app.use('/create-folder', (req, res, next) => {
//     req.folderName = req.body.folderName;
//     next();
// });

// Create Folder
app.use('/create',createRoutes);




app.use(handleNotFound);

app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))