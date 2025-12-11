const Guitar = require('../models/guitarModel');

async function getSuggestedGuitars(req,res) {
    try{
        const guitars = await Guitar.getSuggested();
        res.json(guitars);
    }catch(err) {
        console.log("Database error : "+err);
        res.status(500).send("Database error");
        
    }
}

async function getAllGuitars(req, res) {
    try {
        const guitars = await Guitar.getAll();
        res.json(guitars);
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
        
    }
}

module.exports = {
    getSuggestedGuitars,
    getAllGuitars
}