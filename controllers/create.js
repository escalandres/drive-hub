import path from 'path';
import fs from 'fs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Set up storage for uploaded files

const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);

export async function createFolder (req, res) {
  // const userFolder = req.session.user.id;
  const userFolder = 'alguien';
  const { folderName, destPath } = req.body;
  console.log(req.body)
  const newFolderPath  = path.join(__dirname, '../', 'drive', userFolder, destPath, folderName);

  try {
    if (await folderExists(newFolderPath)) {
      res.status(400).json({ message: 'Folder already exists' });
    } else {
      await fs.promises.mkdir(newFolderPath);
      res.status(200).json({ success: true, message: 'Folder created successfully' });
    }
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function folderExists(folderPath) {
    try {
        const stats = await fs.promises.stat(folderPath);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}
