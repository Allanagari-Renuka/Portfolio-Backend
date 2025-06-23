import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to receive contact form data
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure your email transport using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.status(200).json({ message: 'Message sent successfully!' });
  } 
  catch (error) {
    console.error('Nodemailer error:', error); 
    res.status(500).json({ message: 'Failed to send message.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});