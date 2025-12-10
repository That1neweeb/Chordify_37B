const db = require('../db');

const Song = {
    getSongs: async () => {
        const query = "SELECT cover_image, title, artist FROM Songs"
        const response = await db.query(query);
        return response.rows;
    },
    
    getLyrics: async (id) => {
        const query = ("Select * from content WHERE id = $",[id]);
        const response = await db.query(query);
        return response.rows;
    }
}

module.exports = Song;
