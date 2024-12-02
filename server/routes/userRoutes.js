// server/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Define the register route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);


// Sample route for users
router.get('/', (req, res) => {
    res.send('User routes are working');
  });

  
module.exports = router;



