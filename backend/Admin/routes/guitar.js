const express = require('express');
const router = express.Router();

const guitarController = require('../controllers/guitarController');

// USER
router.get('/approved', guitarController.getApprovedGuitars);
router.get('/suggested', guitarController.getSuggestedGuitars);
router.post('/',guitarController.addGuitar); //user submits new guitar

// ADMIN
router.get('/all', guitarController.getAllGuitars);

router.put('/approve/:id', guitarController.approveGuitar);
router.put('/reject/:id', guitarController.rejectGuitar);

router.get('/rejected', guitarController.getRejectedGuitars);
router.get('/pending', guitarController.getPendingGuitars); // fetch pending for admin


module.exports = router;
