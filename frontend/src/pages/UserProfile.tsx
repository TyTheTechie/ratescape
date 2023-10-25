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
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-bold mb-4 text-center">Your Reviews</h2>
                    {reviews.map((review) => (
                        <div key={review._id} className="mb-4 border-b pb-4">
                            <h3 className="text-xl font-semibold mb-2">{review.productName}</h3>
                            <p className="mb-2">Rating: {review.rating} stars</p>
                            <p className="mb-2">{review.reviewText}</p>
                            <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(review)}>Edit</button>
                        </div>
                    ))}
                    {editingReview && (
                        <div className="modal p-4 bg-gray-200 rounded">
                            <h3 className="text-xl font-semibold mb-4">Edit Review for {editingReview.productName}</h3>
                            <textarea
                                value={editedReviewText}
                                onChange={(e) => setEditedReviewText(e.target.value)}
                                className="w-full p-2 mb-4 border rounded"
                            ></textarea>
                            <select
                                value={editedRating}
                                onChange={(e) => setEditedRating(Number(e.target.value))}
                                className="w-full p-2 mb-4 border rounded"
                            >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSaveClick}>Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingReview(null)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
