// MissingPetCard.tsx
import React, { useState } from 'react';
import { MapPin, Heart, Share2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MissingPetCard.css';

interface MissingPetCardProps {
  name: string;
  breed: string;
  age: string;
  location: string;
  missingDate?: string;
  reward?: string;
  imageUrl?: string;
}

const MissingPetCard: React.FC<MissingPetCardProps> = ({
  name,
  breed,
  age,
  location,
  missingDate = "May 12, 2023",
  reward = "$500",
  imageUrl = "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  
  const handleSeenPetClick = () => {
    navigate('/report-missing-pet');
  };
  
  return (
    <div className="missing-pet-card-container">
      <div className="missing-pet-card">
        <div className="image-container">
          <img src={imageUrl} alt={`Missing pet ${name}`} className="pet-image" />
          <div className="missing-badge">
            <AlertTriangle size={14} />
            Missing
          </div>
          <button 
            className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label={isBookmarked ? "Remove from saved" : "Save pet"}
          >
            <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          {reward && <div className="reward-badge">Reward: {reward}</div>}
        </div>
        
        <div className="pet-details">
          <div className="pet-header">
            <h3 className="pet-name">{name}</h3>
            <span className="missing-date">Missing since {missingDate}</span>
          </div>
          
          <div className="pet-info">
            <span className="info-pill">{breed}</span>
            <span className="info-pill">{age} years old</span>
          </div>
          
          <div className="pet-location">
            <MapPin className="location-icon" />
            <span>{location}</span>
          </div>
          
          <div className="action-buttons">
            <button className="contact-button" onClick={handleSeenPetClick}>I've Seen This Pet</button>
            <button className="share-button" aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPetCard;