import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Chordify" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent successfully!");

    } catch (err) {
        console.log("Error sending email:", err);
        throw err;
    }
}

