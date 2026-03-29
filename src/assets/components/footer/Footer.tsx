import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo-section">
          <h2 className="footer-logo">PawFinder</h2>
          <p className="footer-tagline">Finding forever homes for our furry friends.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h3>Adoption</h3>
            <ul>
              <li><Link to="/adopt">Available Pets</Link></li>
              <li><Link to="/rehome-pet">Rehome You pet</Link></li>
              <li><Link to="/list-shelter-pet">Shelter Pet Listing</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/report-missing-pet">Report Missing Pet</Link></li>
              <li><Link to="/report-rescue-pet">Report Stray Animal</Link></li>
              <li><Link to="/health">Health & Wellness</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support Us</h3>
            <ul>
              <li><Link to="/donate">Make a Donation</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/partnerships">Corporate Partnerships</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>362/E Rescue Lane<br/>Bandaragama, PA 12530</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@pawfinder.com">info@pawfinder.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-middle">
        <div className="newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for updates on available pets and upcoming events.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="submit-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">© 2024 PawFinder. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/accessibility">Accessibility</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;