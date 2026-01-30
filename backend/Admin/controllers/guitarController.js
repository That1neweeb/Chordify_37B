// controllers/guitarController.js
const Guitar = require('../models/guitarModel');

// USER FUNCTIONS

// Get approved guitars (user side)
async function getApprovedGuitars(req, res) {
  try {
    const guitars = await Guitar.findAll({
      where: { status: 'approved' }
    });
    res.json(guitars);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Add new guitar (user submission)
async function addGuitar(req, res) {
  try {
    const { name, brand, price, stock,condition, user_id } = req.body;

    if (!name || !brand || !price || !stock || !condition) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Guitar.create({
      name,
      brand,
      price,
      stock,
      condition,
      status: 'pending', //  MUST be pending
      user_id
    });

    res.json({ message: "Guitar submitted for admin approval" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// ADMIN FUNCTIONS

// Get all guitars
async function getAllGuitars(req, res) {
  try {
    const guitars = await Guitar.findAll();
    res.json(guitars);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Get pending guitars (ADMIN)
async function getPendingGuitars(req, res) {
  try {
    const guitars = await Guitar.findAll({
      where: { status: 'pending' },
      order: [['id', 'DESC']]
    });

    res.json(guitars);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Approve guitar
async function approveGuitar(req, res) {
  try {
    const { id } = req.params;
    await Guitar.update(
      { status: 'approved' },
      { where: { id } }
    );
    res.json({ message: "Guitar approved" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Reject guitar
async function rejectGuitar(req, res) {
  try {
    const { id } = req.params;
    await Guitar.update(
      { status: 'rejected' },
      { where: { id } }
    );
    res.json({ message: "Guitar rejected" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Get rejected guitars (ADMIN)
async function getRejectedGuitars(req, res) {
  try {
    const guitars = await Guitar.findAll({
      where: { status: 'rejected' },
      order: [['id', 'DESC']]
    });
    res.json(guitars);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

// Get suggested guitars (example logic)
async function getSuggestedGuitars(req, res) {
  try {
    const guitars = await Guitar.findAll({
      where: { status: 'approved' },
      limit: 5
    });
    res.json(guitars);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
}

module.exports = {
  getApprovedGuitars,
  addGuitar,
  getAllGuitars,
  getPendingGuitars,
  approveGuitar,
  rejectGuitar,
  getRejectedGuitars,
  getSuggestedGuitars
};
