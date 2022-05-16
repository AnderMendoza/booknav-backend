import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ghatSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const Ghat = mongoose.model("ghat", ghatSchema);

export default Ghat;
