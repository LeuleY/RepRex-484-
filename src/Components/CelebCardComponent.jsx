import React, { useState } from 'react';
import '../ComponentCSS/CelebCardComponent.css';


function CelebrityWorkoutCard ({workoutData=""}) {
    const [isExpanded, setIsExpanded] = useState(false);

    

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