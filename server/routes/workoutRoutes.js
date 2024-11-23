// server/routes/workoutRoutes.js
const express = require('express');
const { newWorkoutWeights, newWorkoutCardio, deleteWorkout, getWorkouts} = require('../controllers/workoutController');
const router = express.Router();

router.post('/createWeights', newWorkoutWeights);
router.post('/createCardio', newWorkoutCardio);
router.post('/deleteWorkout', deleteWorkout);
router.post('/getWorkouts', getWorkouts);

module.exports = router;