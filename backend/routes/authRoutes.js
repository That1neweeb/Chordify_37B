import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerConfig.js';
const router = express.Router();

// Controller
import { registerUser, login, verifyUser,changePassword,sendResetPasswordEmail, 
    resetPasswordFromEmail, getProfile, updateProfile, deleteAccount, logout} from '../controllers/authController.js';
// Routes
router.get('/me', isAuthenticated, (req,res) => {
    res.status(200).json({
        user: req.user
    });
});

router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:token', verifyUser);
router.put("/change-password", isAuthenticated, changePassword);
// Request reset password email
router.post("/reset-password-email", sendResetPasswordEmail);
// Reset password using token from email
router.post("/reset-password/:token", resetPasswordFromEmail);
router.get("/profile", isAuthenticated, getProfile);
router.post("/profile/update", isAuthenticated, upload.single("profile_image"), updateProfile);
router.delete("/delete-acc", isAuthenticated, deleteAccount);
router.post("/logout", isAuthenticated, logout); // add this line



export default router;