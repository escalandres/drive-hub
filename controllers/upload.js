import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Importa el módulo fs
// Set up storage for uploaded files


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        // const subfolder = req.userId; // Obtener el valor del campo 'id' del JSON
        const subfolder = 'alguien';
        const destPath = req.body.destPath;
        console.log('destPath',destPath)
        const destinationPath = path.join(__dirname, '../', 'drive', subfolder,destPath);
        console.log('destination', destinationPath);
        fs.promises.mkdir(destinationPath, { recursive: true }, (err) => {
            if (err) {
            console.error('Error al crear la carpeta:', err);
            return cb(err, null);
            }
            cb(null, destinationPath);
        });
    },
    filename: async (req, file, cb) => {
        const originalName = file.originalname;
        const destinationPath = path.join(__dirname,'../', 'drive', subfolder, destPath);

        let newFilename = originalName;
        let counter = 1;

        while (await fileExists(path.join(destinationPath, newFilename))) {
            const fileNameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
            const fileExtension = path.extname(originalName);
            newFilename = `${fileNameWithoutExtension} (${counter})${fileExtension}`;
            counter++;
        }
        cb(null, newFilename);
    },
});






async function fileExists(filePath) {
    try {
        await fs.promises.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

// Create the multer instance
const file = multer({ storage: storage });

// // Exportar de forma asíncrona
// export async function uploadFile() {
//     return await file;
// }

export { file }