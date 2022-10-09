import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Tax = new Schema({
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

const ServiceCharge = mongoose.model('tax', Tax);

export default ServiceCharge;
