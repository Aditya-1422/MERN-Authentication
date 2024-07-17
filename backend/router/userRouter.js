import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { updateUser } from '../controller/userController.js';

const router = express.Router();

router.post('/update/:id',verifyToken,updateUser)

export default router;