// server/utils/sendEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter;

if (process.env.EMAIL_PROVIDER === 'brevo') {
  transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL, // must match verified sender
      pass: process.env.BREVO_API_KEY,
    },
  });
} else {
  // fallback to Gmail (optional)
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

const sendPasswordResetEmail = async (to, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: `"BITE Platform" <${process.env.SENDER_EMAIL}>`,
    to,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1e40af;">Reset Your Password</h2>
        <p>You requested to reset your password for your BITE Platform account.</p>
        <p>Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" 
             style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 12px; color: #666;">
          This link expires in 1 hour. If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Password reset email sent via Brevo to:', to);
};

module.exports = { sendPasswordResetEmail };