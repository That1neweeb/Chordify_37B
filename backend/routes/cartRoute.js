import express from "express"
import { addToCart, getCartItems, updateCartQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add', addToCart);
router.get('/items', getCartItems);
router.patch('/item/:id', updateCartQuantity);


export default router;