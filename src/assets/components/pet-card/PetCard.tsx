import "./PetCard.css";
import DogPic from "../../images/dogPic.png";
import { FaPaw, FaBirthdayCake, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import PetProfile from "../pet-profile/PetProfile";
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
  isShelterPet: Boolean;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  const handleAdoptClick = () => {
    if (pet.petAvailabilityStatus !== "Adopted") {
      setShowAdoptionForm(true);
    }
  };

  const closeAdoptionForm = () => {
    setShowAdoptionForm(false);
  };

  // Function to handle image loading and maintain aspect ratio
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    if (aspectRatio > 1) {
      // Landscape image
      img.style.height = '200px';
      img.style.width = 'auto';
    } else {
      // Portrait image
      img.style.width = '100%';
      img.style.height = '200px';
      img.style.objectFit = 'cover';
    }
  };

  // Ensure all required data is present for PetProfile
  const petProfileData = {
    ...pet,
    photoUrls: pet.photoUrls || [pet.petPicture || DogPic],
    description: pet.description || "No description available",
    petAvailabilityStatus: pet.petAvailabilityStatus || "Available"
  };

  return (
    <>
      <div className="pet-card-component-container">
        <div className="pet-card-component">
          <div className="pet-card-component-img-container">
            <img
              src={pet.petPicture ? pet.petPicture : DogPic}
              alt={pet.petName}
              className="pet-card-component-image"
              onLoad={handleImageLoad}
            />
            <span className={`pet-card-component-status ${pet.petAvailabilityStatus.toLowerCase()}`}>
              {pet.petAvailabilityStatus}
            </span>
          </div>
          <div className="pet-card-component-info">
            <div className="pet-card-component-header">
              <h3>{pet.petName}</h3>
            </div>
            <div className="pet-card-component-info-container">
              <div className="pet-card-component-info-item">
                <FaPaw className="pet-card-component-info-icon" />
                <p>{pet.petBreed}</p>
              </div>
              <div className="pet-card-component-info-item">
                <FaBirthdayCake className="pet-card-component-info-icon" />
                <p>{pet.petAge}</p>
              </div>
              <div className="pet-card-component-info-item">
                <FaMapMarkerAlt className="pet-card-component-info-icon" />
                <p>{pet.petLocation}</p>
              </div>
              <div className="pet-card-component-info-item">
                <FaUser className="pet-card-component-info-icon" />
                <p>{pet.userName || "Unknown User"}</p>
              </div>
            </div>
            <div className="pet-card-component-actions">
              <button 
                className="pet-card-component-details-btn" 
                onClick={() => setIsModalOpen(true)}
              >
                View Details
              </button>
              <button 
                className={`pet-card-component-adopt-btn ${
                  pet.petAvailabilityStatus === "Adopted" ? "disabled" : ""
                }`}
                onClick={handleAdoptClick}
                disabled={pet.petAvailabilityStatus === "Adopted"}
              >
                {pet.petAvailabilityStatus === "Adopted" 
                  ? "Already Adopted" 
                  : "Adopt Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <AdoptionForm
              petId={pet.petId}
              petName={pet.petName}
              petAge={parseInt(pet.petAge) || 0} // Convert string age to number
              petBreed={pet.petBreed}
              petGender={pet.petGender}
              petImageUrl={pet.petPicture || DogPic}
              onClose={closeAdoptionForm}
              isShelterPet={pet.isShelterPet}
              petOwnerId={pet.userId}  
            />
          </div>
        </div>
      )}

      {/* Pet Profile Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ✖
            </button>
            <PetProfile pet={petProfileData} />
          </div>
        </div>
      )}
    </>
  );
};

export default PetCard;