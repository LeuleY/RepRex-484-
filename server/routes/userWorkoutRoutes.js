// server/routes/userWorkoutRoutes.js
const express = require('express');
const {
  createUserWorkout,
  getUserWorkouts,
  updateUserWorkout,
  deleteUserWorkout
} = require('../controllers/userWorkoutController');
const router = express.Router();

// Route to create a new workout for a user
router.post('/', createUserWorkout); // POST /api/userWorkouts/

// Route to fetch all workouts for a specific user
router.get('/:userId', getUserWorkouts); // GET /api/userWorkouts/:userId

// Route to update a specific workout by ID
router.put('/:workoutId', updateUserWorkout); // PUT /api/userWorkouts/:workoutId

// Route to delete a specific workout by ID
router.delete('/:workoutId/:userId', deleteUserWorkout); // DELETE /api/userWorkouts/:workoutId/:userId

module.exports = router;
