import express from 'express';
import { getSuggestedProducts, getAllProducts, addProduct, searchProduct, getProductById, addComment, fetchComments, giveRating, getProductRatings } from '../controllers/productController.js';
import { upload } from '../utils/uploadConfig.js';

const router = express.Router();



router.get("/suggested", getSuggestedProducts);
router.get("/buy", getAllProducts);
router.post("/add", upload.array('images', 5), addProduct);
router.get("/search", searchProduct);
router.get("/:id", getProductById);
router.post("/:id/addcomment", addComment);
router.get("/comments/:id", fetchComments);
router.post("/:id/rate", giveRating);
router.get("/:id/ratings", getProductRatings);


export default router;


