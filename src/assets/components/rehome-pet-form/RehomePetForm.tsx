import React, { useState } from "react";
import "./RehomePetForm.css";
import { submitPetForm } from "../../../service/RehomePetService";
import SuccessModal from '../success-rehome-alert/SuccessModal.tsx';

const RehomePetForm = () => {
  // State for form fields
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Years");
  const [gender, setGender] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [spayedNeuteredStatus, setSpayedNeuteredStatus] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [petPhotos, setPetPhotos] = useState<File[]>([]);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 3);
      const newErrors = { ...errors };
      delete newErrors.petPhotos;

      // Validate files
      for (const file of newPhotos) {
        if (file.size > 5 * 1024 * 1024) {
          newErrors.petPhotos = "File size must be less than 5MB";
          break;
        } else if (!file.type.startsWith("image/")) {
          newErrors.petPhotos = "Only image files are allowed";
          break;
        }
      }

      setErrors(newErrors);

      if (!newErrors.petPhotos) {
        try {
          // Upload images to Cloudinary and get URLs
          const uploadPromises = newPhotos.map(file => uploadToCloudinary(file));
          const uploadedImages = await Promise.all(uploadPromises);
          
          setPetPhotos(uploadedImages); // Now storing Cloudinary response objects
          setPhotoURLs(uploadedImages.map(img => img.secure_url)); // Using Cloudinary URLs
        } catch (error) {
          console.error("Error uploading images:", error);
          setErrors({...newErrors, petPhotos: "Failed to upload images"});
        }
      }
    }
  };

  // Function to upload a single file to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'PawFinder'); // Replace with your upload preset
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ducgvygga/image/upload`, // Replace with your cloud name
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    
    // Specifically log the secure URL
    console.log('Uploaded image URL:', data.secure_url);
  
  return data;
  };

  // Remove a specific photo
  const handleRemovePhoto = (index: number) => {
    setPetPhotos((current) => current.filter((_, i) => i !== index));
    setPhotoURLs((current) => current.filter((_, i) => i !== index));
  };

  const testprint = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("print data");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (!petName) newErrors.petName = "Pet name is required";
    if (!petType) newErrors.petType = "Pet type is required";
    if (!breed) newErrors.breed = "Breed is required";
    if (!age) newErrors.age = "Age is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!vaccinationStatus) newErrors.vaccinationStatus = "Vaccination status is required";
    if (!spayedNeuteredStatus) newErrors.spayedNeuteredStatus = "Spayed/Neutered status is required";
    if (!location) newErrors.location = "Location is required";
    if (!contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!reason) newErrors.reason = "Reason for rehoming is required";
    if (!description) newErrors.description = "Description is required";
    if (petPhotos.length === 0) newErrors.petPhotos = "At least one pet photo is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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

    // Submit form data (you can replace this with an API call)
    const petData = {
      petName,
      petType,
      breed,
      age: `${age} ${ageUnit}`,
      gender,
      vaccinationStatus,
      spayedNeuteredStatus,
      location,
      contactNumber,
      reason,
      description,
      photoURLs,
      userId,
      username
    };
    
    const formData = new FormData();
    photoURLs.forEach((file) => formData.append("photos", file));
    formData.append("petName", petName);
    formData.append("petType", petType);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("ageUnit", ageUnit);
    formData.append("gender", gender);
    formData.append("vaccinationStatus", vaccinationStatus);
    formData.append("spayedNeuteredStatus", spayedNeuteredStatus);
    formData.append("location", location);
    formData.append("contactNumber", contactNumber);
    formData.append("reason", reason);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("username", username);
    

  try {
    await submitPetForm(formData);
    // Instead of alert, show the success modal
    setShowSuccessModal(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
    console.log("Pet Data:", petData);
    console.log("Form Data:", formData);

    // Don't clear the form here, wait for user confirmation
  };

  // Handle modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    handleClearForm(); // Clear the form after user closes modal
    // Optionally navigate to another page
    // navigate('/my-pets');
  };

  // Clear form
  const handleClearForm = () => {
    setPetName("");
    setPetType("");
    setBreed("");
    setAge("");
    setAgeUnit("Years");
    setGender("");
    setVaccinationStatus("");
    setSpayedNeuteredStatus("");
    setLocation("");
    setContactNumber("");
    setReason("");
    setDescription("");
    setPetPhotos([]);
    setPhotoURLs([]);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <h2 className="form-title">Rehome Your Pet</h2>
        <p className="form-subtitle">
          We'll help find a loving new home for your furry friend
        </p>

        {/* Pet Photos Upload */}
        <div className="form-group">
          <label className="label">Pet Photos (Max 3)</label>
          <div className="upload-box">
            <input
              type="file"
              id="pet-photos"
              accept="image/*"
              onChange={handleFileUpload}
              multiple
              style={{ display: "none" }}
            />
            <label htmlFor="pet-photos" className="upload-label">
              {photoURLs.length > 0 ? (
                <div className="photo-preview-container">
                  {photoURLs.map((url, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={url}
                        alt={`Pet Preview ${index + 1}`}
                        className="pet-preview"
                      />
                      <button
                        type="button"
                        className="remove-photo"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {photoURLs.length < 3 && (
                    <div className="add-more">
                      <p>Add More</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="upload-instructions">
                    Click to upload or drag and drop
                  </p>
                  <p className="upload-note">PNG, JPG up to 5MB</p>
                </>
              )}
            </label>
          </div>
          {errors.petPhotos && <p className="error-message">{errors.petPhotos}</p>}
        </div>

        {/* Pet Name */}
        <div className="form-group">
          <label className="label" htmlFor="pet-name">
            Pet Name
          </label>
          <input
            id="pet-name"
            type="text"
            className="input"
            placeholder="Enter pet name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          {errors.petName && <p className="error-message">{errors.petName}</p>}
        </div>

        {/* Pet Type */}
        <div className="form-group">
          <label className="label" htmlFor="pet-type">
            Pet Type
          </label>
          <select
            id="pet-type"
            className="input"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
          {errors.petType && <p className="error-message">{errors.petType}</p>}
        </div>

        {/* Breed */}
        <div className="form-group">
          <label className="label" htmlFor="breed">
            Breed
          </label>
          <input
            id="breed"
            type="text"
            className="input"
            placeholder="Enter breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          {errors.breed && <p className="error-message">{errors.breed}</p>}
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="label" htmlFor="age">
            Age
          </label>
          <div className="input-group">
            <input
              id="age"
              type="number"
              className="input"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select
              className="input"
              value={ageUnit}
              onChange={(e) => setAgeUnit(e.target.value)}
            >
              <option value="Years">Years</option>
              <option value="Months">Months</option>
            </select>
          </div>
          {errors.age && <p className="error-message">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="label">Gender</label>
          <div className="gender-group">
            <button
              type="button"
              className={`gender-button ${gender === "Male" ? "active" : ""}`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              type="button"
              className={`gender-button ${gender === "Female" ? "active" : ""}`}
              onClick={() => setGender("Female")}
            >
              Female
            </button>
          </div>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        {/* Vaccination Status */}
        <div className="form-group">
          <label className="label">Vaccination Status</label>
          <div className="gender-group">
            <button
              type="button"
              className={`gender-button ${vaccinationStatus === "Not Vaccinated" ? "active" : ""}`}
              onClick={() => setVaccinationStatus("Not Vaccinated")}
            >
              Not Vaccinated
            </button>
            <button
              type="button"
              className={`gender-button ${vaccinationStatus === "Vaccinated" ? "active" : ""}`}
              onClick={() => setVaccinationStatus("Vaccinated")}
            >
              Vaccinated
            </button>
          </div>
          {errors.vaccinationStatus && (
            <p className="error-message">{errors.vaccinationStatus}</p>
          )}
        </div>

        {/* Spayed/Neutered Status */}
        <div className="form-group">
          <label className="label">Spayed/Neutered Status</label>
          <div className="gender-group">
            <button
              type="button"
              className={`gender-button ${spayedNeuteredStatus === "Spayed" ? "active" : ""}`}
              onClick={() => setSpayedNeuteredStatus("Spayed")}
            >
              Spayed
            </button>
            <button
              type="button"
              className={`gender-button ${spayedNeuteredStatus === "Neutered" ? "active" : ""}`}
              onClick={() => setSpayedNeuteredStatus("Neutered")}
            >
              Neutered
            </button>
            <button
              type="button"
              className={`gender-button ${spayedNeuteredStatus === "Not Spayed/Neutered" ? "active" : ""}`}
              onClick={() => setSpayedNeuteredStatus("Not Spayed/Neutered")}
            >
              Not Spayed/Neutered
            </button>
          </div>
          {errors.spayedNeuteredStatus && (
            <p className="error-message">{errors.spayedNeuteredStatus}</p>
          )}
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="input"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label className="label" htmlFor="contact-number">
            Contact Number
          </label>
          <input
            id="contact-number"
            type="tel"
            className="input"
            placeholder="Enter contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          {errors.contactNumber && (
            <p className="error-message">{errors.contactNumber}</p>
          )}
        </div>

        {/* Reason for Rehoming */}
        <div className="form-group">
          <label className="label" htmlFor="reason">
            Reason for Rehoming
          </label>
          <select
            id="reason"
            className="input"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select reason</option>
            <option value="Moving">Moving</option>
            <option value="Allergies">Allergies</option>
            <option value="Other">Other</option>
          </select>
          {errors.reason && <p className="error-message">{errors.reason}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="textarea"
            placeholder="Tell us about your pet (max 250 characters)"
            maxLength={250}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        {/* Submit & Clear Buttons */}
        <div className="button-group">
          <button type="submit" className="submit-button" onSubmit={testprint}>
            Post for Rehoming
          </button>
          <button
            type="button"
            className="clear-button"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        petName={petName}
      />
    </form>
  );
};

export default RehomePetForm;