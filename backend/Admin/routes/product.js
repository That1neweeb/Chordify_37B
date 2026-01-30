// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// USER
router.get('/approved', productController.getApprovedProducts);
// router.get('/approved', productController.getApprovedProducts);
router.post('/', productController.addProduct);

// ADMIN
router.get('/', productController.getAllProducts); // ✅ added
router.get('/all', productController.getAllProducts);
router.get('/pending', productController.getPendingProducts);
router.put('/approve/:id', productController.approveProduct);
router.put('/reject/:id', productController.rejectProduct);

module.exports = router;
