import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.ts';
import { signupValidation } from '../middleware/validation.mjs';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

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

export default router;
