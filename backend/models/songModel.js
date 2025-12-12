const db = require('../db');

const Song = {
    getSongs: async () => {
        const query = "SELECT cover_image, title, artist FROM Songs"
        const response = await db.query(query);
        return response.rows;
    },

    getSongContentById: async (id) => {
        const query = "SELECT * FROM Songs WHERE id = $1"
        const values = [id];
        const response = await db.query(query, values);
        return response.rows[0];
    }
}


module.exports = Song;
