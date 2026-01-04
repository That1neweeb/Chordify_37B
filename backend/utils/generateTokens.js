import crypto from "crypto"

// const crypto = require('crypto');
import crypto from "crypto";
export function generateToken() {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}
export function generateTokenExpiry(hours = 24) {
    return new Date(Date.now() + hours * 60 * 60 * 1000); // default 24 hours
}


