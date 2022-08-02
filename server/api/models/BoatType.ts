import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boatTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const BoatType = mongoose.model('boatType', boatTypeSchema);

export default BoatType;
