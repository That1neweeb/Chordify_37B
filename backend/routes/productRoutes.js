import express from 'express';
import { getSuggestedProducts, getAllProducts, addProduct, searchProduct } from '../controllers/productController.js';
import { upload } from '../utils/uploadConfig.js';

const router = express.Router();



router.get("/suggested", getSuggestedProducts);
router.get("/buy", getAllProducts);
router.post("/add", upload.array('images', 5), addProduct);
router.get("/search", searchProduct);

export default router;


