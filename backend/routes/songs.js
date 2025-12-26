import express from 'express';
const router = express.Router();


// Controller
import { getRecommendedSongs } from '../controllers/songController.js';


// Fetch recommended songs
router.get("/recommended", getRecommendedSongs);
router.get("/songContent",songController.getSongContent);

module.exports = router;

