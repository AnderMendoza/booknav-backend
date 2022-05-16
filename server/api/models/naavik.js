import mongoose from "mongoose";
const Schema = mongoose.Schema;

const naavikSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  _naavId: {
    type: Schema.Types.ObjectId,
    ref: "naav",
    required: true,
  },
  _ghatId: {
    type: Schema.Types.ObjectId,
    ref: "ghat",
    required: true,
  },
});

const Naavik = mongoose.model("naavik", naavikSchema);

export default Naavik;
