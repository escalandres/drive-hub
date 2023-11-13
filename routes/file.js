import express from 'express';
import path from 'path';

import { serveUserFolder } from '../controllers/file.js';

const router = express.Router();

// router.get('/check-otp', validateAuthToken, (req,res)=>{
//     return res.sendFile(path.join(__dirname,'../','src','views','otp.html'));
// })

// router.get('/change-password', validateChangeToken, (req,res)=>{
//     return res.sendFile(path.join(__dirname,'src','views','change-password.html'));
// })

// router.get('/change-password',  (req,res)=>{
//     return res.sendFile(path.join(__dirname,'../','src','views','change.html'));
// })

router.get('/drive/mydrive/:folder(*)', serveUserFolder);
// router.post('/login', login);
// router.post('/logout', logout);
// router.get('/')

export default router;