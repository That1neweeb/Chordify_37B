const express = require('express');
const router = express.Router();

//controller 
const guitarController = require('../controllers/guitarController');

router.get("/suggested", guitarController.getSuggestedGuitars);
router.get("/buy", guitarController.getAllGuitars);

module.exports = router;