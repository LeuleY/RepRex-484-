import React, { useState } from 'react';
import '../ComponentCSS/CelebCardComponent.css';
import theRock from '../DetailPageAssets/TheRockPicture.jpg';

const CelebrityWorkoutCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const workoutData = {
    name: "The Rock",
    workoutType: "Leg Day",
    image: theRock,
    description: "Dwayne 'The Rock' Johnson's intense leg day routine.",
    routine: [
        "Run on Treadmill – 30-50 minutes",
        "Eat Breakfast",
        "Barbell Walking Lunge – 4 sets, 25 reps",
        "Leg Press – 4 sets, 25 reps",
        "Leg Extensions – 3 sets, 20 reps",
        "Barbell Squat – 4 sets, 12 reps",
        "Hack Squat – 4 sets, 12 reps",
        "Single Leg Hack Squat – 4 sets, 12 reps",
        "Romanian Deadlift – 4 sets, 10 reps",
        "Seated Leg Curl – 3 sets, 20 reps",
        "Thigh Abductor – 4 sets, 12 reps"
    ]
    };

    return (
        <div className="celebrity-card">
            <div className="card-image-container">
                <img 
                    src={workoutData.image} 
                    alt={`${workoutData.name}'s workout`}
                    className="card-image"
                />
                <div className="image-overlay">
                    <h2 className="celebrity-name">{workoutData.name}</h2>
                    <p className="workout-type">{workoutData.workoutType}</p>
                </div>
            </div>

            <div className="card-content">
                <p className="workout-description">{workoutData.description}</p>
        
                <div className={`routine-container ${isExpanded ? 'expanded' : ''}`}>
                    <h3 className="routine-title">Workout Routine:</h3>
                    <ul className="routine-list">
                        {workoutData.routine.map((exercise, index) => (
                            <li key={index} className="routine-item"><span className="bullet">•</span>{exercise}</li>
                        ))}
                    </ul>
                </div>

        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-button"
        >
            {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
    </div>
    </div>
);
};

export default CelebrityWorkoutCard;