const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passwordHash = require('../utils/hashPassword');
const { generateToken, generateTokenExpiry } = require('../utils/generateTokens');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

async function registerUser(req, res) {
    try {
        const { full_name, email, password, c_password } = req.body;

        if (!full_name || !email || !password || !c_password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== c_password) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const password_hash = await passwordHash(password);

        const verification_token = generateToken();
        const token_expires = generateTokenExpiry();

        const newUser = await User.createUser(
            full_name,
            email,
            password_hash,
            verification_token,
            token_expires
        );

        const verificationURL = `${FRONTEND_BASE_URL}/verify/${verification_token}`;

        // SEND EMAIL FIRST
        await sendEmail(
            newUser.email,
            "Verify your Chordify account",
            `
            <p>Hello ${newUser.full_name},</p>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationURL}">${verificationURL}</a>
            <p>This link expires in 24 hours.</p>
            `
        );

        // SEND RESPONSE AFTER EMAIL IS SENT
        return res.status(201).json({
            message: "User registered successfully. Please check your email to verify your account.",
            user: { id: newUser.id, full_name: newUser.full_name, email: newUser.email }
        });

    } catch (err) {
        console.log("Error in registration controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.is_verified) {
            return res.status(401).json({ message: "Please verify your account before login" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (err) {
        console.log("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

async function verifyUser(req, res) {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ message: "Invalid verification link" });
        }

        const user = await User.findByVerificationToken(token);
        if (!user) {
            return res.status(404).json({ message: "User not found or token expired" });
        }

        if (user.is_verified) {
            return res.status(200).json({ 
                message: "Email already verified! You can now login." 
            });
        }

        if (new Date() > new Date(user.token_expires)) {
            return res.status(400).json({ message: "Verification link has expired" });
        }

        await User.verifyUser(user.id);

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        console.log("Error in verify email controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { registerUser, login, verifyUser };
