const bcrypt = require('bcrypt');

async function passwordHash(password) {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return hashed_password
}

module.exports = passwordHash;