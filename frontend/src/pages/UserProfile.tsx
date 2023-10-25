import React, { useState, useEffect } from 'react';

type Review = {
    _id: string;
    productName: string;
    rating: number;
    reviewText: string;
};

const UserProfile: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [editedReviewText, setEditedReviewText] = useState('');
    const [editedRating, setEditedRating] = useState<number>(0);

    useEffect(() => {
        async function fetchUserReviews() {
            try {
                const response = await fetch('/api/users/myreviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching user reviews:', error);
            }
        }

        fetchUserReviews();
    }, []);

    const handleEditClick = (review: Review) => {
        setEditingReview(review);
        setEditedReviewText(review.reviewText);
        setEditedRating(review.rating);
    };

    const handleSaveClick = async () => {
        if (editingReview) {
            try {
                const updatedReview = {
                    ...editingReview,
                    reviewText: editedReviewText,
                    rating: editedRating,
                };
                await fetch(`/api/reviews/${editingReview._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedReview)
                });
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === editingReview._id ? updatedReview : review
                    )
                );
                setEditingReview(null);
            } catch (error) {
                console.error('Error updating review:', error);
            }
        }
    };

    return (
        <div>
            <h2>Your Reviews</h2>
            {reviews.map((review) => (
                <div key={review._id}>
                    <h3>{review.productName}</h3>
                    <p>Rating: {review.rating} stars</p>
                    <p>{review.reviewText}</p>
                    <button onClick={() => handleEditClick(review)}>Edit</button>
                </div>
            ))}
            {editingReview && (
                <div className="modal">
                    <h3>Edit Review for {editingReview.productName}</h3>
                    <textarea
                        value={editedReviewText}
                        onChange={(e) => setEditedReviewText(e.target.value)}
                    ></textarea>
                    <select
                        value={editedRating}
                        onChange={(e) => setEditedRating(Number(e.target.value))}
                    >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditingReview(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
