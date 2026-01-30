import express from 'express';
import { upload } from '../middleware/multerConfig.js';
import { addVideo, getAllvideos , getMyuploads} from '../controllers/postController.js';
// import { verifyToken } from '../utils/jwt-util.js';
import {isAuthenticated} from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/uploadVideo',isAuthenticated, upload.single('video_URL'),addVideo);
router.get('/getAllVideos',getAllvideos);
router.get('/getMyuploads',isAuthenticated,getMyuploads);

export default router;