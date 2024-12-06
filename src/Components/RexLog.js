import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import Plot from "react-plotly.js";
import '../ComponentCSS/Rexlog.css'

// Exercise options and their fields
const exerciseOptions = [
  { type: 'Bicep Curls', fields: ['weight', 'reps'] },
  { type: 'Running', fields: ['distance', 'speed', 'intensity'] },
  { type: 'Squats', fields: ['weight', 'reps'] },
  { type: 'Cycling', fields: ['distance', 'speed', 'intensity'] },
];


const settings = {displayModeBar:false, 
                  staticPlot:true};

const sizing = [450, 300];
const RexLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(exerciseOptions[0]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage

//0 = bicepCurls, 1 = squats, 2 = running, 3 = cycling
var hasWorkoutType = [[false, false, false], [false, false, false], [false, false, false, false], [false, false, false, false]];

//Will contain an x and a y component as JSON data
//First outer index is the weight, second is the reps
var bicepCurlVals = [[],[]];
var squatsVals = [[],[]];
var workoutType = "";
//First outer index is the distance, second is the speed, third is the intensity
var runningVals = [[],[],[]];
var cyclingVals = [[],[],[]];

var bicepCurlAnnot = [];
var squatsAnnot = [];
var runningAnnot = [];
var cyclingAnnot = [];

var bicepCurlPlot = [];
var squatsPlot = [];
var runningPlot = [];
var cyclingPlot = [];

  function workoutFieldEmpty(field){
    return field !== "-" && field !== null;
  }

  function createPlotFromArray(array, plotType){
    var plot = {
      x:[],
      y:[],
      type:plotType
    };
    for(let i = 0; i < array.length; i++){
      plot.x.push(array[i].x);
      plot.y.push(array[i].y);
    }
    return plot;
  }

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
  function setPlots(){
    var fullWorkoutList = JSON.parse(JSON.stringify(workouts));
    for(let i = 0; i < fullWorkoutList.length; i++){
      var workType = 0;
      for(let j = 0; j < exerciseOptions.length; j++){
        if(exerciseOptions[j].type === fullWorkoutList[i].exercise){
          workType = j;
          break;
        }
      }
      if(workoutFieldEmpty(fullWorkoutList[i].date)){
        switch(workType){
          case 0:
            hasWorkoutType[0][0] = true;
            if(workoutFieldEmpty(fullWorkoutList[i].weight)){
              hasWorkoutType[0][1] = true;
              bicepCurlVals[0].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].weight});

            }
            if(workoutFieldEmpty(fullWorkoutList[i].reps)){
              hasWorkoutType[0][2] = true;
              bicepCurlVals[1].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].reps});
            }
            break;
          case 2:
            hasWorkoutType[1][0] = true;
            if(workoutFieldEmpty(fullWorkoutList[i].weight)){
              hasWorkoutType[1][1] = true;
              squatsVals[0].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].weight});
            }
            if(workoutFieldEmpty(fullWorkoutList[i].reps)){
              hasWorkoutType[1][2] = true;
              squatsVals[1].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].reps});
            }
            break;
          case 1:
            hasWorkoutType[2][0] = true;
            if(workoutFieldEmpty(fullWorkoutList[i].distance)){
              hasWorkoutType[2][1] = true;
              runningVals[0].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].distance});
            }
            if(workoutFieldEmpty(fullWorkoutList[i].speed)){
              hasWorkoutType[2][2] = true;
              runningVals[1].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].speed});
            }
            if(workoutFieldEmpty(fullWorkoutList[i].intensity)){
              hasWorkoutType[2][3] = true;
              runningVals[2].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].intensity});
            }
            break;
          case 3:
            hasWorkoutType[3][0] = true;
            if(workoutFieldEmpty(fullWorkoutList[i].distance)){
              hasWorkoutType[3][1] = true;
              cyclingVals[0].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].distance});
            }
            if(workoutFieldEmpty(fullWorkoutList[i].speed)){
              hasWorkoutType[3][2] = true;
              cyclingVals[1].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].speed});
            }
            if(workoutFieldEmpty(fullWorkoutList[i].intensity)){
              hasWorkoutType[3][3] = true;
              cyclingVals[2].push({x:fullWorkoutList[i].date, y:fullWorkoutList[i].intensity});
            }
            break;
          default:
            console.log("Workout type "+workType+" is not valid");
            break;
        }
      }
    }
    for(let i = 0; i < 2; i++){
      if(hasWorkoutType[0][i+1])
        bicepCurlVals[i].sort((a, b) => a.x-b.x);
      if(hasWorkoutType[1][i+1])
        squatsVals[i].sort((a, b) => a.x-b.x);
    }
    for(let i = 0; i < 3; i++){
      if(hasWorkoutType[2][i+1])
        runningVals[i].sort((a, b) => a.x-b.x);
      if(hasWorkoutType[2][i+1])
        cyclingVals[i].sort((a, b) => a.x-b.x);
    }
    if(hasWorkoutType[0][0]){
      if(hasWorkoutType[0][1]){
        bicepCurlPlot.push(createPlotFromArray(bicepCurlVals[0], "line"));
        bicepCurlAnnot.push({text:"Bicep Curl Weight"});
      }
      if(hasWorkoutType[0][2]){
        bicepCurlPlot.push(createPlotFromArray(bicepCurlVals[1], "line"));
        bicepCurlAnnot.push({text:"Bicep Curl Reps"});
      }
    }
    if(hasWorkoutType[1][0]){
      if(hasWorkoutType[1][1]){
        squatsPlot.push(createPlotFromArray(squatsVals[0], "line"));
        squatsAnnot.push({text:"Squat Weight"});
      }
      if(hasWorkoutType[1][2]){
        squatsPlot.push(createPlotFromArray(squatsVals[1], "line"));
        squatsAnnot.push({text:"Squat Reps"});
      }
    }
    if(hasWorkoutType[2][0]){
      if(hasWorkoutType[2][1]){
        runningPlot.push(createPlotFromArray(runningVals[0], "line"));
        runningAnnot.push({text:"Running Distance"});
      }
      if(hasWorkoutType[2][2]){
        runningPlot.push(createPlotFromArray(runningVals[1], "line"));
        runningAnnot.push({text:"Running Speed"});
      }
      if(hasWorkoutType[2][3]){
        runningPlot.push(createPlotFromArray(runningVals[2], "line"));
        runningAnnot.push({text:"Running Intensity"});
      }
    }
    if(hasWorkoutType[3][0]){
      if(hasWorkoutType[3][1]){
        cyclingPlot.push(createPlotFromArray(cyclingVals[0], "line"));
        cyclingAnnot.push({text:"Cycling Distance"});
      }
      if(hasWorkoutType[3][2]){
        cyclingPlot.push(createPlotFromArray(cyclingVals[1], "line"));
        cyclingAnnot.push({text:"Cycling Speed"});
      }
      if(hasWorkoutType[3][3]){
        cyclingPlot.push(createPlotFromArray(cyclingVals[2], "line"));
        cyclingAnnot.push({text:"Cycling Intensity"});
      }
    }
  }
  setPlots();
  return (

    
      <div>
        <NavBar></NavBar>
      
      <div className='"rexlog-container"' > 
        <h2>RepRex Log</h2>
        <p>Add your workout details below:</p>
    
        <div className="workout-form">
  <div className="input-row">
    <div className="form-group">
      <label>Exercise Type:</label>
      <select
        value={selectedExercise.type}
        onChange={(e) => {
          const selected = exerciseOptions.find(
            (option) => option.type === e.target.value
          );
          setSelectedExercise(selected);
          setFormData({});
        }}
      >
        {exerciseOptions.map((option) => (
          <option key={option.type} value={option.type}>
            {option.type}
          </option>
        ))}
      </select>
    </div>

    {selectedExercise.fields.map((field) => (
      <div className="form-group" key={field}>
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
  </div>

  <div className="button-container">
    <button onClick={handleAddWorkout}>Add Workout</button>
    {error && <p className="error-message">{error}</p>}
  </div>
</div>
    
        {loading && <p className="loading">Loading workouts...</p>}
    
        <h3>Your Workouts</h3>
        <div className="table-container">
          <table>
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
    
        <div className="plots-container">
          {selectedExercise.type === exerciseOptions[0].type && (
            <>
              {hasWorkoutType[0][1] && (
                <div className="plot-container">
                  <Plot
                    data={[bicepCurlPlot[0]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Bicep Curls Weight",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Weight" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[0][2] && (
                <div className="plot-container">
                  <Plot
                    data={[bicepCurlPlot[1]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Bicep Curls Reps",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Reps" }
                    }}
                  />
                </div>
              )}
            </>
          )}
    
          {selectedExercise.type === exerciseOptions[1].type && (
            <>
              {hasWorkoutType[2][1] && (
                <div className="plot-container">
                  <Plot
                    data={[runningPlot[0]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Running Distance",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Distance" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[2][2] && (
                <div className="plot-container">
                  <Plot
                    data={[runningPlot[1]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Running Speed",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Speed" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[2][3] && (
                <div className="plot-container">
                  <Plot
                    data={[runningPlot[2]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Running Intensity",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Intensity" }
                    }}
                  />
                </div>
              )}
            </>
          )}
    
          {selectedExercise.type === exerciseOptions[2].type && (
            <>
              {hasWorkoutType[1][1] && (
                <div className="plot-container">
                  <Plot
                    data={[squatsPlot[0]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Squats Weight",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Weight" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[1][2] && (
                <div className="plot-container">
                  <Plot
                    data={[squatsPlot[1]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Squats Reps",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Reps" }
                    }}
                  />
                </div>
              )}
            </>
          )}
    
          {selectedExercise.type === exerciseOptions[3].type && (
            <>
              {hasWorkoutType[3][1] && (
                <div className="plot-container">
                  <Plot
                    data={[cyclingPlot[0]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Cycling Distance",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Distance" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[3][2] && (
                <div className="plot-container">
                  <Plot
                    data={[cyclingPlot[1]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Cycling Speed",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Speed" }
                    }}
                  />
                </div>
              )}
              {hasWorkoutType[3][3] && (
                <div className="plot-container">
                  <Plot
                    data={[cyclingPlot[2]]}
                    config={settings}
                    layout={{
                      width: sizing[0],
                      height: sizing[1],
                      title: "Cycling Intensity",
                      xaxis: { text: "Time" },
                      yaxis: { title: "Intensity" }
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    );
};

export default RexLog;
