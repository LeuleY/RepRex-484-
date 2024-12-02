// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // NEW CODE: Import CORS middleware
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config({ path: './server/config.env' });

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


//tester
app.get('/api/DBTest2', async (req, res) => {
  try {
    const db = mongoose.connection;
    if (db.readyState === 1) {
      res.status(200).json({ message: '✅ Connected to MongoDB Atlas' });
    } else {
      res.status(500).json({ message: '❌ Not connected to MongoDB Atlas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking connection', error: error.message });
  }
});


// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));