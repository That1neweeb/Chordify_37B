import express from "express"
import { addToCart, getCartItems, removeCartItem, updateCartQuantity } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/add', isAuthenticated, addToCart);
router.get('/items', isAuthenticated, getCartItems);
router.patch('/item/:id', isAuthenticated, updateCartQuantity);
router.delete('/item/:id', isAuthenticated, removeCartItem)


export default router;