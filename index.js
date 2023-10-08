const fs = require('fs');
const path = require('path');
const express = require('express')
const {convertFileSize, convertFileDate} = require('./convertUnits');
const {analizarCarpeta} = require('./searchOnFolder');
const app = express();
const port = 4000;

//settings
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set the view engine to ejs
// app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.send('Bienvenido')
});


// Aplicar los middlewares en orden
app.use('/drive/mydrive', (req,res,next) =>{
    express.static(path.join(__dirname, 'drive','alguien'))(req, res, next);
});
// app.get('/drive/mydrive', (req, res) => {
//     return res.sendFile(path.join(__dirname,'table.html'));
// });

// app.post('/drive/mydrive', (req, res) => {
//     const rutaCarpeta = 'ftp/alguien';
//     var result = analizarCarpeta(rutaCarpeta);
//     console.log('---------------------------')
//     console.log(result)
//     return res.json(result)
// });

app.get('/drive/mydrive/:folder?', (req, res) => {
    console.log('a')
    const userID = 'alguien';
    console.log(req.params.folder)
    const folder = req.params.folder ?? ''; // Obtener el valor del parámetro opcional
    var folderInfo = analizarCarpeta(userID,folder);
    console.log('---------------------------')
    console.log(folderInfo)
     // Leer el archivo HTML y reemplazar los marcadores de posición con los valores correspondientes
    const htmlTemplate = fs.readFileSync('table.html', 'utf8');
    const html = htmlTemplate
        .replace('{folderInfo}', JSON.stringify(folderInfo));

    // Enviar el HTML al cliente
    res.send(html);
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`))