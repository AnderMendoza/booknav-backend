import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Ghat = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
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
