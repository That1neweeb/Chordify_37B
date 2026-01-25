import express from 'express';
import { getSuggestedProducts, getAllProducts, addProduct, searchProduct, getProductById, addComment, fetchComments, giveRating, getProductRatings, getMyProductListings, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js'
// import { upload } from '../middleware/multerConfig.js';
import { upload } from '../utils/uploadConfig.js';

const router = express.Router();



router.get("/suggested", getSuggestedProducts); // for suggestions
router.get("/buy", isAuthenticated, getAllProducts); // all products
router.post("/add", isAuthenticated, upload.array('image_files', 4), addProduct); // add product / post product
router.get("/search", searchProduct); // search product
router.get("/mylistings", isAuthenticated, getMyProductListings); // my listing (user's posted listing)
router.get("/comments/:id", fetchComments); // fetching comments of the product
router.put("/edit/:id", isAuthenticated, upload.array("image_files", 4), updateProduct); // edit product
router.delete("/:id", isAuthenticated, deleteProduct); // delete product
router.get("/:id", getProductById); 
router.post("/:id/addcomment", addComment); // adding comment on the product
router.post("/:id/rate", giveRating); // give rating to the product 
router.get("/:id/ratings", getProductRatings); // fetch product ratings



export default router;


