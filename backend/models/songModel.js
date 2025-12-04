const db = require('../db');

const Song = {
    getSongs: async () => {
        const query = "SELECT cover_image, title, artist FROM Songs"
        const response = await db.query(query);
        return response.rows;
    }
}

module.exports = Song;
