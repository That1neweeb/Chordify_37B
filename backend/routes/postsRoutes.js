import express from 'express';
import { upload } from '../utils/uploadConfig.js';
import { addVideo, getAllvideos } from '../controllers/postController.js';
import { verifyToken } from '../utils/jwt-util.js';

const router = express.Router();

router.post('/uploadVideo',verifyToken, upload.single('video_URL'),addVideo);
router.get('/getAllVideos',getAllvideos);

export default router;