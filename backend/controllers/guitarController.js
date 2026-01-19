const Guitar = require('../models/guitarModel');

// USER FUNCTIONS

// Get approved guitars (for user dashboard)
async function getApprovedGuitars(req, res) {
    try {
        const guitars = await Guitar.getApproved();
        res.json(guitars);
    } catch (err) {
        console.log("Database error : " + err);
        res.status(500).send("Database error");
    }
}

// Get suggested guitars
async function getSuggestedGuitars(req,res) {
    try{
        const guitars = await Guitar.getSuggested();
        res.json(guitars);
    }catch(err) {
        console.log("Database error : "+err);
        res.status(500).send("Database error");
        
    }
}

// Add new guitar (user submits)
async function addGuitar(req, res) {
    try {
        const { name, brand, price, stock, condition, user_id } = req.body;

        if(!name || !brand || !price || !stock || !condition) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await Guitar.addNew({
            name,
            brand,
            price,
            stock,
            condition,
            status: "Pending",
            user_id
        });

        res.json({ message: "Guitar submitted for admin approval" });
    } catch (err) {
        console.log("Database error : " + err);
        res.status(500).send("Database error");
    }
}


// ADMIN FUNCTIONS

// Get all guitars (for admin)
async function getAllGuitars(req, res) {
    try {
        const guitars = await Guitar.getAll();
        res.json(guitars);
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
        
    }
}

// Get pending guitars (for admin approval)
async function getPendingGuitars(req, res) {
    try {
        const guitars = await Guitar.getPending();
        res.json(guitars);
    } catch(err) {
        console.log("Database error : " + err);
        res.status(500).send("Database error");
    }
}

// Approve guitar
async function approveGuitar(req, res) {
    try {
        const { id } = req.params;
        await Guitar.updateStatus(id, "approved");
        res.json({ message: "Guitar approved successfully" });
    } catch (err) {
        console.log("Database error : " + err);
        res.status(500).send("Database error");
    }
}

// Reject guitar
async function rejectGuitar(req, res) {
    try {
        const { id } = req.params;
        await Guitar.updateStatus(id, "rejected");
        res.json({ message: "Guitar rejected successfully" });
    } catch (err) {
        console.log("Database error : " + err);
        res.status(500).send("Database error");
    }
}

// Get rejected guitars (for checking in Postman)
async function getRejectedGuitars(req, res) {
    try {
        const guitars = await Guitar.getRejected();
        res.json(guitars);
    } catch(err) {
        console.log("Database error: " + err);
        res.status(500).send("Database error");
    }
}


module.exports = {
    getSuggestedGuitars,
    getAllGuitars,
    approveGuitar,
    rejectGuitar,
    getApprovedGuitars,
    addGuitar,
    getPendingGuitars,
    getRejectedGuitars
}