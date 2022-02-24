import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 60 * 60 * 24 * 30 },
  },
});

tokenSchema.virtual("isExpired").get(function () {
  return Date.now() >= this.expires;
});

const Token = mongoose.model("tokens", tokenSchema);

export default Token;
