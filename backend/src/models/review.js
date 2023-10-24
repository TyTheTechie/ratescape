import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    url: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Simple regex to validate URLs
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
