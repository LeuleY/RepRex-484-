import React from "react";
import { Link } from "react-router-dom";
import '../ComponentCSS/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="#">Exercise Lab</Link></li>
            <li><Link to="#">Cardio</Link></li>
            <li><Link to="#">Weight Loss</Link></li>
            <li><Link to="/1RCalculator">1RM Calculator</Link></li>
            <li><Link to="/BMICalculator">BMI Calculator</Link></li>
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
        <p>
          All muscle group and transformation images were created using DALL-E 3
          by OpenAI. For more information about DALL-E, visit{" "}
          <a href="https://openai.com/dall-e-3" target="_blank" rel="noopener noreferrer">
            OpenAI's DALL-E 3 page
          </a>.
        </p>
        <p>
          User icon image in the upper right corner was created by Smashicons and
          downloaded from FLATICON.{" "}
          <a href="https://www.flaticon.com/free-icons/pac-man" target="_blank" rel="noopener noreferrer">
            Pac man icons created by Smashicons - Flaticon
          </a>
        </p>
        <a href="https://www.vecteezy.com/free-photos/dwayne-johnson">Dwayne Johnson Stock photos by Vecteezy</a>
      </div>
    </footer>
  );
};

export default Footer;
