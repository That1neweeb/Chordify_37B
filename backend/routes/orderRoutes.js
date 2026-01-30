import express from "express";
import { cancelOrder, createOrder, getUserOrders, payOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/checkout", isAuthenticated, checkout);
router.get("/", isAuthenticated, getUserOrders); // get orders
router.post("/create", isAuthenticated, createOrder); // create order
router.patch("/:id/cancel", isAuthenticated, cancelOrder); // cancel order
router.patch("/:id/pay", isAuthenticated, payOrder); // pay orders



export default router;
