import express from 'express';
import Review from '../models/review.mjs';
import authenticate from '../middleware/auth.mjs';
import reviewSchema from '../models/reviewValidation.mjs';

const router = express.Router();

// Post a review
router.post('/', authenticate, async (req, res) => {
  const { error } = reviewSchema.safeParse(req.body);
  if (error) return res.status(400).send(error.message);

  const review = new Review({
    userId: req.user._id,
    product: req.body.product,
    rating: req.body.rating,
    text: req.body.text
  });

  try {
    const savedReview = await review.save();
    res.send(savedReview);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a specific review by ID
router.get('/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).send('Review not found');
    res.send(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a review (protected route)
router.put('/:reviewId', authenticate, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
    if (!updatedReview) return res.status(404).send('Review not found');
    res.send(updatedReview);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a review (protected route)
router.delete('/:reviewId', authenticate, async (req, res) => {
  try {
    const removedReview = await Review.findByIdAndRemove(req.params.reviewId);
    if (!removedReview) return res.status(404).send('Review not found');
    res.send(removedReview);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
