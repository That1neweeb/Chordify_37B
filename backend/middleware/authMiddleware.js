import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {

        //taking the token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized" });
        }

        //token extract
        const token = authHeader.split(" ")[1];

        //verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attaching the user ino
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
