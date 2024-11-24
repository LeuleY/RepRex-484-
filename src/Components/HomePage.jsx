import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ComponentCSS/HomePageStyles.css';
import NavBar from './NavBar';
import Footer from './Footer';
import SearchBar from './SearchBar';


function HomePage() {
    const [username, setUsername] = useState('');
    const [currentPosition, setCurrentPosition] = useState(0);
    const navigate = useNavigate();

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5001/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // This handles the on click for the muscle group section 
    const handleMuscleClick = (muscle) => {
        navigate(`/cards/${muscle.name}`, { state: { muscle: muscle.name } });
    }; 

    const muscleGroups = [
        { name: 'Chest', image: '/homepageAssets/Chest.png', displayName:'Chest' },
        { name: 'Lats', image: '/homepageAssets/Back.png', displayName: 'Lats' },
        { name: 'quadriceps', image: '/homepageAssets/legs.png', displayName:'Quads'},
        { name: 'Shoulders', image:'/homepageAssets/shoulders.png', displayName:'Shoulders' },
        { name: 'Biceps', image: '/homepageAssets/Arms.png', displayName:'Biceps'},
        { name: 'Abdominals', image: '/homepageAssets/Abs.png', displayName:'Abs'  },
        { name: 'Calves', image: '/homepageAssets/Calf.png',displayName: 'Calves'}, 
        { name: 'lower_back', image: '/homepageAssets/LowerBack.png',displayName: 'Lower Back'}, 
        { name: 'Traps', image: '/homepageAssets/Traps.png',displayName: 'Traps'},
        { name: 'Triceps', image: '/homepageAssets/Triceps.png',displayName: 'Triceps'}, 
        { name: 'Glutes', image: '/homepageAssets/Glutes.png',displayName: 'Glutes'}

    ];

    const maxScroll = muscleGroups.length - 8;

    const scrollLeft = () => {
        if (currentPosition > 0) {
            setCurrentPosition(prev => prev - 1);
        }
    };

    const scrollRight = () => {
        if (currentPosition < maxScroll) {
            setCurrentPosition(prev => prev + 1);
        }
    };

    return (
        <div>
           

            <NavBar/>
            <SearchBar></SearchBar>
            {/* Muscle Group Section */}
            <section className="muscle-groups-wrapper">
                <button
                    className="scroll-button left"
                    onClick={scrollLeft}
                    style={{ opacity: currentPosition === 0 ? 0.5 : 1 }}
                >
                    &#10094;
                </button>

                <div className="muscle-groups-container">
                    <div
                        className="muscle-groups"
                        style={{
                            transform: `translateX(-${currentPosition * 140}px)`
                        }}
                    >
                       {muscleGroups.map((muscle, index) => (
                        <div key={index} className="muscle">
                            <div className="muscleIcons" onClick={() => handleMuscleClick(muscle)}>
                                <img src={muscle.image} alt={muscle.displayName} />
                                <p>{muscle.displayName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                <button
                    className="scroll-button right"
                    onClick={scrollRight}
                    style={{ opacity: currentPosition >= maxScroll ? 0.5 : 1 }}
                >
                    &#10095;
                </button>
            </section>

            {/* Quote Section */}
            <section className="quote">
                <p>Each day, I grow stronger, healthier, and closer to my goals.</p>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <div className="testimonial">
                    <img src="/homepageAssets/Before-After-1.png" alt="Before and After 1" />
                    <blockquote>"It was nice to have an easy way to gauge my progress"</blockquote>
                </div>
                <div className="testimonial">
                    <img src="/homepageAssets/Before-After-2.png" alt="Before and After 2" />
                    <blockquote>"My son showed me the app, and it has been the most instructive mental boost in my weight loss journey."</blockquote>
                </div>
            </section>

          
                <Footer></Footer>
         
        </div>
    );
}

export default HomePage;
