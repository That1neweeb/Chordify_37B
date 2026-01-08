import express from 'express';
import { upload } from '../utils/uploadConfig';
import { addVideo, getAllvideos } from '../controllers/postController';
import { verifyToken } from '../utils/jwt-util';

const router = express.Router();

router.post('/uploadVideo',verifyToken, upload.single('video_URL'),addVideo);
router.get('/getAllVideos',getAllvideos);

export default router;