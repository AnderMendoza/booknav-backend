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
  picture: {
    type: String,
  },
});

const Naav = mongoose.model('naav', naavSchema);

export default Naav;
