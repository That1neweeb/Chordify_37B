import express from 'express';
const router = express.Router();

import {isAuthenticated} from "../middleware/authMiddleware.js";
// Controller
import { fetchAllSongs, getSongContent, searchSongs } from '../controllers/songController.js';


// Fetch recommended songs
router.get("/", isAuthenticated, fetchAllSongs);
router.get("/songContent/:id", isAuthenticated, getSongContent);
router.get("/search", isAuthenticated, searchSongs);

export default router;

