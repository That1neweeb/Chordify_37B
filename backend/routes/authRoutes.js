import express from 'express';
const router = express.Router();

// Controller
import { registerUser, login, verifyUser,changePassword,sendResetPasswordEmail, 
    resetPasswordFromEmail, updateProfile, upload, getProfile, deleteAccount} from '../controllers/authController.js';
import { protect } from "../middleware/authMiddleware.js";
// Routes
router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:token', verifyUser);
router.put("/change-password", protect, changePassword);
// Request reset password email
router.post("/reset-password-email", sendResetPasswordEmail);
// Reset password using token from email
router.post("/reset-password/:token", resetPasswordFromEmail);
router.post("/profile/update", protect, upload.single("profile_image"), updateProfile);
router.get("/profile", protect, getProfile);
router.delete("/delete-acc", protect, deleteAccount);


export default router;