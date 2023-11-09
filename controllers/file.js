import path from 'path';
import fs from 'fs';

export async function createFolder (req, res) {
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
  };