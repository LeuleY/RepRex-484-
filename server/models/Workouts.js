const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    dateTime: Date,
    reps: Number,
    weight: Number,
    distance: Number,
    duration: Number,
    incline: Number,
    workoutType: String
}, {
    versionKey: false
});

const workout = mongoose.Model('Workout', workoutSchema);
module.exports = workout;