// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config({ path: './config.env' });

const MONGODB_URI = process.env.ATLAS_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Define the routes here
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Export the app for serverless function
module.exports = app;
