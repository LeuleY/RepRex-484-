const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts: {
    type: Array,
    required: true,
    default: [],
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;