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
const ghatSchema = new Schema({
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

const Ghat = mongoose.model('ghat', ghatSchema);

export default Ghat;
