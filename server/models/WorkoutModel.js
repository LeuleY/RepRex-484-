// workoutModel.js

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true
    },
    exerciseType: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: false
    },
    weights: {
        type: Number,
        required: false
    },
    distance: {
        type: Number,
        required: false
    },
    time: {
        type: Number,
        required: false
    },
    intensity: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
