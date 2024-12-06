const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  console.log("📥 Incoming account register request: ", req.body); // Debug log

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create empty workouts array
    const workouts = [];

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email, workouts });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("📥 Incoming login request: ", req.body); // Debug log

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and userId
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id, // Include the userId in the response
    });
  } catch (error) {
    console.error("❌ Login error: ", error); // Debug log
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error retrieving user profile: ", error); // Debug log
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User by Username
const getUserByUsername = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username }).select('_id username email workouts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error finding user by username: ", error); // Debug log
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export all controller functions
module.exports = { registerUser, loginUser, getUserProfile, getUserByUsername };
