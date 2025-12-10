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

async function getSonglyrics(req, res) {
    try{
        const lyrics = await Song.getLyrics(req.param.id);
        res.json(lyrics);
    }    
    catch(err){
        console.log("Database error:" +err);
        res.status(500).send("Database error");
    }
}
module.exports = {
    getRecommendedSongs,
    getSonglyrics
}