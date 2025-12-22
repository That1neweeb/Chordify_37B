const Song = require('../models/songModel');

async function getRecommendedSongs(req,res) {
    try {
        const songs = await Song.getSongs();
        res.json(songs);
        
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
    }
}

async function getSongContent(req, res) {
    try {
        const id = req.params.id;
        const song = await Song.getSongContentById(id);
        res.json(song);
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
    }
}

module.exports = {
    getRecommendedSongs,
    getSongContent
}
