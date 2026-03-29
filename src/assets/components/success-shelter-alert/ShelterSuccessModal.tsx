import React from 'react';
import { FaCheck, FaClock, FaBell, FaClipboardList } from 'react-icons/fa';
import './ShelterSuccessModal.css';

interface ShelterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  shelterName: string;
}

const ShelterSuccessModal: React.FC<ShelterSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  petName,
  shelterName
}) => {
  if (!isOpen) return null;

  return (
    <div className="shelter-success-modal-overlay" onClick={onClose}>
      <div className="shelter-success-modal-container" onClick={e => e.stopPropagation()}>
        <div className="shelter-success-modal-icon-container">
          <div className="shelter-success-modal-icon-circle">
            <FaCheck className="shelter-success-modal-icon" />
          </div>
        </div>
        
        <h2 className="shelter-success-modal-title">Submission Successful!</h2>
        
        <p className="shelter-success-modal-message">
          Thank you for listing <strong>{petName}</strong> from <strong>{shelterName}</strong>. 
          Your pet's information has been submitted successfully.
        </p>
        
        {/* Simple approval notice */}
        <div className="shelter-success-modal-approval">
          <div className="shelter-success-modal-approval-icon">
            <FaClock />
          </div>
          <div className="shelter-success-modal-approval-text">
            Your listing will be reviewed by an administrator before it goes live. 
            This typically takes 24-48 hours.
          </div>
        </div>
        
        <div className="shelter-success-modal-details">
          <div className="shelter-success-modal-detail-item">
            <div className="shelter-success-modal-detail-icon">
              <FaClipboardList />
            </div>
            <p>You can check the status of your listing in "My Listings"</p>
          </div>
          <div className="shelter-success-modal-detail-item">
            <div className="shelter-success-modal-detail-icon">
              <FaBell />
            </div>
            <p>You'll be notified when your listing is approved</p>
          </div>
        </div>
        
        <div className="shelter-success-modal-buttons">
          <button 
            className="shelter-success-modal-button primary" 
            onClick={onClose}
          >
            Continue
          </button>
        </div>
        
        <button className="shelter-success-modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ShelterSuccessModal;