import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Review = mongoose.model('review', ReviewSchema);

export default Review;
