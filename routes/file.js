import express from 'express';
import path from 'path';

import { signup, login, logout, changeUserPassword, generateOTP, checkOTP, validateAuthToken, validateChangeToken } from '../controllers/user.js';

const router = express.Router();

router.get('/check-otp', validateAuthToken, (req,res)=>{
    return res.sendFile(path.join(__dirname,'../','src','views','otp.html'));
})

router.get('/change-password', validateChangeToken, (req,res)=>{
    return res.sendFile(path.join(__dirname,'src','views','change-password.html'));
})

// router.get('/change-password',  (req,res)=>{
//     return res.sendFile(path.join(__dirname,'../','src','views','change.html'));
// })

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/change-password', changeUserPassword);
router.post('/generate-otp', generateOTP);
router.post('/check-otp', checkOTP);
// router.get('/')

export default router;