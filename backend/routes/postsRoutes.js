import express from "express";
import { uploadVideo } from "../middleware/multerConfig.js";
import { addVideo, getAllVideos } from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/uploadVideo", isAuthenticated, uploadVideo.single("video_URL"), addVideo);
router.get("/getAllVideos", isAuthenticated, getAllVideos);

export default router;
