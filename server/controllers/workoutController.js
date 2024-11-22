// workoutController.js
const Workout = require('../models/Workouts');
const User = require('../models/User');
require('../controllers/userController');
const axios = require('axios');
require('mongoose');

//Add new weights workout to user account
const newWorkoutWeights = async (req, res) => {
    const {reps, weight, workoutType, dateTime, userId} = req.body;

    console.log("📥 Incoming new workout request: ", req.body);
    try {
        const newWorkout = new Workout({reps: reps, weight: weight, workoutType: workoutType, dateTime: dateTime});
        await newWorkout.save();
        addWorkoutToUser(newWorkout._id, userId);
        res.status(201).json({ message: 'Workout created successfully: ', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
const newWorkoutCardio = async (req, res) => {
    const {distance, duration, incline, workoutType, dateTime, userId} = req.body;

    console.log("📥 Incoming new workout request: ", req.body);
    try {
        const newWorkout = new Workout({distance: distance, duration: duration, incline: incline, workoutType: workoutType, dateTime: dateTime});
        await newWorkout.save();
        addWorkoutToUser(newWorkout._id, userId);
        res.status(201).json({ message: 'Workout created successfully: ', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function addWorkoutToUser(workoutId, userId){
    var acc = await User.findById(userId);
    acc.workouts.push(workoutId);
    await acc.save();
}

const deleteWorkout = async (req, res) => {
    const {workoutId, userId} = req.body;
    console.log('📥 Incoming workout deletion request: ', req.body);
    try{
        const workoutToDelete = await Workout.findById(workoutId);
        var acc = await User.findById(userId);
        var spliced = acc.workouts;
        spliced.splice(acc.workouts.indexOf(workoutToDelete._id), 1);
        var updatedArr = {
            workouts: spliced
        }
        User.findByIdAndUpdate(acc._id, updatedArr);
        Workout.findByIdAndDelete(workoutId);
        res.status(200).json({ message: 'Workout deleted successfully: ', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {newWorkoutWeights, newWorkoutCardio, deleteWorkout};