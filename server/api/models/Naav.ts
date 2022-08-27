import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 999999,
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Naav = mongoose.model('naav', naavSchema);

export default Naav;
