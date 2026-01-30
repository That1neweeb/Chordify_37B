// controllers/productController.js
const Product = require('../models/productModel');

// USER FUNCTIONS

// Get approved products (for user dashboard)
async function getApprovedProducts(req, res) {
  try {
    const products = await Product.findAll({ where: { status: 'approved' } });
    res.json(products);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Add new product (user submission)
async function addProduct(req, res) {
  try {
    const { name, category, price, stock, user_id } = req.body;
    if(!name || !category || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Product.create({
      name,
      category,
      price,
      stock,
      status: 'pending',
      user_id
    });

    res.json({ message: "Product submitted for admin approval" });
  } catch(err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// ADMIN FUNCTIONS

// Get all products (admin)
async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch(err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Get pending products (admin approval)
async function getPendingProducts(req, res) {
  try {
    const products = await Product.findAll({ where: { status: 'pending' }, order: [['id','DESC']] });
    res.json(products);
  } catch(err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Approve product
async function approveProduct(req, res) {
  try {
    const { id } = req.params;
    await Product.update({ status: 'approved' }, { where: { id } });
    res.json({ message: "Product approved" });
  } catch(err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Reject product
async function rejectProduct(req, res) {
  try {
    const { id } = req.params;
    await Product.update({ status: 'rejected' }, { where: { id } });
    res.json({ message: "Product rejected" });
  } catch(err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

module.exports = {
  getApprovedProducts,
  addProduct,
  getAllProducts,
  getPendingProducts,
  approveProduct,
  rejectProduct
};
