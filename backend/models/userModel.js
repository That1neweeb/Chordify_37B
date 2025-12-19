const db = require('../db')

const User = {
   
    // to create user
    createUser : async(full_name, email, password_hash, verification_token, token_expires) => {
        
        try {
        const query = `INSERT INTO Users (full_name, email, password_hash, verification_token, token_expires) `
        + `VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const request = await db.query(query, [full_name, email, password_hash, verification_token, token_expires]);
        return request.rows[0];
        } catch(err) {
            console.log("Error creating user : "+err);
            throw err;
        }

    },

    //find by email
    // this method helps us for checking duplicate email in database
    findByEmail : async(email) => {
        try {
            const query = `SELECT * FROM Users WHERE email = $1`
            const response = await db.query(query, [email]);
            return response.rows[0];
        } catch(err) {
            console.log("Error finding email : " +err );
            throw err;
            
        }
    },

    //verify user
    verifyUser : async(id) => {
          try {
            const query = `UPDATE Users SET is_verified = true, verification_token = NULL, token_expires = NULL WHERE id = $1 RETURNING *`
            const response = await db.query(query, [id]);
            return response.rows[0];
        } catch(err) {
            console.log("Error finding email : " +err );
            throw err;
        }
    },

  updateVerificationToken: async (id, token, token_expires) => {
    const result = await db.query(
      `UPDATE Users SET verification_token = $1, token_expires = $2 WHERE id = $3 RETURNING *`,
      [token, token_expires, id]
    );
    return result.rows[0];
  },

  findByVerificationToken: async(token) => {
    try {
        const query = "SELECT * FROM Users WHERE verification_token = $1"
        const response = await db.query(query, [token]);
        return response.rows[0];
    } catch(err) {
        console.log("Error finding verification token: " + err);
        throw err;
    }
  }
}

module.exports = User;