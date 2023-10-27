import express from 'express';

import { createFolder } from '../controllers/create.js';

const router = express.Router();

router.post('/folder', createFolder);

export default router;