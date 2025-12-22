
const crypto = require('crypto');

function generateToken() {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}
function generateTokenExpiry(hours = 24) {
    return new Date(Date.now() + hours * 60 * 60 * 1000); // default 24 hours
}


module.exports = {
    generateToken,
    generateTokenExpiry
}