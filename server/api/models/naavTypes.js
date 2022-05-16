import mongoose from "mongoose";
const Schema = mongoose.Schema;

const naavTypesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  capacity: {
    type: Number,
  },
});

const NaavTypes = mongoose.model("naavTypes", naavTypesSchema);

export default NaavTypes;
