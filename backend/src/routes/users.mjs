import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import authenticate from '../middleware/auth.mjs';
import sendEmail from '../utils/emailUtil.mjs';

const router = express.Router();

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
