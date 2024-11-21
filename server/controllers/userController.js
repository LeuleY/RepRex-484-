// userController.js
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

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  // Get token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID (excluding the password field)
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data (excluding password)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export all controller functions
module.exports = { registerUser, loginUser, getUserProfile };
