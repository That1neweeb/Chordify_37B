import express from 'express';
const router = express.Router();


// Controller
import { getMyFavourites, getRecommendedSongs,getSongContent,searchSongs, setFavourite } from '../controllers/songController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';


// Fetch recommended songs
router.get("/recommended", getRecommendedSongs);
router.get("/getSongContent/:id",getSongContent);
router.get("/searchSong",searchSongs);
router.post("/:id/addFavourite",isAuthenticated,setFavourite);
router.get("/getFavourites",isAuthenticated,getMyFavourites);

export default router;  

