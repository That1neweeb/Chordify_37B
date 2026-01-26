// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Delete a user
router.delete('/:id', userController.deleteUser);

//Create users
router.post('/', userController.createUser);


module.exports = router;
