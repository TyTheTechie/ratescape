import express from 'express';
import Review from '../models/review.ts';

const router = express.Router();

// Post a review
router.post('/', async (req, res) => {
  // Handle posting a review...
});

// Get all reviews
router.get('/', async (req, res) => {
  // Handle fetching all reviews...
});

export default router;
