import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

// Controller
import { registerUser, login, verifyUser } from '../controllers/authController.js';

// Routes
router.get('/me', isAuthenticated, (req,res) => {
    res.status(200).json({
        user: req.user
    });
});
router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:token', verifyUser);


export default router;