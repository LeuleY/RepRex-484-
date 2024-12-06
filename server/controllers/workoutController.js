// workoutController.js
const User = require('../models/User');
const Joi = require('joi'); // Validation library

// Utility functions to handle unit conversions
const convertToPreferredUnit = (workout, preferredUnit) => {
    if (preferredUnit === 'imperial') {
        return {
            ...workout,
            weight: workout.weight ? (workout.weight * 2.20462).toFixed(2) : null, // kg to lbs
            distance: workout.distance ? (workout.distance * 0.621371).toFixed(2) : null, // km to miles
            speed: workout.speed ? (workout.speed * 0.621371).toFixed(2) : null, // km/h to mph
        };
    } else if (preferredUnit === 'metric') {
        return {
            ...workout,
            weight: workout.weight ? (workout.weight / 2.20462).toFixed(2) : null, // lbs to kg
            distance: workout.distance ? (workout.distance / 0.621371).toFixed(2) : null, // miles to km
            speed: workout.speed ? (workout.speed / 0.621371).toFixed(2) : null, // mph to km/h
        };
    }
    return workout;
};

// Joi schema for workout validation
const workoutValidationSchema = Joi.object({
    exercise: Joi.string().required(),
    weight: Joi.number().optional().min(0),
    reps: Joi.number().optional().min(0),
    distance: Joi.number().optional().min(0),
    speed: Joi.number().optional().min(0),
    intensity: Joi.number().optional().min(0).max(10), // Intensity as a number between 0 and 10
});

// ** Create a Workout **
const createWorkout = async (req, res) => {
    console.log("📥 Incoming workout creation request:", req.body);

    try {
        const { userId } = req.params;
        const { exercise, weight, reps, distance, speed, intensity } = req.body;

        // Validate the input
        const { error } = workoutValidationSchema.validate(req.body);
        if (error) {
            console.error("❌ Validation error:", error.details);
            return res.status(400).json({ message: 'Invalid input', details: error.details });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            console.error("❌ User not found for ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Append the new workout to the user's workouts array
        const newWorkout = { exercise, weight, reps, distance, speed, intensity };
        user.workouts.push(newWorkout);

        // Save the updated user document
        await user.save();
        console.log("✅ Workout added successfully:", newWorkout);
        res.status(201).json({ message: 'Workout added successfully', workout: newWorkout });
    } catch (error) {
        console.error("❌ Error adding workout:", error.message);
        res.status(500).json({ message: 'Error adding workout', error: error.message });
    }
};

// ** Fetch All Workouts for a User **
const getWorkouts = async (req, res) => {
    console.log("📥 Fetching workouts for user ID:", req.params.userId);

    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            console.error("❌ User not found for ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert workouts to the user's preferred units before sending response
        const workoutsInPreferredUnit = user.workouts.map((workout) => ({
            exercise: workout.exercise || '-',
            date: workout.date || '-',
            weight: workout.weight ?? '-',
            reps: workout.reps ?? '-',
            distance: workout.distance ?? '-',
            speed: workout.speed ?? '-',
            intensity: workout.intensity ?? '-',
        }));

        console.log("✅ Retrieved workouts for user:", workoutsInPreferredUnit);
        res.status(200).json(workoutsInPreferredUnit);
    } catch (error) {
        console.error("❌ Error fetching workouts:", error.message);
        res.status(500).json({ message: 'Error fetching workouts', error: error.message });
    }
};

// ** Update a Workout **
const updateWorkout = async (req, res) => {
    console.log("📥 Incoming workout update request:", req.body);

    try {
        const { workoutId, userId } = req.params;
        const updates = req.body;

        const { error } = workoutValidationSchema.validate(updates);
        if (error) {
            console.error("❌ Validation error:", error.details);
            return res.status(400).json({ message: 'Invalid input', details: error.details });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error("❌ User not found for ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const workout = user.workouts.id(workoutId);
        if (!workout) {
            console.error("❌ Workout not found for ID:", workoutId);
            return res.status(404).json({ message: 'Workout not found' });
        }

        Object.assign(workout, updates);

        await user.save();
        console.log("✅ Workout updated successfully:", workout);
        res.status(200).json({ message: 'Workout updated successfully', workout });
    } catch (error) {
        console.error("❌ Error updating workout:", error.message);
        res.status(500).json({ message: 'Error updating workout', error: error.message });
    }
};

// ** Delete a Workout **
const deleteWorkout = async (req, res) => {
    console.log("📥 Incoming workout deletion request:", req.params);

    try {
        const { workoutId, userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            console.error("❌ User not found for ID:", userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const workout = user.workouts.id(workoutId);
        if (!workout) {
            console.error("❌ Workout not found for ID:", workoutId);
            return res.status(404).json({ message: 'Workout not found' });
        }

        workout.remove();

        await user.save();
        console.log("✅ Workout deleted successfully for user:", userId);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error("❌ Error deleting workout:", error.message);
        res.status(500).json({ message: 'Error deleting workout', error: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
};
