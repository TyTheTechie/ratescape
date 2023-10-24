import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Review from '../models/review.js'; // Import the Review model
import authenticate from '../middleware/auth.js';
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

// Fetching User Reviews
router.get('/myreviews', authenticate, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Editing a Review
router.put('/myreviews/:id', authenticate, async (req, res) => {
    const { productName, rating, reviewText, productUrl } = req.body;
    const reviewFields = { productName, rating, reviewText, productUrl };

    try {
        let review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ msg: 'Review not found' });
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        review = await Review.findByIdAndUpdate(req.params.id, { $set: reviewFields }, { new: true });
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Deleting a Review
router.delete('/myreviews/:id', authenticate, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ msg: 'Review not found' });
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Review.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
