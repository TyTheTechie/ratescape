import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.mjs';
import reviewRoutes from './routes/reviews.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ratescape', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
