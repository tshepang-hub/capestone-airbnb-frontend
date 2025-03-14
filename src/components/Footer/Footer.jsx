import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      {/* Support section */}
      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li>Help Center</li>
          <li>Safety Information</li>
          <li>Cancellation Options</li>
          <li>Our COVID-19 Response</li>
          <li>Supporting People with Disabilities</li>
          <li>Report a Neighborhood Concern</li>
        </ul>
      </div>
      
      {/* Hosting section */}
      <div className="footer-section">
        <h3>Hosting</h3>
        <ul>
          <li>Try Hosting</li>
          <li>AirCover: Protection for Hosts</li>
          <li>Explore Hosting Resources</li>
          <li>Visit Our Community Forum</li>
          <li>How to Host Responsibly</li>
        </ul>
      </div>
      
      {/* About section */}
      <div className="footer-section">
        <h3>About</h3>
        <ul>
          <li>Newsroom</li>
          <li>Learn About New Features</li>
          <li>Letter from Our Founders</li>
          <li>Careers</li>
          <li>Investors</li>
          <li>Airbnb Luxe</li>
        </ul>
      </div>
      
      {/* Footer bottom */}
      <div className="footer-bottom">
        <div>&copy; 2025 Airbnb, Inc.</div>
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#sitemap">Sitemap</a>
        </div>
        <div className="footer-social">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
