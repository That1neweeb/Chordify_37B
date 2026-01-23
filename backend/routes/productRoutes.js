import express from 'express';
import { getSuggestedProducts, getAllProducts, addProduct, searchProduct, getProductById, addComment, fetchComments, giveRating, getProductRatings } from '../controllers/productController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js'
// import { upload } from '../middleware/multerConfig.js';
import { upload } from '../utils/uploadConfig.js';

const router = express.Router();



router.get("/suggested", getSuggestedProducts);
router.get("/buy", getAllProducts);
router.post("/add", isAuthenticated, upload.array('image_files', 4), addProduct);
router.get("/search", searchProduct);
router.get("/:id", getProductById);
router.post("/:id/addcomment", addComment);
router.get("/comments/:id", fetchComments);
router.post("/:id/rate", giveRating);
router.get("/:id/ratings", getProductRatings);


export default router;


