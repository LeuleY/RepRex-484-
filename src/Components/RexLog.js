import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

// Exercise options and their fields
const exerciseOptions = [
  { type: 'Bicep Curls', fields: ['weight', 'reps'] },
  { type: 'Running', fields: ['distance', 'speed', 'intensity'] },
  { type: 'Squats', fields: ['weight', 'reps'] },
  { type: 'Cycling', fields: ['distance', 'speed', 'intensity'] },
];

const RexLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(exerciseOptions[0]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage

  // Fetch workouts when the component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/workouts/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Normalize the workout data to ensure placeholders for missing fields
        const normalizedWorkouts = response.data.map((workout) => ({
          exercise: workout.exercise || '-',
          date: workout.date ? new Date(workout.date).toLocaleDateString() : '-',
          weight: workout.weight ?? '-', // Use nullish coalescing for undefined/null
          reps: workout.reps ?? '-',
          distance: workout.distance ?? '-',
          speed: workout.speed ?? '-',
          intensity: workout.intensity ?? '-',
        }));

        setWorkouts(normalizedWorkouts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err.response?.data || err.message);
        setError('Failed to fetch workouts.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchWorkouts();
    }
  }, [userId]);

  // Handle input changes for form fields
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handle adding a new workout
  const handleAddWorkout = async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    const workoutData = {
      exercise: selectedExercise.type,
      ...formData,
    };

    console.log('Sending workout data to backend:', workoutData); // Debug log

    try {
      const response = await axios.post(
        `http://localhost:5001/api/workouts/${userId}`,
        workoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Normalize the new workout data before adding it to the state
      const newWorkout = {
        exercise: response.data.workout.exercise || '-',
        date: response.data.workout.date
          ? new Date(response.data.workout.date).toLocaleDateString()
          : '-',
        weight: response.data.workout.weight ?? '-',
        reps: response.data.workout.reps ?? '-',
        distance: response.data.workout.distance ?? '-',
        speed: response.data.workout.speed ?? '-',
        intensity: response.data.workout.intensity ?? '-',
      };

      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      setFormData({}); // Reset the form
    } catch (err) {
      console.error('Error adding workout:', err.response?.data || err.message);
      setError('Failed to add workout.');
    }
  };

  return (
    <div>
      <NavBar />
      <h2>RepRex Log</h2>
      <p>Add your workout details below:</p>

      {/* Workout Form */}
      <div>
        <label>Exercise Type:</label>
        <select
          value={selectedExercise.type}
          onChange={(e) => {
            const selected = exerciseOptions.find(
              (option) => option.type === e.target.value
            );
            setSelectedExercise(selected);
            setFormData({}); // Reset form data on type change
          }}
        >
          {exerciseOptions.map((option) => (
            <option key={option.type} value={option.type}>
              {option.type}
            </option>
          ))}
        </select>

        {selectedExercise.fields.map((field) => (
          <div key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type="number"
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <button onClick={handleAddWorkout}>Add Workout</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading workouts...</p>}

      {/* Workout Log */}
      <h3>Your Workouts</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Date</th>
            <th>Weight (lbs)</th>
            <th>Reps</th>
            <th>Distance (miles)</th>
            <th>Speed (mph)</th>
            <th>Intensity</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.exercise}</td>
                <td>{workout.date}</td>
                <td>{workout.weight}</td>
                <td>{workout.reps}</td>
                <td>{workout.distance}</td>
                <td>{workout.speed}</td>
                <td>{workout.intensity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No workouts recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RexLog;
