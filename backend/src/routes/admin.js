import express from 'express';
import Review from '../models/review.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Get all reviews
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

// Delete a review
router.delete('/reviews/:reviewId', isAdmin, async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.reviewId);
        if (!review) return res.status(404).send('Review not found');
        res.send({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;
