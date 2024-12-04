// userRoutes.js

const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserByUsername } = require('../controllers/userController');
const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/', getUserByUsername); // Added route for querying user by username

module.exports = router;
