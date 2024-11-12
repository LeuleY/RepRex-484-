import { useEffect, useState } from "react";
import ClickableCard from "./ClickableCard";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Navigate, useNavigate } from 'react-router-dom';
import '../ComponentCSS/Cards.css'

//!!!!!!!
//NOTE JS AND JSX FILES ARE BASICALLY THE SAME BUT IT'S RECOMMEND TO USE JSX FILES INSTEAD 

function CardList({ muscle = "chest" }) { // WHEN YOU CALL CARD LIST YOU MUST PASS A VALUE FOR MUSCLE CATEGORY 
    const apikey = "";  // BLANK ON PURPOSE 
    const navigate = useNavigate();
    // !!! NOTE DO NOT DO A GIT COMMIT WITH YOUR API, BECAUSE IF YOU DO YOU WILL LOSE IT 


    const url = "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle
    const [cardList, setCardList] = useState([]);
    const [descript, setDescript] = useState('');
    const [storeText, setStoreText] = useState("")

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
                    throw new Error('API response issues detected');
                }

                const data = await response.json();
                setCardList(data);


            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };

        getExerciseData();

    }, []);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,       // Adjust to display more cards in larger viewports
        slidesToScroll: 2,
        centerMode: false,
        variableWidth: false,
        adaptiveHeight: true,  // Ensures consistent height
        arrows: true,
    };


    const handleCardClick = (exercise) => {
        localStorage.setItem(`${exercise.name}`, JSON.stringify(exercise))
        navigate(`/details/${exercise.name}`)

    }
    return (  // Then we take the fetched api data and place them within the clickable card compoment then the card this placed within a slider 
        <div>
            <Slider {...sliderSettings}
            >
                {cardList.map((exercise) => (

                    <ClickableCard
                        title={exercise.name}
                        type={exercise.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        difficultly={exercise.difficulty}
                        muscle={exercise.muscle.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        description={exercise.instructions.slice(0, 100) + "--"}
                        onClick={() => handleCardClick(exercise)}
                    />

                ))}
            </Slider>
        </div>
    );
}

export default CardList;
