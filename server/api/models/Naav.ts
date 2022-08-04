import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const naavSchema = new Schema({
  boatTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'boatType',
    required: true,
  },
  ghatId: {
    type: Schema.Types.ObjectId,
    ref: 'ghat',
    required: true,
  },
  userId: {
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
