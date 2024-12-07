import React, { useEffect, useState } from 'react';
import '../ComponentCSS/ExerciseInput.css';
import NavBar from './NavBar';
import axios from 'axios';

const ExerciseInput = () => {
    const [activeTab, setActiveTab] = useState('weightlifting');
    const [exerciseType, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [incline, setIncline] = useState('');
    const [message, setMessage] = useState('');

    const weightliftingExercises = [
        'Bench Press',
        'Squats',
        'Deadlifts',
        'Lat Pulldowns',
        'Shoulder Press',
        'Bicep Curls',
        'Tricep Extensions',
        'Leg Press'
    ];

    const cardioExercises = [
        'Running',
        'Walking',
        'Cycling',
        'Elliptical',
        'Stair Climber',
        'Swimming',
        'Rowing'
    ];

    const HandleWeightliftingSubmit = async (e) => {
        e.preventDefault();
        var uid = '';
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://reprex-484.onrender.com/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const user = response.data;
            uid = user._id;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        try {
            const response = await axios.post('https://reprex-484.onrender.com/api/workouts/createWeights', {
                workoutType: exerciseType,
                weight: weight,
                reps: reps,
                dateTime: Date.now(),
                userId: uid
            });
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with a status other than 2xx
                setMessage(error.response.data.message || 'Registration failed');
            } else if (error.request) {
                // Request was made but no response received
                setMessage('No response from server');
            } else {
                // Something else happened
                setMessage('An error occurred');
                }
        }
    };
    const HandleCardioSubmit = async (e) => {
        e.preventDefault();
        var uid = '';
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://reprex-484.onrender.com/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const user = await response.data;
            uid = user._id;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        try {
            const response = await axios.post('https://reprex-484.onrender.com/api/workouts/createCardio', {
                workoutType: exerciseType,
                distance: distance,
                duration: time,
                incline: incline,
                dateTime: Date.now(),
                userId: uid
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                setMessage(error.response.data.message || 'Registration failed');
            } else if (error.request) {
                // Request was made but no response received
                setMessage('No response from server');
            } else {
                // Something else happened
                setMessage('An error occurred');
            }
        }
    };

    return (
        <div>
        <NavBar />
        <div className="workout-container">
            <div className="workout-form">
            <h1>Log Your Workout</h1>

            <div className="tab-buttons">
                <button className={`tab-button ${activeTab === 'weightlifting' ? 'active' : ''}`} onClick={() => setActiveTab('weightlifting')}>
                Weightlifting
                </button>
                <button
                    className={`tab-button ${activeTab === 'cardio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cardio')}
                >
                Cardio
                </button>
            </div>

            <div className="tab-content">
            {/* Weightlifting Form */}
                {activeTab === 'weightlifting' && (
                <form onSubmit={HandleWeightliftingSubmit} className="workout-input-form">
                    <div className="form-group">
                        <label>Exercise Type</label>
                        <select value={exerciseType} onChange={(e) => setExercise(e.target.value)}required>
                            <option value="">Select Exercise</option>
                            {weightliftingExercises.map((exercise) => (
                            <option key={exercise} value={exercise}>{exercise}</option>
                            ))}
                        </select>
                    </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Weight (lbs)</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required min="0"
                    />
                    </div>

                    <div className="form-group">
                        <label>Reps</label>
                        <input
                            type="number"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Log Weightlifting Exercise
                </button>
                </form>
            )}

            {/* Cardio Form */}
            {activeTab === 'cardio' && (
                <form onSubmit={HandleCardioSubmit} className="workout-input-form">
                    <div className="form-group">
                        <label>Exercise Type</label>
                        <select
                            value={exerciseType}
                            onChange={(e) => setExercise(e.target.value)}
                            required
                        >
                            <option value="">Select Exercise</option>
                            {cardioExercises.map((exercise) => (
                            <option key={exercise} value={exercise}>{exercise}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Distance (miles)</label>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            required
                            min="0"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Time (minutes)</label>
                        <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        min="0"
                    />
                    </div>

                    <div className="form-group">
                        <label>Incline (%)</label>
                        <input
                            type="number"
                            value={incline}
                            onChange={(e) => setIncline(e.target.value)}
                            required
                            min="0"
                            max="15"
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Log Cardio Exercise
                </button>
            </form>
            )}
            </div>
        </div>
    </div>
</div>
  );
};

export default ExerciseInput;