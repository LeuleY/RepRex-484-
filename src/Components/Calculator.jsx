import React, { useState } from 'react';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import '../ComponentCSS/Calculator.css';
import Footer from './Footer';
import NavBar from './NavBar';
 import './HomePage';

function Calculator() {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [result, setResult] = useState(null);

    const calculateOneRepMax = (e) => {
        e.preventDefault();
        const oneRepMax = weight * (1 + 0.0333 * reps);
        setResult(Math.round(oneRepMax * 100) / 100); // Round to 2 decimal places
    };

    
    return (
        <div>
           
           <NavBar></NavBar>

            {/* Calculator Section */}
            <main className="calculator-container">
                <h2>One Rep Max Calculator</h2>
                <p className="calculator-description">
                    Calculate your one rep maximum using the Epley Formula: 
                    <br />
                    1RM = Weight × (1 + 0.0333 × Reps)
                </p>

                <form onSubmit={calculateOneRepMax} className="calculator-form">
                    <div className="input-group">
                        <label htmlFor="weight">Weight (lbs)</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                            min="0"
                            step="0.1"
                            placeholder="Enter weight"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="reps">Number of Repetitions</label>
                        <input
                            type="number"
                            id="reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            required
                            min="1"
                            step="1"
                            placeholder="Enter reps"
                        />
                    </div>

                    <button type="submit" className="calculate-button">
                        Calculate
                    </button>
                </form>

                {result !== null && (
                    <div className="result-container">
                        <h3>Your Estimated One Rep Max:</h3>
                        <p className="result">{result} lbs</p>
                        <div className="percentage-table">
                            <h4>Training Percentages:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Percentage</th>
                                        <th>Weight (lbs)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[95, 90, 85, 80, 75, 70, 65].map(percentage => (
                                        <tr key={percentage}>
                                            <td>{percentage}%</td>
                                            <td>{Math.round(result * (percentage / 100))}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer Section */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
}

export default Calculator;