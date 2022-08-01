import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});
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
  location: LocationSchema,
});

const Token = mongoose.model('ghat', Ghat);

export default Token;
