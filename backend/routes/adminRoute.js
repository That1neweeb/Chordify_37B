import express from "express";
import {addSong, approvePost, approveProduct, deleteUser, getAllProducts, getAllUsers, getPendingPosts, getPendingProducts, getRejectedProducts, rejectPost, rejectProduct} from "../controllers/adminController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/authorizeRole.js";

const router = express.Router();





//products
router.get("/products", isAuthenticated, isAdmin, getAllProducts); // Get all products (for admin overview)
router.get("/products/pending", isAuthenticated, isAdmin, getPendingProducts); // Get pending products (to approve/reject)
router.get("/products/rejected", isAuthenticated, isAdmin, getRejectedProducts); // Get rejected products
router.patch("/products/:id/approve", isAuthenticated, isAdmin, approveProduct); // Approve a guitar
router.patch("/products/:id/reject", isAuthenticated, isAdmin, rejectProduct); // Reject a guitar

//users
router.get("/users", isAuthenticated, isAdmin, getAllUsers); // get all users
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser); // delete a user

//posts
router.get("/posts/pending", isAuthenticated, isAdmin, getPendingPosts); // get pending posts
router.put("/posts/:id/approve", isAuthenticated, isAdmin, approvePost); // Approve a posts
router.put("/posts/:id/reject", isAuthenticated, isAdmin, rejectPost); // Reject a posts


//songs
// router.post("/add", isAuthenticated, isAdmin, upload.single("cover_image"), addSong);
// router.get("/", isAuthenticated, isAdmin, get);



export default router;
