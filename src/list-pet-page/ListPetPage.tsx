import React from 'react';
import './ListPetPage.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
// Import icons
import { 
  FaHome, FaHeart, FaCheck, FaArrowRight, FaUpload, FaBuilding, 
  FaPeopleCarry, FaChartLine, FaFileAlt, FaShieldAlt, FaComments, 
  FaHandHoldingHeart, FaHeadset, FaPaw, FaHospital, FaUserCircle 
} from 'react-icons/fa';

const ListPetPage: React.FC = () => {
  const navigate = useNavigate();
  const user = UserService.getCurrentUser(); // Get the logged-in user
  const isShelterUser = user && user.userType === "shelter";
  const isNormalUser = user && user.userType === "user";

  return (
    <div className="list-pet-container">
      {/* Hero Section */}
      <section className="hero-section-list">
        <div className="hero-background">
          <div className="paw-prints">
            {/* Paw prints background elements if any */}
          </div>
        </div>

        <div className="hero-content-list">
          <h1 className="hero-title">Help a Pet Find Their Forever Home</h1>
          <p className="hero-description">
            Connect loving animals with caring families. Our platform makes it easy to list pets
            for adoption whether you're a shelter or an individual.
          </p>

          <div className="list-page-cta-container">
            <button 
              className={`list-page-cta-button list-page-shelter-button ${!isShelterUser ? "disabled-button" : ""}`}
              onClick={() => isShelterUser && navigate("/list-shelter-pet")}
              disabled={!isShelterUser}
            >
              <span className="list-page-cta-icon"><FaHospital /></span>
              Shelter Listing
            </button>

            <button 
              className={`list-page-cta-button list-page-rehome-button ${!isNormalUser ? "disabled-button" : ""}`} 
              onClick={() => navigate('/rehome-pet')}
              disabled={!isNormalUser}
            >
              <span className="list-page-cta-icon"><FaPaw /></span>
              Rehome My Pet
            </button>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-list"></div> {/* Hero Image */}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number" data-count="15000">15,000+</div>
          <div className="stat-label">Pets Adopted</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-count="500">500+</div>
          <div className="stat-label">Partner Shelters</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-count="95">95%</div>
          <div className="stat-label">Success Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-count="7">7 Days</div>
          <div className="stat-label">Average Time to Adoption</div>
        </div>
      </section>

      {/* Split Section for Types of Listings */}
      <section className="listing-types">
        <div className="section-header">
          <h2>How would you like to help?</h2>
          <p>Choose the option that best describes your situation</p>
        </div>

        <div className="listing-options">
          <div className="listing-type shelter">
            <div className="listing-card">
              <div className="listing-icon">
                <div className="icon-circle">
                  <div className="icon-inner"><FaHome /></div>
                </div>
              </div>
              <h2>Shelter Pet Listings</h2>
              <p>
                For animal shelters, rescues, and organizations dedicated to finding
                homes for animals in their care. Create profiles for multiple pets and
                manage them through a comprehensive dashboard.
              </p>
              <ul className="features-list">
                <li><span className="check-icon"><FaCheck /></span> <FaUpload className="feature-icon" /> Multiple pet uploads</li>
                <li><span className="check-icon"><FaCheck /></span> <FaBuilding className="feature-icon" /> Shelter/Organization profile</li>
                <li><span className="check-icon"><FaCheck /></span> <FaPeopleCarry className="feature-icon" /> Adoption process management</li>
                <li><span className="check-icon"><FaCheck /></span> <FaHandHoldingHeart className="feature-icon" /> Volunteer coordination</li>
                <li><span className="check-icon"><FaCheck /></span> <FaChartLine className="feature-icon" /> Simple dashboard to manage</li>
              </ul>
              <button className={`secondary-button shelter-button ${!isShelterUser ? "disabled-button" : ""}`}
                onClick={() => isShelterUser && navigate("/list-shelter-pet")}
                disabled={!isShelterUser}>
                <span>Start Listing Shelter Pets</span>
                <span className="button-arrow"><FaArrowRight /></span>
              </button>
            </div>
          </div>

          <div className="listing-type rehome">
            <div className="listing-card">
              <div className="listing-icon">
                <div className="icon-circle">
                  <div className="icon-inner"><FaHeart /></div>
                </div>
              </div>
              <h2>Rehome Your Pet</h2>
              <p>
                For pet owners who need to find a new loving home for their pet.
                Our compassionate rehoming service helps ensure your pet finds
                the perfect match with a caring family.
              </p>
              <ul className="features-list">
                <li><span className="check-icon"><FaCheck /></span> <FaFileAlt className="feature-icon" /> Personal listing page</li>
                <li><span className="check-icon"><FaCheck /></span> <FaShieldAlt className="feature-icon" /> Screening questionnaire</li>
                <li><span className="check-icon"><FaCheck /></span> <FaComments className="feature-icon" /> Receive interest from adopters via the platform</li>
                <li><span className="check-icon"><FaCheck /></span> <FaHandHoldingHeart className="feature-icon" /> Rehoming guidance</li>
                <li><span className="check-icon"><FaCheck /></span> <FaHeadset className="feature-icon" /> Follow-up support</li>
              </ul>
              <button className="secondary-button rehome-button" onClick={() => navigate('/rehome-pet')}>
                <span>Start Rehoming Process</span>
                <span className="button-arrow"><FaArrowRight /></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>See how we've helped connect pets with their forever homes</p>
        </div>

        <div className="stories-container">
          <div className="story-card-list">
            <div className="story-image story-1"></div>
            <div className="story-badge">3 Days</div>
            <div className="story-content">
              <h3>Max found his family quickly!</h3>
              <p>"The process was so smooth and we found the perfect match. Forever grateful!"</p>
              <div className="story-footer">
                <div className="story-author">
                  <div className="author-avatar"></div>
                  <div className="author-name">Sarah T.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="story-card-list">
            <div className="story-image story-2"></div>
            <div className="story-badge">40% More</div>
            <div className="story-content">
              <h3>Luna's shelter saw adoptions soar</h3>
              <p>"Since using this platform, our adoption rates have skyrocketed beyond expectation!"</p>
              <div className="story-footer">
                <div className="story-author">
                  <div className="author-avatar"></div>
                  <div className="author-name">Paws Rescue</div>
                </div>
              </div>
            </div>
          </div>

          <div className="story-card-list">
            <div className="story-image story-3"></div>
            <div className="story-badge">Perfect Match</div>
            <div className="story-content">
              <h3>Charlie's perfect new beginning</h3>
              <p>"I needed to rehome my pet and this platform made it possible to find a loving family."</p>
              <div className="story-footer">
                <div className="story-author">
                  <div className="author-avatar"></div>
                  <div className="author-name">Miguel R.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListPetPage;