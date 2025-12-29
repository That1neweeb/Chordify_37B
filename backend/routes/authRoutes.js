import express from 'express';
const router = express.Router();

// Controller
import { registerUser, login, verifyUser } from '../controllers/authController.js';

// Routes
router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:token', verifyUser);


export default router;