import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: String,
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;
