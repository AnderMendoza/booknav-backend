import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  location: {
    type: [String],
  },
});

const Doctor = mongoose.model("doctors", doctorSchema);

export default Doctor;
