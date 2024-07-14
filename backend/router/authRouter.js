import express from 'express'
import { googlelogin, login, register } from '../controller/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/google',googlelogin);

export default router;