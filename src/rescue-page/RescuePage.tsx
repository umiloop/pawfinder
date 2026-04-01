import React, { useState, useEffect } from 'react';
import './RescuePage.css';
import MissingPetCard from '../assets/components/missing-pet-card/MissingPetCard';
import { useNavigate } from "react-router-dom";
import { RescueService } from '../service/RescueService';

const RESCUE_HERO_IMAGE = new URL("../assets/images/Rescue_hero.png", import.meta.url).href;
const RESCUE_CUTEDOG_IMAGE = new URL("../assets/images/Cutedog.png", import.meta.url).href;
const RESCUE_GLOBAL_MARKETING_ICON = new URL("../assets/images/Global Marketing.png", import.meta.url).href;
const RESCUE_PET_CARE_ICON = new URL("../assets/images/Pet Care.png", import.meta.url).href;
const RESCUE_RELATIONSHIP_ICON = new URL("../assets/images/Relationship.png", import.meta.url).href;
const RESCUE_PET_ICON = new URL("../assets/images/Pet.png", import.meta.url).href;
const DEFAULT_PET_IMAGE = "/default-pet.svg";

const RescueHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="rescue-scoped-hero">
      <div className="rescue-scoped-overlay" aria-hidden="true" />
      <img
        src={RESCUE_HERO_IMAGE}
        alt="Rescue animals hero image"
        className="rescue-scoped-hero-bg"
      />
      <div className="rescue-scoped-hero-text-container">
        <div className="rescue-scoped-hero-text-content">
          <h1 className="rescue-scoped-main-heading">
            Help Us Rescue 
            <span className="rescue-scoped-highlight"> Animals </span> in Need
          </h1>
          <p className="rescue-scoped-sub-heading">
            Your report can save a life. Together, we can make a difference.
          </p>
        </div>
      </div>
      <div className="rescue-scoped-cta-container">
        <button 
          className="rescue-scoped-cta rescue-scoped-stray-btn" 
          aria-label="Report a stray animal"
          onClick={() => navigate("/report-rescue-pet")}
        >
          Report a Stray
        </button>
        <button 
          className="rescue-scoped-cta rescue-scoped-missing-btn" 
          aria-label="Report a missing pet"
          onClick={() => navigate("/report-missing-pet")}
        >
          Report Missing Pet
        </button>
      </div>
    </section>
  );
};

interface RescueFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  altText?: string;
}

const RescueFeatureCard: React.FC<RescueFeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  altText
}) => (
  <div className="rescue-scoped-feature-card">
    <div className="rescue-scoped-feature-icon">
      <img src={icon} alt={altText || `${title} icon`} className="rescue-scoped-card-icon" />
    </div>
    <h3 className="rescue-scoped-feature-title">{title}</h3>
    <p className="rescue-scoped-feature-desc">{description}</p>
  </div>
);

const RescueFeaturesSection: React.FC = () => (
  <section className="rescue-scoped-features" id="features">
    <div className="rescue-scoped-container">
      <h2 className="rescue-scoped-section-title">Why Choose PawFinder?</h2>
      
      <div className="rescue-scoped-features-content">
        <div className="rescue-scoped-feature-img-container">
          <img
            src={RESCUE_CUTEDOG_IMAGE}
            alt="Happy rescued dog"
            className="rescue-scoped-feature-img"
            loading="lazy"
          />
        </div>
        
        <div className="rescue-scoped-features-grid">
          <RescueFeatureCard
            icon={RESCUE_GLOBAL_MARKETING_ICON}
            altText="Network icon representing global reach"
            title="Largest Reach"
            description="Connecting communities to rescue and protect animals in need"
          />
          <RescueFeatureCard
            icon={RESCUE_PET_CARE_ICON}
            altText="Medical care icon"
            title="Immediate Care"
            description="Providing urgent medical attention and shelter for rescued animals"
          />
          <RescueFeatureCard
            icon={RESCUE_RELATIONSHIP_ICON}
            altText="Home icon"
            title="Forever Homes"
            description="Helping animals find loving and permanent homes"
          />
          <RescueFeatureCard
            icon={RESCUE_PET_ICON}
            altText="Reunion icon"
            title="Most Reunions"
            description="Reuniting lost pets with their families faster than ever"
          />
        </div>
      </div>
    </div>
  </section>
);

const RescueMissingPetsSection: React.FC = () => {
  const [missingPets, setMissingPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissingPets = async () => {
      try {
        const data = await RescueService.getApprovedMissingPetReports();
        setMissingPets(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch missing pet reports. Please try again later.");
        console.error("Error fetching missing pet reports:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissingPets();
  }, []);

  return (
    <section className="rescue-scoped-missing-pets">
      <div className="rescue-scoped-container">
        <h1 className='rescue-scoped-section-title'>Missing Pets</h1>
        {isLoading ? (
          <div className="rescue-scoped-loading">
            <div className="rescue-scoped-spinner"></div>
            <p>Loading missing pets...</p>
          </div>
        ) : error ? (
          <div className="rescue-scoped-error">
            <p>{error}</p>
          </div>
        ) : missingPets.length === 0 ? (
          <div className="rescue-scoped-no-pets">
            <p>No missing pets reported at the moment.</p>
          </div>
        ) : (
          <div className="rescue-scoped-pets-grid">
            {missingPets.map((pet) => (
              <MissingPetCard 
                key={pet.id}
                name={pet.petName}
                breed={pet.breed}
                age={`${pet.age} ${pet.ageUnit}`}
                location={pet.location_address}
                // missingDate={new Date(pet.createdAt).toLocaleDateString()}
                missingDate={`${pet.lastSeenDate} at ${pet.lastSeenTime}`}
                reward={pet.offerReward ? `$${pet.rewardAmount}` : undefined}
                imageUrl={pet.photoURLs?.[0] || DEFAULT_PET_IMAGE}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const RescuePage: React.FC = () => (
  <main className="rescue-scoped-page">
    <RescueHeroSection />
    <RescueFeaturesSection />
    <RescueMissingPetsSection />
  </main>
);

export default RescuePage;