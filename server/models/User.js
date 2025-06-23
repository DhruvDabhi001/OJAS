const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  otp: String,
  otpExpiry: Date,
  newPassword: String,
});

module.exports = mongoose.model('User', userSchema);