import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  naav: {
    type: Schema.Types.ObjectId,
    ref: 'naav',
    required: true,
  },
  rideType: {
    type: String,
    enum: ['ghatToGhat', 'crossRiver'],
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'review',
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('booking', bookingSchema);

export default Booking;
