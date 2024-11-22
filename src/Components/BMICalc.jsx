import React, { useState } from "react";
import '../ComponentCSS/BMI.css';

function BMICalc() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [weightType, setWeightType] = useState("kg");
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState("");

    const handleBMISubmit = (event) => {
        event.preventDefault();

        // Validate inputs
        if (!height || !weight) {
            alert("Please enter both height and weight.");
            return;
        }

        // Convert height to meters
        const heightInMeters = height / 100;

        // Convert weight to kilograms if it is in pounds
        const weightInKg = weightType === "lbs" ? weight * 0.453592 : weight;

        // Calculate BMI
        const calculatedBmi = (weightInKg / (heightInMeters ** 2)).toFixed(2);

        // Determine BMI category
        let category = "";
        if (calculatedBmi < 18.5) category = "Underweight";
        else if (calculatedBmi < 24.9) category = "Normal weight";
        else if (calculatedBmi < 29.9) category = "Overweight";
        else category = "Obesity";

        // Update state
        setBmi(calculatedBmi);
        setBmiCategory(category);
    };

    return (
        <div className="container">
            <form action="" onSubmit={handleBMISubmit}>
                <label htmlFor="HeightInput">Height (cm)</label>
                <input
                    className="HeightInput"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />

                <hr />

                <label htmlFor="WeightInput">Weight</label>
                <input
                    className="WeightInput"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <div className="radioContainer">
                <input
                    type="radio"
                    name="weightType"
                    value="lbs"
                    id="lbs"
                    checked={weightType === "lbs"}
                    onChange={(e) => setWeightType(e.target.value)}
                />
                <label htmlFor="lbs">lbs</label>

                <input
                    type="radio"
                    name="weightType"
                    value="kg"
                    id="kg"
                    checked={weightType === "kg"}
                    onChange={(e) => setWeightType(e.target.value)}
                />
                <label htmlFor="kg">Kg</label>
                </div>

                <span id="bmiInfo">
                    {bmi && (
                        <p>
                            Your BMI is <strong>{bmi}</strong> ({bmiCategory}).
                        </p>
                    )}
                </span>

                <button type="submit">Submit</button>
            </form>

            <div className="infoSection">
                <p>
                    Disclaimer: The BMI is a general screening tool and may not accurately
                    reflect your health status. It does not account for factors like
                    muscle mass, bone density, or fat distribution. For a more
                    comprehensive assessment, consult a healthcare professional.
                </p>
            </div>
        </div>
    );
}

export default BMICalc;
