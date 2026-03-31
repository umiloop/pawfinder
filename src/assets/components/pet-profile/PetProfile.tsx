import React, { useState } from "react";
import "./PetProfile.css";
import DogPic from "../../images/dogPic.png";
import AdoptionForm from "../adoption-request-form/AdoptionForm";

interface Pet {
  petId: number;
  petName: string;
  petAge: string;
  petLocation: string;
  petAvailabilityStatus: string;
  petPicture: string;
  petBreed: string;
  petGender: string;
  contactPersonNumber: string;
  userId: number;
  userName: string;
  description: string;
  photoUrls?: string[];
  isShelterPet?: boolean;
}

interface PetProfileProps {
  pet: Pet;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet }) => {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAdoptClick = () => {
    if (pet.petAvailabilityStatus === "Adopted") {
      alert("This pet has already been adopted!");
    } else {
      setShowAdoptionForm(true);
    }
  };

  const closeAdoptionForm = () => {
    setShowAdoptionForm(false);
  };

  // Create an array of images, using all available photos
  const images = pet.photoUrls && pet.photoUrls.length > 0 ? pet.photoUrls : [pet.petPicture || DogPic];

  return (
    <div className="pf-pet-profile-container">
      <div className="pf-pet-profile-content">
        {/* Left Section: Main image + Small images */}
        <div className="pf-pet-profile-media">
          <div className="pf-main-img-container">
            <img 
              src={images[selectedImage]} 
              alt={`${pet.petName}`} 
              className="pf-main-image"
              onError={(e) => {
                e.currentTarget.src = DogPic;
              }}
            />
          </div>
          <div className="pf-thumbnail-container">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`pf-thumbnail-wrapper ${selectedImage === index ? 'pf-selected' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${pet.petName} - Thumbnail ${index + 1}`}
                  className="pf-thumbnail-image"
                  onError={(e) => {
                    e.currentTarget.src = DogPic;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Pet Information */}
        <div className="pf-pet-profile-info">
          <div className="pf-pet-header">
            <h2 className="pf-pet-name">{pet.petName}</h2>
            <p className="pf-pet-age">{pet.petAge}</p>
          </div>
          
          <div className="pf-pet-section">
            <h3 className="pf-section-title">Pet Details</h3>
            <div className="pf-pet-details-grid">
              <div className="pf-pet-detail-item">
                <span className="pf-detail-label">Breed</span>
                <span className="pf-detail-value">{pet.petBreed}</span>
              </div>
              
              <div className="pf-pet-detail-item">
                <span className="pf-detail-label">Gender</span>
                <span className="pf-detail-value">{pet.petGender}</span>
              </div>
              
              <div className="pf-pet-detail-item">
                <span className="pf-detail-label">Location</span>
                <span className="pf-detail-value">{pet.petLocation}</span>
              </div>
              
              <div className="pf-pet-detail-item">
                <span className="pf-detail-label">Contact</span>
                <span className="pf-detail-value">{pet.contactPersonNumber}</span>
              </div>
            </div>
          </div>
          
          <div className="pf-pet-section">
            <h3 className="pf-section-title">About {pet.petName}</h3>
            <div className="pf-pet-description-container">
              <p className="pf-pet-description">{pet.description}</p>
            </div>
          </div>
          
          <div className="pf-action-section">
            <button 
              className={`pf-adopt-button ${pet.petAvailabilityStatus === "Adopted" ? "pf-already-adopted" : ""}`}
              onClick={handleAdoptClick}
              disabled={pet.petAvailabilityStatus === "Adopted"}
            >
              {pet.petAvailabilityStatus === "Adopted" ? "Already Adopted" : "Adopt Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <div className="pf-modal-backdrop">
          <div className="pf-modal-container">
            <AdoptionForm
              petId={pet.petId}
              petName={pet.petName}
              petAge={parseInt(pet.petAge) || 0}
              petBreed={pet.petBreed}
              petGender={pet.petGender}
              petImageUrl={pet.petPicture || DogPic}
              petOwnerId={pet.userId}
              isShelterPet={pet.isShelterPet ?? false}
              onClose={closeAdoptionForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProfile;