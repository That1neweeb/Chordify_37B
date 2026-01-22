import bcrypt from 'bcrypt'
import { Users } from '../models/userModel.js';
import { passwordHash } from '../utils/hashPassword.js';
import { generateToken, generateTokenExpiry } from '../utils/generateTokens.js';
import { sendEmail } from '../utils/sendEmail.js';
import { generateAccessToken } from '../utils/jwt-util.js';





const FRONTEND_BASE_URL = "http://localhost:5173";

export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, c_password } = req.body;

        //fields validation
        if (!fullname || fullname.trim() === "") return res.status(400).json({message:"Fullname is required"});
        
        if (!email || email.trim() === "") return res.status(400).json({message:"Email is required"});
       
        
        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        if (!password || password.trim() === "") return res.status(400).json({message:"Password is required"});
        if(!c_password || c_password.trim() === "") return res.status(400).json({message: "Confirm Password is required"});
    

        // password and confirm password matching validation
        if (password !== c_password) {
            return res.status(400).json({ message: "Password does not match" });
        }

        //password length and contains upper lower special character and number validation 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                message: "Password must be 8+ chars, include uppercase, lowercase, number & special char" 
            });
        }

        //check if user already exist
        const existingUser = await Users.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        //hashing password and generating verification token
        const password_hash = await passwordHash(password) ;
        const verification_token = generateToken();
        const token_expires = generateTokenExpiry();

        //creating user
        const newUser = await Users.create(
        {    
            full_name : full_name,
            email : email,
            password_hash : password_hash,
            verification_token : verification_token,
            token_expires : token_expires
        }
        );
    
        
        const verificationURL = `${FRONTEND_BASE_URL}/verify/${verification_token}`;

        //send email verification
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

        //send response after email is sent
        return res.status(201).json({
            message: "User registered successfully. Please check your email to verify your account.",
            user: { id: newUser.id, full_name: newUser.full_name, email: newUser.email }
        });

    } catch (err) {
        console.log("Error in registration controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.trim() ==="") {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password || !password.trim() ==="") {
            return res.status(400).json({ message: "Password is required" });
        }

        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await Users.findOne({ where: { email } });

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

        
        // generate token
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            message: "Login successful",
            user: { id: user.id, full_name: user.full_name, email: user.email },
            accessToken: accessToken
        });
        

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

// Verify user email
export const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ message: "Invalid verification link" });
        }

        const user = await Users.findOne({ where: { verification_token: token } });

        if (!user) {
            return res.status(404).json({ message: "User not found or token expired" });
        }

        if (user.is_verified) {
            return res.status(200).json({ message: "Email already verified! You can now login." });
        }

        if (new Date() > new Date(user.token_expires)) {
            return res.status(400).json({ message: "Verification link has expired" });
        }

        // Update user as verified
        await user.update({ is_verified: true, verification_token: null, token_expires: null });

        return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        console.error("Error in verify email controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
}
