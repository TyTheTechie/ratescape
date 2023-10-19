import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
}

});

export default mongoose.model('User', userSchema);
