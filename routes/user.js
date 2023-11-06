import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Set up storage for uploaded files

const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);

import { signup, login, logout, changePassword, generateOTP, checkOTP, validateAuthToken, validateChangeToken } from '../controllers/user.js';

const router = express.Router();

router.get('/check-otp', validateAuthToken, (req,res)=>{
    return res.sendFile(path.join(__dirname,'../','src','views','otp.html'));
})

// router.get('/change-password', validateChangeToken, (req,res)=>{
//     return res.sendFile(path.join(__dirname,'src','views','change-password.html'));
// })

router.get('/change-password',  (req,res)=>{
    return res.sendFile(path.join(__dirname,'../','src','views','change.html'));
})

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/change-password', changePassword);
router.post('/change-password/generate-otp', generateOTP);
router.post('/change-password/check-otp', checkOTP);
// router.get('/')

export default router;