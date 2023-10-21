import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import authenticate from '../middleware/auth.mjs';
import sendEmail from '../utils/emailUtil.mjs';
import { signupValidation } from '../middleware/validation.mjs'; // Importing Zod validation

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.message);
  // Check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();

    // After saving the user, send a verification email
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    const verificationLink = `http://yourfrontenddomain.com/verify-email?token=${token}`;
    const emailContent = `
      <h3>Verify Your Email</h3>
      <p>Please click on the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;

    await sendEmail(savedUser.email, 'Verify Your Email for RateScape', emailContent);

    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Email verification route
router.get('/verify-email', async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send('Invalid verification link');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) return res.status(400).send('User not found');

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully');
  } catch (error) {
    res.status(400).send('Invalid verification link');
  }
});

// ... other user routes ...

export default router;
