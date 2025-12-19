const express = require('express');
const router = express.Router();

//controller
const songController = require('../controllers/songController')


router.get("/recommended", songController.getRecommendedSongs);
router.get("/songContent",songController.getSongContent);

module.exports = router;

