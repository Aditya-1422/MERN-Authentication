import express from 'express'
import { googlelogin, login, logout, register } from '../controller/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/google',googlelogin);

export default router;