import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { uploadProfile } from '../middleware/multerConfig.js';
const router = express.Router();


router.get('/', isAuthenticated, getProfile);
router.put("/profile/update", isAuthenticated, uploadProfile.single("profile_image"), updateProfile);




export default router;