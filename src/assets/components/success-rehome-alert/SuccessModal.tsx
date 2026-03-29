import React from 'react';
import { FaPaw, FaCheck, FaHome } from 'react-icons/fa';
import './SuccessModal.css.css'; // Import your CSS styles

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, petName }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-container" onClick={e => e.stopPropagation()}>
        <div className="success-modal-icon-container">
          <div className="success-modal-icon-circle">
            <FaCheck className="success-modal-icon" />
          </div>
          <div className="success-modal-paw-icon">
            <FaPaw />
          </div>
        </div>
        
        <h2 className="success-modal-title">Submission Successful!</h2>
        
        <p className="success-modal-message">
          Thank you for listing <strong>{petName}</strong> for rehoming. 
          Your pet's information has been submitted successfully.
        </p>
        
        <div className="success-modal-details">
          <div className="success-modal-detail-item">
            <div className="success-modal-detail-icon">
              <FaCheck />
            </div>
            <p>Your listing will be reviewed and published shortly</p>
          </div>
          <div className="success-modal-detail-item">
            <div className="success-modal-detail-icon">
              <FaCheck />
            </div>
            <p>You'll be notified when potential adopters show interest</p>
          </div>
          <div className="success-modal-detail-item">
            <div className="success-modal-detail-icon">
              <FaHome />
            </div>
            <p>You can manage your listings in your profile dashboard</p>
          </div>
        </div>
        
        <div className="success-modal-buttons">
          <button 
            className="success-modal-button primary" 
            onClick={onClose}
          >
            Continue
          </button>
        </div>
        
        <button className="success-modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SuccessModal;