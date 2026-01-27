import express from "express";
import { isAuthenticated } from '../middleware/authMiddleware.js';
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  // Check required fields
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Full Name, Email, and Message are required" });
  }

  // ✅ Validate email matches logged-in user
  if (email !== req.user.email) {
    return res.status(403).json({ error: "You can only send emails from your registered account" });
  }

  // ✅ Validate phone (optional)
  if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: "chordify21@gmail.com",
      subject: `New Chordify Support Message from ${fullName}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

export default router;
