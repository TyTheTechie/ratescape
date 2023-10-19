import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import { signupValidation } from '../middleware/validation.mjs';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const router = express.Router();

// CORS setup for specific domain
const corsOptions = {
  origin: 'https://ratescape.tythetechie.dev',
  optionsSuccessStatus: 200
};

router.use(cors(corsOptions));

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many signup/login attempts from this IP, please try again after 10 minutes."
});

// Setup Nodemailer transport
let transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Signup route
router.post('/signup', limiter, async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    // Store the token in the database associated with the user (you can set an expiration if desired)

    // Send verification email
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Ratescape Email Verification',
        text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verify/${verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login route
router.post('/login', limiter, async (req, res) => {
  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is wrong');

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Email or password is wrong');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

// Email verification route
router.get('/verify/:token', async (req, res) => {
    // Find the user associated with the token
    // Mark the user as verified
    // Redirect the user to the login page or send a success response
});

export default router;
