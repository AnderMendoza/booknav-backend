import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "doctors",
  },
  deadline: {
    type: Schema.Types.Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
