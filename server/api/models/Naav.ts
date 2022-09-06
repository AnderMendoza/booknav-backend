import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  ghatToGhat: {
    type: Number,
    min: 0,
    max: 999999,
  },
  crossRiver: {
    type: Number,
    min: 0,
    max: 999999,
  },
  hourly: {
    type: Number,
    min: 0,
    max: 999999,
  },
});

const naavSchema = new Schema({
  boatType: {
    type: Schema.Types.ObjectId,
    ref: 'boatType',
    required: true,
  },
  ghat: {
    type: Schema.Types.ObjectId,
    ref: 'ghat',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  pictures: [
    {
      type: String,
    },
  ],
  price: PriceSchema,
  capacity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'review',
  },
});

const Naav = mongoose.model('naav', naavSchema);

export default Naav;
