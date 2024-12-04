const express = require('express');
const {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const router = express.Router();

// POST /api/workouts/:userId - Create a workout
router.post('/:userId', createWorkout);

// GET /api/workouts/:userId - Get all workouts for a user
router.get('/:userId', getWorkouts);

// PUT /api/workouts/:userId/:workoutId - Update a specific workout
router.put('/:userId/:workoutId', updateWorkout);

// DELETE /api/workouts/:userId/:workoutId - Delete a specific workout
router.delete('/:userId/:workoutId', deleteWorkout);

module.exports = router;
