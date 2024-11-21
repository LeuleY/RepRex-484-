// server/routes/workoutRoutes.js
const express = require('express');
const { newWorkoutWeights, newWorkoutCardio, deleteWorkout} = require('../controllers/workoutController');
const router = express.Router();

router.post('/createWeights', newWorkoutWeights);
router.post('/createCardio', newWorkoutCardio);
router.post('/deleteWorkout', deleteWorkout);

module.exports = router;