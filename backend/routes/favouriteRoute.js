import express from "express"
import { addToFavourite, getFavourites, removeFromFavourite } from "../controllers/favouriteController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", isAuthenticated, addToFavourite);
router.delete("/:id", isAuthenticated, removeFromFavourite);
router.get("/", isAuthenticated, getFavourites);

export default router;