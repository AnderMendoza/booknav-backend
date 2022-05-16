import mongoose from "mongoose";
const Schema = mongoose.Schema;

const naavSchema = new Schema({
  type: {
    type: String,
    required: true,
    ref: "naavTypes",
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  priceGhatToGhat: {
    type: Number,
  },
  priceBankToBank: {
    type: Number,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Naav = mongoose.model("naav", naavSchema);

export default Naav;
