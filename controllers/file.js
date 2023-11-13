import path from 'path';
import fs from 'fs';

export async function serveUserFolder (req, res) {
    const userID = req.session.user?.id;
    const folder = req.params.folder ?? ''; // Obtener el valor del parámetro opcional
    var folderInfo = serveFiles(userID,folder);
     // Leer el archivo HTML y reemplazar los marcadores de posición con los valores correspondientes
    const htmlTemplate = fs.readFileSync(path.join(__dirname,'src','views','drive.html'), 'utf8');
    const html = htmlTemplate
        .replace('{folderInfo}', JSON.stringify(folderInfo));
    res.send(html);  
  };