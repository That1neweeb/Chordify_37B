// controllers/userController.js
const User = require('../models/userModel');

// Fetch all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({ order: [['id', 'DESC']] });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
}

// Delete a user
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
}

// Create user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
}


module.exports = { getAllUsers, deleteUser, createUser};
