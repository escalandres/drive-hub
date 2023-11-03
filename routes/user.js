import express from 'express';

import { signup, login, logout, changePassword, generateOTP, checkOTP } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/change-password', changePassword);
router.post('/change-password/generate-otp', generateOTP);
router.post('/change-password/check-otp', checkOTP);
// router.get('/')

export default router;