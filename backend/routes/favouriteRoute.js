import express from "express"
import { addSongToFavourite, addToFavourite, getFavourites, getSongFavourites, removeFromFavourite, removeSongFromFavourite } from "../controllers/favouriteController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", isAuthenticated, addToFavourite);
router.delete("/:id", isAuthenticated, removeFromFavourite);
router.get("/", isAuthenticated, getFavourites);

router.post("/songs/:id", isAuthenticated, addSongToFavourite);
router.delete("/songs/:id", isAuthenticated, removeSongFromFavourite);
router.get("/songs", isAuthenticated, getSongFavourites);



export default router;