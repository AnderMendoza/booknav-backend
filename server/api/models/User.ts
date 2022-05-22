import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

userSchema.methods.validPassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

const User = mongoose.model('users', userSchema);

export default User;
