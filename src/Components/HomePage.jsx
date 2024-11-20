import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ComponentCSS/HomePageStyles.css';
import NavBar from './NavBar';


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

    const muscleGroups = [
        { name: 'Chest', image: '/homepageAssets/Chest.png' },
        { name: 'Back', image: '/homepageAssets/Back.png' },
        { name: 'Legs', image: '/homepageAssets/legs.png' },
        { name: 'Shoulders', image:'/homepageAssets/shoulders.png' },
        { name: 'Arms', image: '/homepageAssets/Arms.png' },
        { name: 'Abs', image: '/homepageAssets/Abs.png' },
        { name: 'Cardio', image: '/homepageAssets/Cardio.png' }
    ];

    const maxScroll = muscleGroups.length - 4;

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
            {/* Header Section */}
           

            <NavBar/>

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
                                <Link to={`/${muscle.name}`}>
                                    <img src={muscle.image} alt={muscle.name} />
                                    <p>{muscle.name}</p>
                                </Link>
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

            {/* Footer Section */}
            <footer>
                <div className="footer-content">
                    <div className="quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="#">Exercise Lab</Link></li>
                            <li><Link to="#">Cardio</Link></li>
                            <li><Link to="#">Weight Loss</Link></li>
                            <li><Link to="/Calculator">1RM Calculator</Link></li>
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
                    <p>All muscle group and transformation images were created using DALL-E 3 by OpenAI. For more information about DALL-E, visit <a href="https://openai.com/dall-e-3">OpenAI's DALL-E 3 page</a>.</p>
                    <p>User icon image in the upper right corner was created by Smashicons and downloaded from FLATICON. <a href="https://www.flaticon.com/free-icons/pac-man">Pac man icons created by Smashicons - Flaticon</a></p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
