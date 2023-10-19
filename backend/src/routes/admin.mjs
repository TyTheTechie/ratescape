import express from 'express';
import Review from '../models/review.mjs';
import isAdmin from '../middleware/isAdmin.mjs';

const router = express.Router();

// Get all reviews (for admin)
router.get('/reviews', isAdmin, async (req, res) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Approve a review
router.put('/reviews/approve/:reviewId', isAdmin, async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { isApproved: true }, { new: true });
        if (!review) return res.status(404).send('Review not found');
        res.send(review);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Disapprove a review
router.put('/reviews/disapprove/:reviewId', isAdmin, async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { isApproved: false }, { new: true });
        if (!review) return res.status(404).send('Review not found');
        res.send(review);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;
