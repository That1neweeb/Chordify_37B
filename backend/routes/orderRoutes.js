import express from "express";
import { cancelOrder, createOrder, getUserOrders } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/checkout", isAuthenticated, checkout);
router.get("/", isAuthenticated, getUserOrders);
router.post("/create", isAuthenticated, createOrder);
router.patch("/orders/:id/cancel", isAuthenticated, cancelOrder);
// router.patch("/orders/:id/pay", isAuthenticated, );


export default router;
