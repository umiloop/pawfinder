import React, { useState } from "react";
import "./AdoptionForm.css";
import { FaPaw, FaUser, FaEnvelope, FaPhone, FaHome, FaBuilding, FaCat, FaInfoCircle } from "react-icons/fa";
import { AdoptPetService } from "../../../service/AdoptPetService";

// interface AdoptionFormProps {
//   petId: number;
//   petName: string;
//   petAge: number;
//   onClose: () => void;
//   isShelterPet: boolean;
// }

interface AdoptionFormProps {
  petId: number;
  petName: string;
  petAge: number;
  petBreed: string;
  petGender: string;
  petImageUrl: string;
  onClose: () => void;
  isShelterPet: boolean;
  petOwnerId: number;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ petId, petName, petAge, petBreed, petGender,petImageUrl, petOwnerId, onClose, isShelterPet }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  //Get user data from localStorage
  const userDataRaw = localStorage.getItem("user"); // Replace "user" with your actual localStorage key
  let userId = "";
  let username = "";
  if (userDataRaw) {
    try {
      const userData = JSON.parse(userDataRaw);
      userId = userData.userId;
      username = userData.username;
      console.log("username :", username);
      console.log("userid :", userId);
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
    }
  }
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    livingSituation: "",
    hasOtherPets: "",
    experienceWithPets: "",
    workSchedule: "",
    reasonForAdoption: "",
    username,
    userId,
    petType: isShelterPet ? "SHELTER" : "REHOME",
    petOwnerId: petOwnerId
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep = (step: number) => {
    let newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email is required";
        isValid = false;
      }
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required";
        isValid = false;
      }
    } 
    else if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
        isValid = false;
      }
      if (!formData.livingSituation) {
        newErrors.livingSituation = "Please select your living situation";
        isValid = false;
      }
      if (!formData.hasOtherPets) {
        newErrors.hasOtherPets = "Please indicate if you have other pets";
        isValid = false;
      }
    }
    else if (step === 3) {
      if (!formData.experienceWithPets.trim()) {
        newErrors.experienceWithPets = "Please describe your experience with pets";
        isValid = false;
      }
      if (!formData.reasonForAdoption.trim()) {
        newErrors.reasonForAdoption = "Please share your reason for adoption";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const step1Valid = validateStep(1);
  //   const step2Valid = validateStep(2);
  //   const step3Valid = validateStep(3);
    
  //   if (!step1Valid || !step2Valid || !step3Valid) {
  //     setCurrentStep(step1Valid ? (step2Valid ? 3 : 2) : 1);
  //     return;
  //   }
    
  //   setIsSubmitting(true);

  //   try {
  //     // Create the adoption payload with pet details
  //     const adoptionData = {
  //       ...formData,
  //       petId,
  //       petName,
  //       petAge,
  //       petType: isShelterPet ? "SHELTER" : "REHOME",
  //       submissionDate: new Date().toISOString()
  //     };

  //     // Log the complete payload before submission
  //     console.log('Adoption Request Payload:', JSON.stringify(adoptionData, null, 2));

  //     await AdoptPetService.submitAdoptionRequest(adoptionData);
  //     setSubmitSuccess(true);
  //     setTimeout(() => {
  //       onClose();
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Error submitting adoption request:', error);
  //     setErrors({
  //       submit: "Something went wrong. Please try again."
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const step1Valid = validateStep(1);
  const step2Valid = validateStep(2);
  const step3Valid = validateStep(3);
  
  if (!step1Valid || !step2Valid || !step3Valid) {
    setCurrentStep(step1Valid ? (step2Valid ? 3 : 2) : 1);
    return;
  }
  
  setIsSubmitting(true);

  try {
    // Create the adoption payload with all pet details
    const adoptionData = {
      ...formData,
      petId,
      petName,
      petAge,
      petBreed,
      petGender,
      petImageUrl,
      petType: isShelterPet ? "SHELTER" : "REHOME",
      petOwnerId,
      submissionDate: new Date().toISOString()
    };

    console.log('Adoption Request Payload:', JSON.stringify(adoptionData, null, 2));

    await AdoptPetService.submitAdoptionRequest(adoptionData);
    setSubmitSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  } catch (error) {
    console.error('Error submitting adoption request:', error);
    setErrors({
      submit: "Something went wrong. Please try again."
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="steps-indicator">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div 
              key={i} 
              className={`step-dot ${currentStep >= i + 1 ? 'active' : ''}`}
              onClick={() => {
                if (i + 1 < currentStep || validateStep(currentStep)) {
                  setCurrentStep(i + 1);
                }
              }}
            >
              <span className="step-number">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrentStepFields = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div className="form-step-header">
              <h3>Personal Information</h3>
              <p>Let's start with some basic details about you.</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="input-icon" /> Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-field error" : "input-field"}
                placeholder="Your full name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" /> Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-field error" : "input-field"}
                placeholder="Your email address"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">
                <FaPhone className="input-icon" /> Contact Number
              </label>
              <input
                id="contactNumber"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? "input-field error" : "input-field"}
                placeholder="Your phone number"
              />
              {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <div className="form-step-header">
              <h3>Living Situation</h3>
              <p>Tell us about your home environment.</p>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                <FaHome className="input-icon" /> Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "input-field error" : "input-field"}
                placeholder="Your home address"
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="livingSituation">
                <FaBuilding className="input-icon" /> Living Situation
              </label>
              <select
                id="livingSituation"
                name="livingSituation"
                value={formData.livingSituation}
                onChange={handleChange}
                className={errors.livingSituation ? "select-field error" : "select-field"}
              >
                <option value="">Select your living situation</option>
                <option value="apartment">Apartment</option>
                <option value="house">House with yard</option>
                <option value="house-no-yard">House without yard</option>
                <option value="condo">Condo/Townhouse</option>
                <option value="other">Other</option>
              </select>
              {errors.livingSituation && <p className="error-message">{errors.livingSituation}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hasOtherPets">
                <FaCat className="input-icon" /> Do you have other pets?
              </label>
              <div className="radio-group">
                <label className={`radio-option ${formData.hasOtherPets === "yes" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="hasOtherPets"
                    value="yes"
                    checked={formData.hasOtherPets === "yes"}
                    onChange={handleChange}
                  />
                  <span className="radio-label">Yes</span>
                </label>
                <label className={`radio-option ${formData.hasOtherPets === "no" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="hasOtherPets"
                    value="no"
                    checked={formData.hasOtherPets === "no"}
                    onChange={handleChange}
                  />
                  <span className="radio-label">No</span>
                </label>
              </div>
              {errors.hasOtherPets && <p className="error-message">{errors.hasOtherPets}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="workSchedule">
                <FaInfoCircle className="input-icon" /> Work Schedule
              </label>
              <select
                id="workSchedule"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleChange}
                className="select-field"
              >
                <option value="">Select your typical schedule</option>
                <option value="remote">Work from home/Remote</option>
                <option value="part-time">Part-time (less than 20 hours/week)</option>
                <option value="full-time">Full-time (40+ hours/week)</option>
                <option value="flexible">Flexible hours</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="form-step-header">
              <h3>Pet Experience</h3>
              <p>Tell us about your experience with pets and why you want to adopt {petName}.</p>
            </div>

            <div className="form-group">
              <label htmlFor="experienceWithPets">
                <FaInfoCircle className="input-icon" /> Experience with Pets
              </label>
              <textarea
                id="experienceWithPets"
                name="experienceWithPets"
                value={formData.experienceWithPets}
                onChange={handleChange}
                className={errors.experienceWithPets ? "textarea-field error" : "textarea-field"}
                placeholder="Describe your experience with pets (previous or current pets, etc.)"
                rows={4}
              />
              {errors.experienceWithPets && <p className="error-message">{errors.experienceWithPets}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="reasonForAdoption">
                <FaPaw className="input-icon" /> Why do you want to adopt {petName}?
              </label>
              <textarea
                id="reasonForAdoption"
                name="reasonForAdoption"
                value={formData.reasonForAdoption}
                onChange={handleChange}
                className={errors.reasonForAdoption ? "textarea-field error" : "textarea-field"}
                placeholder="Share why you're interested in adopting this pet and how you plan to care for them"
                rows={4}
              />
              {errors.reasonForAdoption && <p className="error-message">{errors.reasonForAdoption}</p>}
            </div>

            {errors.submit && (
              <div className="submit-error">
                <p>{errors.submit}</p>
              </div>
            )}
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="adoption-form-container">
      <div className="form-header">
        <div className="form-title">
          <FaPaw className="adoption-form-paw-icon" />
          <h2 className="adoption-form-heading">Adoption Application: {petName}</h2>
        </div>
      </div>
      
      {!submitSuccess && renderProgressBar()}
      
      <div className="form-content">
        {submitSuccess ? (
          <div className="success-container">
            <div className="success-icon">
              <FaPaw className="paw-icon" />
              <FaPaw className="paw-icon" />
              <FaPaw className="paw-icon" />
            </div>
            <h2>Application Submitted!</h2>
            <p>Thank you for your interest in adopting {petName}. We've received your application and will contact you soon.</p>
          </div>
        ) : (
          <div className="step-content">
            {renderCurrentStepFields()}
          </div>
        )}
      </div>
      
      {!submitSuccess && (
        <div className="form-actions">
          {currentStep > 1 ? (
            <button className="secondary-button" onClick={prevStep}>
              Back
            </button>
          ) : (
            <button className="secondary-button" onClick={onClose}>
              Cancel
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button className="primary-button" onClick={nextStep}>
              Continue
            </button>
          ) : (
            <button 
              className="primary-button submit-button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdoptionForm;