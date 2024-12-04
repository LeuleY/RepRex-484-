// User.js
const mongoose = require('mongoose');

// Schema for individual workouts
const workoutSchema = new mongoose.Schema({
  exercise: { type: String, required: true }, // Type of exercise
  weight: { type: Number, required: false }, // Optional weight in lbs or kg
  reps: { type: Number, required: false },   // Optional reps
  distance: { type: Number, required: false }, // Optional distance in miles or km
  speed: { type: Number, required: false },  // Optional speed in mph or km/h
  intensity: { type: Number, required: false, min: 0, max: 10 }, // Optional intensity (0-10 scale)
  date: { type: Date, default: Date.now },   // Automatically set the workout date
});

// Schema for users
const userSchema = new mongoose.Schema(
  {
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
    workouts: [workoutSchema], // Array of workout subdocuments
    preferredUnit: {
      type: String,
      enum: ['imperial', 'metric'], // "imperial" for lbs/miles, "metric" for kg/km
      default: 'imperial', // Default unit system
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
