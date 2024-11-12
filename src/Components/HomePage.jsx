import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/HomePageStyles.css';



function HomePage() {
    const [currentPosition, setCurrentPosition] = useState(0);
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
            <header>
                <div className="logo">
                    <img src="" alt="RepRex Logo" />
                    <h1>RepRex</h1>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="#">RexLog</Link>
                    <Link to="/Community">Community</Link>
                    <Link to="/About">About</Link>
                    <Link to="#"><img src="/homepageAssets/User.png" alt="User" /></Link>
                </nav>
            </header>

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
                                <Link to={'/${muscle.name'}>
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
                    <img src="/homepageAssets//Before-After-1.png" alt="Before and After 1" />
                    <blockquote>"It was nice to have an easy way to gauge my progress"</blockquote>
                </div>
                <div className="testimonial">
                    <img src='/homepageAssets/Before-After-2.png' alt="Before and After 2" />
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
                    <div className="quick-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="#">Exercise Lab</Link></li>
                            <li><Link to="#">Cardio</Link></li>
                            <li><Link to="#">Weight Loss</Link></li>
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
                    <p>All muscle group and transformation images were created using DALL-E 3 by OpenAI.
                        For more information about DALL-E, visit <a href="https://openai.com/dall-e-3">OpenAI's DALL-E 3 page</a>.
                    </p>
                    <p>User icon image in the upper right corner was created by Smashicons and downloaded from FLATICON.
                        <a href="https://www.flaticon.com/free-icons/pac-man">Pac man icons created by Smashicons - Flaticon</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;