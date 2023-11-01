import path from 'path';
import fs from 'fs';

export async function createFolder (req, res) {
  // const userFolder = req.session.user.id;
  const userFolder = 'alguien';
  const { folderName, destPath } = req.body;
  console.log(req.body)
  const newFolderPath  = path.join(__dirname, '../', 'drive', destPath, folderName);

  try {
    if (await folderExists(newFolderPath)) {
      res.status(400).json({ message: 'Folder already exists' });
    } else {
      await fs.promises.mkdir(newFolderPath);
      res.json({ success: true, message: 'Folder created successfully' });
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
