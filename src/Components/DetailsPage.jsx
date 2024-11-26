import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import dumbbell from '../DetailPageAssets/dumbbell2.png';
import biceps from '../DetailPageAssets/biceps_icon.png';
import '../ComponentCSS/DetailsPage.css'
import VideoList from '../Components/VideoList';
import struggle from '../DetailPageAssets/struggle_icon.png';
import NavBar from "./NavBar";
import Footer from "./Footer";



function DetailsPage() {
    const exerciseName = useParams();

    const [exerciseData, setExerciseData] = useState([]);
    let muscleIconSRC = "";

    useEffect(() => {
        const storedData = localStorage.getItem(`${exerciseName.exercise}`);
        if (storedData) {
            setExerciseData(JSON.parse(storedData));
            localStorage.removeItem(`${exerciseName.exercise}`);
        }
    }, [exerciseName.exercise]);

    // Show loading while data isn't ready
    if (!exerciseData) return <div>Loading...</div>;

    return (
        <div>
    
            <NavBar></NavBar>
          
          


            <main>
                <div className="mainInfo">
                    <h1 className="exerciseName">{exerciseData.name}</h1>
                    <h3 className="equipment">
                        <img className="dumbell" src={dumbbell} alt="dumbbell2" />
                        Equipment: {exerciseData?.equipment?.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
                    </h3>
                    <h3 className="muscleTargeted">
                        <img className="dumbell" src={biceps} alt="muscle" />
                        Muscle Targeted: {exerciseData?.muscle?.split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}

                    </h3>

                <h5 className="difficulty">
                <img className="dumbell" src='/homepageAssets/difficulty.png' alt="scale" /> 
                        Difficulty: {exerciseData?.difficulty?.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}


                </h5>

                    <div className="instruction-section">
                        <h3>Instructions:</h3>
                        <p>{exerciseData.instructions}</p>
                    </div>
                </div>

                <div className="video-section">
                    <h1>Watch Videos Examples</h1>
                    <VideoList searchedVideo={exerciseData?.name} ></VideoList>
                </div>
            </main>

            
               <Footer></Footer>
        


        </div>
    )





}

export default DetailsPage