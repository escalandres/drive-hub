import express from 'express';
import path from 'path';

import { serveUserFolder } from '../controllers/file.js';

const router = express.Router();

router.use('/drive/mydrive/:folder?', (req,res,next) =>{
    const folder = req.params.folder ?? '';
    const fullPath = path.join(DRIVE_PATH,req.session.user.id,folder);
    express.static(fullPath)(req, res, next);
});

router.get('/drive/mydrive/:folder(*)', serveUserFolder);

export default router;