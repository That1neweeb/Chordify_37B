import express from 'express';
import { getSuggestedProducts, getAllProducts, addProduct, searchProduct, getProductById, addComment, fetchComments, giveRating, getProductRatings, getMyProductListings, updateProduct, deleteProduct, filterProducts } from '../controllers/productController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/multerConfig.js';

const router = express.Router();



router.get("/suggested", getSuggestedProducts); // for suggestions
router.get("/buy", isAuthenticated, getAllProducts); // all products
router.post("/add", isAuthenticated, upload.array('image_files', 4), addProduct); // add product / post product
router.get("/search", isAuthenticated, searchProduct); // search product
router.get("/mylistings", isAuthenticated, getMyProductListings); // my listing (user's posted listing)
router.get("/filter", isAuthenticated, filterProducts); //  filter route
router.get("/comments/:id", fetchComments); // fetching comments of the product
router.put("/edit/:id", isAuthenticated, upload.array("image_files", 4), updateProduct); // edit product
router.delete("/:id", isAuthenticated, deleteProduct); // delete product
router.get("/:id/ratings", isAuthenticated, getProductRatings); // fetch product ratings
router.post("/:id/addcomment", isAuthenticated, addComment); // adding comment on the product
router.post("/:id/rate", isAuthenticated, giveRating); // give rating to the product 
router.get("/:id", isAuthenticated, getProductById); 




export default router;


