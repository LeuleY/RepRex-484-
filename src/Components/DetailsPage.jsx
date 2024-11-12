import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import dumbbell from '../DetailPageAssets/dumbbell2.png';
import biceps from '../DetailPageAssets/biceps_icon.png';
import '../ComponentCSS/DetailsPage.css'
import VideoList from '../Components/VideoList';
import struggle from '../DetailPageAssets/struggle_icon.png';



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
            <header>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">RexLog</a>
                    <a href="#">About</a>
                    <a href="#"><img src='/homepageAssets/User.png' /></a>
                </nav>
            </header>


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
                <img className="dumbell" src='/homepageAssets/User.png' alt="scale" /> 
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

            <footer>
                <div className="footer-content">
                    <div className="quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Exercise Lab</a></li>
                            <li><a href="#">Cardio</a></li>
                            <li><a href="#">Weight Loss</a></li>
                        </ul>
                    </div>
                    <div className="quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Exercise Lab</a></li>
                            <li><a href="#">Cardio</a></li>
                            <li><a href="#">Weight Loss</a></li>
                        </ul>
                    </div>
                    <div className="subscribe">
                        <h3>Rep Letter</h3>
                        <form>
                            <input type="email" placeholder="E-mail" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>

                <div className="attributions">
                    <h3>Image Credits</h3>
                    <p>All muscle group and transformation images were created using DALL-E 3 by OpenAI. For more information about DALL-E, visit <a href="https://openai.com/dall-e-3">OpenAI's DALL-E 3 page</a>.
                    </p>
                    <p>User icon image in the upper right corner was created by Smashicons and downloaded from FLATICON.
                        <a href="https://www.flaticon.com/free-icons/pac-man">Pac man icons created by Smashicons - Flaticon</a>
                    </p>
                </div>
            </footer>


        </div>
    )





}

export default DetailsPage