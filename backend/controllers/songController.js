const Song = require('../models/songModel');

export const getRecommendedSongs = async (req,res) => {
    try {
        const songs = await Songs.findAll();
        res.status(200).json({data: songs, message:"Songs successfully fetched"})
    } catch(e) {
        res.status(500).send(e)
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
