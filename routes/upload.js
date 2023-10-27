import express from 'express';

import { file } from '../controllers/upload.js';

const router = express.Router();

router.post('/file', file.array('files'),(req, res) => {
    // Handle the uploaded file
    res.status(200).json({ success: true, message: 'File uploaded successfully!' });
});
// router.post('/folder', login);
// router.get('/')

export default router;