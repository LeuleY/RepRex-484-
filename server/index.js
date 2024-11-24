// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // NEW CODE: Import CORS middleware
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config({ path: './config.env' });

const MONGODB_URI = process.env.ATLAS_URI;

console.log('Environment Variable ATLAS_URI:', process.env.ATLAS_URI);


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

const app = express();
app.use(cors()); // NEW CODE: Enable CORS for all routes
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
