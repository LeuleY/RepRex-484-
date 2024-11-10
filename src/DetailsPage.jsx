import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function DetailsPage(){
    const exerciseName = useParams(); 
    const apikey = "OkNEOkKX82avKszpBT2cVw==FGO3R5R2b3opoedm";
    const url = "https://api.api-ninjas.com/v1/exercises?name=" + exerciseName.exercise
    const [exerciseData, setExerciseData] = useState([]);


    useEffect(() => {
        const getExerciseData = async () => { // This fetchs the api data using the above url and api varables 
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': apikey,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('API response issues detected:');
                }

                const data = await response.json();
                setExerciseData(data[0]); 

            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };

        getExerciseData();

    }, []);


    return(
        <div>
           
           <h1> {exerciseData.name}</h1>
            <h3>{exerciseData.equipment}</h3>
            <h3>muscle targeted: {exerciseData.muscle} </h3>
           
            <p>instructions: {exerciseData.instructions}</p>

            <div>
                <h1>watch videos of exercise</h1>
            </div>

        </div>
    )



    

}

export default DetailsPage