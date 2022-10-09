import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
  serviceChargePercent: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
});

const Tax = mongoose.model('tax', TaxSchema);

export default Tax;
