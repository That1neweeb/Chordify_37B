import bcrypt from 'bcrypt'
import { Users } from '../models/association.js';
import { passwordHash } from '../utils/hashPassword.js';
import { generateToken, generateTokenExpiry } from '../utils/generateTokens.js';
import { sendEmail } from '../utils/sendEmail.js';
import { generateAccessToken } from '../utils/jwt-util.js';





const FRONTEND_BASE_URL = "http://localhost:5173"; 
const BACKEND_BASE_URL = "http://localhost:5000"; 


export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, c_password } = req.body;

        //fields validation
        if (!full_name || full_name.trim() === "") return res.status(400).json({message:"Fullname is required"});
        
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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log(password);
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
    
        
        const verificationURL = `${BACKEND_BASE_URL}/auth/verify/${verification_token}`;

        //send email verification
        try{
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
        }
        catch(err){
            console.log(err);

        }
        

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
        console.log("Login request body:", req.body);

        const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

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

    // 🔹 Backward-compatible password check
    const storedPassword = user.password_hash || user.password; // fallback
    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
        
        // generate token
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return res.status(200).json({
            message: "Login successful",
            user: { id: user.id, full_name: user.full_name, email: user.email },
            accessToken: accessToken
        });
        
    } catch (err) {
        console.error("Login error:", err, err.stack);
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
            return res.status(200).json({ 
                message: "Email already verified! You can now login.",
                redirectTo: `${FRONTEND_BASE_URL}/login`
            });
        }

        if (new Date() > new Date(user.token_expires)) {
            return res.status(400).json({ message: "Verification link has expired" });
        }

        // Update user as verified
        await user.update({ is_verified: true, verification_token: null, token_expires: null });

        // Send JSON with redirect URL
        return res.redirect(`${FRONTEND_BASE_URL}/login?verified=true`);


    } catch (err) {
        console.error("Error in verify email controller:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Fetch full user from database
    const user = await Users.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" }); // ✅ FIXED
    }

    // password strength validation (same as register)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars, include uppercase, lowercase, number & special char"
      });
    }

    const hashedPassword = await passwordHash(newPassword);

    await user.update({ password_hash: hashedPassword });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// Get user profile
export const getProfile = async (req, res) => {
  try {
    console.log("🔍 DEBUG - req.user from middleware:", req.user);
    
    // Get user ID from middleware
    const userId = req.user.id;
    
    // Fetch FULL user from database
    const user = await Users.findByPk(userId);
    
    if (!user) {
      console.log("❌ User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("✅ User found in DB:", {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      profile_image: user.profile_image
    });
    
    // Build profile image URL
    let profileImageUrl = null;
    if (user.profile_image) {
        profileImageUrl = `http://localhost:5000/uploads/${user.profile_image}`;
        console.log("✅ Profile image URL:", profileImageUrl);
    }
    
    // Return user data (without .toJSON())
    const userData = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      profile_image: profileImageUrl,
      is_verified: user.is_verified,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };

    console.log("✅ Sending profile data:", userData);
    return res.status(200).json({ 
      user: userData
    });
    
  } catch (err) {
    console.error("❌ Error in getProfile:", err);
    console.error("❌ Error stack:", err.stack);
    return res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        console.log("📤 UPDATE PROFILE - Request received");
        
        const user = await Users.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { full_name, bio } = req.body;
        console.log("📤 Request body:", { full_name, bio });
        console.log("📤 File:", req.file);

        if (full_name) user.full_name = full_name;
        if (bio !== undefined) user.bio = bio;

        if (req.file) {
            user.profile_image = req.file.filename;
            console.log("📤 File saved as:", req.file.filename);
        }

        await user.save();
        console.log("📤 User saved successfully");

        let profileImageUrl = null;
        if (user.profile_image) {
            profileImageUrl = `http://localhost:5000/uploads/${user.profile_image}`;
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                bio: user.bio,
                profile_image: profileImageUrl
            }
        });
    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



// Send reset password email
export const sendResetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = generateToken();
    const resetExpiry = generateTokenExpiry(1); // 1 hour
    await user.update({ reset_token: resetToken, reset_token_expires: resetExpiry });

    const resetURL = `${FRONTEND_BASE_URL}/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      "Reset your password",
      `<p>Hello ${user.full_name}</p><p>Click <a href="${resetURL}">here</a> to reset password.</p>`
    );

    return res.status(200).json({ message: "Reset password link sent to email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Reset password from email
export const resetPasswordFromEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    console.log("[RESET PASSWORD] Token received:", token);
    console.log("[RESET PASSWORD] Body received:", req.body);

    // Step 1: Validate inputs
    if (!newPassword || !confirmPassword) {
      console.log("[RESET PASSWORD] Missing newPassword or confirmPassword");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      console.log("[RESET PASSWORD] Passwords do not match");
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Step 2: Find user by token
    let user;
    try {
      user = await Users.findOne({ where: { reset_token: token } });
    } catch (dbErr) {
      console.error("[RESET PASSWORD] DB error while finding user:", dbErr);
      return res.status(500).json({ message: "Database error" });
    }

    if (!user) {
      console.log("[RESET PASSWORD] No user found for token:", token);
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    // Step 3: Check token expiry
    if (!user.reset_token_expires) {
      console.log("[RESET PASSWORD] User has no reset_token_expires:", user.email);
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const tokenExpiryDate = new Date(user.reset_token_expires);
    if (isNaN(tokenExpiryDate.getTime())) {
      console.log("[RESET PASSWORD] Invalid reset_token_expires date:", user.reset_token_expires);
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    if (new Date() > tokenExpiryDate) {
      console.log("[RESET PASSWORD] Token expired for user:", user.email);
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    // Step 4: Hash the new password
    let hashedPassword;
    try {
      hashedPassword = await passwordHash(newPassword);
    } catch (hashErr) {
      console.error("[RESET PASSWORD] Error hashing password:", hashErr);
      return res.status(500).json({ message: "Password hashing error" });
    }

    // Step 5: Update user
    try {
      await user.update({
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      });
    } catch (updateErr) {
      console.error("[RESET PASSWORD] Error updating user:", updateErr);
      return res.status(500).json({ message: "Database update error" });
    }

    console.log("[RESET PASSWORD] Password reset successfully for:", user.email);
    return res.status(200).json({ message: "Password reset successfully" });

  } catch (err) {
    console.error("[RESET PASSWORD] Unexpected error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// Delete current user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    //  Delete user permanently from DB
    await Users.destroy({
      where: { id: userId },
    });

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

export const logout = (req, res) => {
    try {

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

