import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Generate JWT Access token after user login 
const generateAccessToken = (payload) => {

    const options = {
      expiresIn: process.env.expiresIn, // Token expiration time
    };
    return jwt.sign(payload, process.env.secretkey, options);
  };

//  Middleware to verify JWT and return user info
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("error token missing");
    return res.status(401).json({ message: "Access token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.secretkey);

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

  export {
    generateAccessToken,
  }