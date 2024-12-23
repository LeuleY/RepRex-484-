const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config({ path: './config.env' });

const MONGODB_URI = process.env.ATLAS_URI;

// Verify environment variables
if (!process.env.ATLAS_URI) {
  console.error('❌ Missing ATLAS_URI in environment variables');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in environment variables');
  process.exit(1);
}

console.log('Environment Variable ATLAS_URI:', process.env.ATLAS_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/posts', postRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unexpected error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // Log all registered routes
  app._router.stack.forEach((r) => {
    if (r.route) console.log(`Route registered: ${r.route.path}`);
  });
});
