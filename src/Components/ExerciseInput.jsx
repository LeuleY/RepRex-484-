import React, { useState } from 'react';
import '../ComponentCSS/ExerciseInput.css';
import NavBar from './NavBar';
import axios from 'axios';

const ExerciseInput = () => {
    const [activeTab, setActiveTab] = useState('weightlifting');

  // Updated weightlifting state to remove sets
    const [weightliftingData, setWeightliftingData] = useState({
        exerciseType: '',
        weight: '',
        reps: ''
    });

    const [cardioData, setCardioData] = useState({
        exerciseType: '',
        distance: '',
        time: '',
        incline: ''
    });

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

    const handleWeightliftingSubmit = async (e) => {
        e.preventDefault();
        setWeightliftingData({
            exerciseType,
            weight,
            reps
        });
        try {
            const response = await axios.post('http://localhost:5001/api/workouts/createWeights', {
                workoutType: exerciseType,
                weight: weight,
                reps: reps,
                dateTime: Date.now()
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
    const handleCardioSubmit = async (e) => {
        e.preventDefault();
        setCardioData({
            exerciseType,
            distance,
            time,
            incline
        });
        try {
            const response = await axios.post('http://localhost:5001/api/workouts/createCardio', {
                workoutType: exerciseType,
                distance: distance,
                time: time,
                incline: incline,
                dateTime: Date.now()
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
                <form onSubmit={handleWeightliftingSubmit} className="workout-input-form">
                    <div className="form-group">
                        <label>Exercise Type</label>
                        <select value={weightliftingData.exerciseType} onChange={(e) => setWeightliftingData({...weightliftingData, exerciseType: e.target.value})}required>
                            <option value="">Select Exercise</option>
                            {weightliftingExercises.map((exercise) => (
                            <option key={exercise} value={exercise}>{exercise}</option>
                            ))}
                        </select>
                    </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Weight (lbs)</label>
                        <input type="number" value={weightliftingData.weight} onChange={(e) => setWeightliftingData({...weightliftingData, weight: e.target.value})} required min="0"
                    />
                    </div>

                    <div className="form-group">
                        <label>Reps</label>
                        <input
                            type="number"
                            value={weightliftingData.reps}
                            onChange={(e) => setWeightliftingData({...weightliftingData, reps: e.target.value})}
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
                <form onSubmit={handleCardioSubmit} className="workout-input-form">
                    <div className="form-group">
                        <label>Exercise Type</label>
                        <select
                            value={cardioData.exerciseType}
                            onChange={(e) => setCardioData({...cardioData, exerciseType: e.target.value})}
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
                            value={cardioData.distance}
                            onChange={(e) => setCardioData({...cardioData, distance: e.target.value})}
                            required
                            min="0"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Time (minutes)</label>
                        <input
                        type="number"
                        value={cardioData.time}
                        onChange={(e) => setCardioData({...cardioData, time: e.target.value})}
                        required
                        min="0"
                    />
                    </div>

                    <div className="form-group">
                        <label>Incline (%)</label>
                        <input
                            type="number"
                            value={cardioData.incline}
                            onChange={(e) => setCardioData({...cardioData, incline: e.target.value})}
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