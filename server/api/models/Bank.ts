import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
});

const Bank = mongoose.model('bank', BankSchema);

export default Bank;
