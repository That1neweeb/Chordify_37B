const db = require('../db');

const Guitar = {

    // Existing (used by user dashboard)
    getSuggested: async () => {
        const query = `
            SELECT *
            FROM guitars
            WHERE status = 'approved'
            ORDER BY RANDOM()
            LIMIT 6
        `;
        const result = await db.query(query);
        return result.rows;
    },

    // Existing (admin or general)
    getAll: async () => {
        const query = `SELECT * FROM guitars`;
        const result = await db.query(query);
        return result.rows;
    },

    // User dashboard (approved only)
    getApproved: async () => {
        const query = `
            SELECT *
            FROM guitars
            WHERE status = 'approved'
        `;
        const result = await db.query(query);
        return result.rows;
    },

     // Admin approve/reject
    updateStatus: async (id, status) => {
        const query = `
            UPDATE guitars
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        const result = await db.query(query, [status, id]);
        return result.rows[0];
    },


     // Admin: fetch pending guitars
    getPending: async () => {
        const query = `
            SELECT *
            FROM guitars
            WHERE status = 'pending'
            ORDER BY id DESC
        `;
        const result = await db.query(query);
        return result.rows;
    },

    //  User submits a new guitar
    addNew: async ({ name, brand, price, stock, condition, status, user_id }) => {
        const query = `
            INSERT INTO guitars (name, brand, price, stock, condition, status, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const result = await db.query(query, [name, brand, price, stock, condition, status, user_id]);
        return result.rows[0]; 
    },

    // Fetch rejected guitars
    getRejected: async () => {
        const query = `
            SELECT *
            FROM guitars
            WHERE status = 'rejected'
            ORDER BY id DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }
    
};

module.exports = Guitar;