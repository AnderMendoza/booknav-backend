import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Ghat = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: {
      lat: String,
      lng: String,
    },
  },
});

const Token = mongoose.model('ghat', Ghat);

export default Token;
