import express from 'express';
const router = express.Router();


// Controller
import { getRecommendedSongs } from '../controllers/songController.js';


// Fetch recommended songs
router.get("/recommended", getRecommendedSongs);
// router.get("/songContent",getSongContent);
// router.get("/searchSong",searchSongs)

export default router;
