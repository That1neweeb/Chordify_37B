import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

// Send email on support form submission
router.post("/", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Full Name, Email, and Message are required" });
  }

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // your Gmail address in .env
        pass: process.env.EMAIL_PASS    // App password from Gmail
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
