import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportStrayPetForm.css';
import { reportStrayAnimal } from '../../../service/ReportStrayAnimalService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map click handler component (must be inside MapContainer)
const MapClickHandler = ({ setPosition }: { setPosition: (position: [number, number]) => void }) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// Component to fly to a location when coordinates change
const ChangeMapView = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, map.getZoom());
    }
  }, [coords, map]);
  
  return null;
};

// Location picker component with search functionality
const LocationPicker = ({ position, setPosition }: { position: [number, number] | null; setPosition: (position: [number, number]) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    setIsSearching(true);
    setError(null);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Search failed. Please try again.');
      }
      
      const data = await response.json();
      setSearchResults(data);
      
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        setError('No locations found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setError('Error searching for location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="map-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          type="button" 
          onClick={handleSearch} 
          className="search-button"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="map-container">
        <MapContainer 
          center={position || [51.505, -0.09]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler setPosition={setPosition} />
          {position && <Marker position={position} />}
          <ChangeMapView coords={position} />
        </MapContainer>
      </div>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.slice(0, 3).map((result, index) => (
              <li 
                key={index} 
                onClick={() => setPosition([parseFloat(result.lat), parseFloat(result.lon)])}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ReportStrayPetForm = () => {
  const navigate = useNavigate(); // Add navigation hook
  const [isSubmitting, setIsSubmitting] = useState(false); // Add new state variables for form submission feedback
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [petPhotos, setPetPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoURLs] = useState<string[]>([]);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationText, setLocationText] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [useMap, setUseMap] = useState(false);
  const [animalType, setAnimalType] = useState('');
  const [injured, setInjured] = useState(false);
  const [stray, setStray] = useState(true);
  const [malnourished, setMalnourished] = useState(false);
  const [description, setAdditionalDetails] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [animalStatus, setAnimalStatus] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    setPetPhotos(current => current.filter((_, i) => i !== index));
    setPhotoURLs(current => current.filter((_, i) => i !== index));
  };

  // Toggle functions for each condition
  const toggleInjured = () => setInjured(prev => !prev);
  const toggleStray = () => setStray(prev => !prev);
  const toggleMalnourished = () => setMalnourished(prev => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (petPhotos.length === 0) newErrors.petPhotos = "At least one pet photo is required";
    if (!animalType) newErrors.animalType = "Animal type is required";
    if (!useMap && !locationText) newErrors.location = "Location is required";
    if (useMap && !position) newErrors.map = "Please select a location on the map";
    if (!description) newErrors.additionalDetails = "Description is required";
    if (!contactName) newErrors.contactName = "Your name is required";
    if (!contactPhone) newErrors.contactPhone = "Phone number is required";
    if (!contactEmail) newErrors.contactEmail = "Email is required";
    if (!animalStatus) newErrors.animalStatus = "Please specify if the animal appears lost or abandoned";
    if (!actionRequired) newErrors.actionRequired = "Please specify what action is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorKey);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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

    const payload = {
      animalType,
      injured,
      stray,
      malnourished,
      description,
      animalStatus,
      actionRequired,
      contactName,
      contactPhone,
      contactEmail,
      locationText,
      city,
      postalCode,
      locationDetails,
      position, // contains { lat, lng }
      photoUrls,
      userId,
      username
    };
  

    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      await reportStrayAnimal(payload);
      setIsSubmitted(true);
    } catch (err) {
      setSubmissionError("Failed to submit the report. Please try again.");
      console.error("Error submitting report:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClearForm = () => {
    setPetPhotos([]);
    setPhotoURLs([]);
    setPosition(null);
    setLocationText('');
    setCity('');
    setPostalCode('');
    setLocationDetails('');
    setUseMap(false);
    setAnimalType('');
    setInjured(false);
    setStray(true);
    setMalnourished(false);
    setAdditionalDetails('');
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setAnimalStatus('');
    setActionRequired('');
    setErrors({});
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="success-container">
      <div className="success-icon">✓</div>
      <h2>Report Submitted Successfully!</h2>
      <p>Thank you for helping animals in need. Your report has been received and will be processed by our rescue team.</p>
      
      <div className="success-actions">
        <button 
          type="button" 
          className="primary-button"
          onClick={() => navigate('/rescue')}
        >
          Return to Rescue Page
        </button>
        <button 
          type="button" 
          className="secondary-button"
          onClick={() => {
            handleClearForm();
            setIsSubmitted(false);
          }}
        >
          Report Another Animal
        </button>
      </div>
    </div>
  );

  // Return the form or success message based on submission state
  return (
    <div className="stray-report-container">
      {isSubmitting && (
        <div className="overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Submitting your report...</p>
          </div>
        </div>
      )}
      
      {isSubmitted ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Report a Stray Animal</h2>
              <button
                type="button"
                className="close-button"
                onClick={() => navigate(-1)} // Go back to previous page
                aria-label="Close form"
              >
                ×
              </button>
            </div>
            
            <p className="form-subtitle">Help us rescue animals in need by providing details below</p>

            {submissionError && (
              <div className="error-banner">
                <p>{submissionError}</p>
                <button 
                  type="button" 
                  className="error-close" 
                  onClick={() => setSubmissionError(null)}
                >
                  ×
                </button>
              </div>
            )}
            
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
                  {photoUrls.length > 0 ? (
                    <div className="photo-preview-container">
                      {photoUrls.map((url, index) => (
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
                      {photoUrls.length < 3 && (
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

            {/* Location */}
            <div className="form-group">
              <label className="label">Location</label>
              <div className="gender-group">
                <button
                  type="button"
                  className={`gender-button ${!useMap ? "active" : ""}`}
                  onClick={() => setUseMap(false)}
                >
                  Enter Address
                </button>
                <button
                  type="button"
                  className={`gender-button ${useMap ? "active" : ""}`}
                  onClick={() => setUseMap(true)}
                >
                  Use Map
                </button>
              </div>

              {!useMap ? (
                <div>
                  <input
                    type="text"
                    className="input"
                    placeholder="Street Address"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    style={{ marginTop: '10px' }}
                  />
                  <div className="input-group" style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder="City"
                      className="input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="input"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <textarea
                    placeholder="Additional location details (landmarks, directions, etc.)"
                    className="textarea"
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    style={{ marginTop: '10px' }}
                  ></textarea>
                </div>
              ) : (
                <LocationPicker position={position} setPosition={setPosition} />
              )}
              {errors.location && <p className="error-message">{errors.location}</p>}
              {errors.map && <p className="error-message">{errors.map}</p>}
            </div>

            {/* Animal Type */}
            <div className="form-group">
              <label className="label" htmlFor="animal-type">
                Animal Type
              </label>
              <select
                id="animal-type"
                className="input"
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
              {errors.animalType && <p className="error-message">{errors.animalType}</p>}
            </div>

            {/* Condition */}
            <div className="form-group">
              <label className="label">Condition</label>
              <div className="gender-group">
                <button
                  type="button"
                  className={`gender-button ${injured ? "active" : ""}`}
                  onClick={toggleInjured}
                >
                  Injured
                </button>
                <button
                  type="button"
                  className={`gender-button ${stray ? "active" : ""}`}
                  onClick={toggleStray}
                >
                  Stray
                </button>
                <button
                  type="button"
                  className={`gender-button ${malnourished ? "active" : ""}`}
                  onClick={toggleMalnourished}
                >
                  Malnourished
                </button>
              </div>
            </div>

            {/* Additional Details */}
            <div className="form-group">
              <label className="label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="textarea"
                placeholder="Describe the animal's appearance, behavior, and other details that might help in the rescue..."
                value={description}
                onChange={(e) => setAdditionalDetails(e.target.value)}
              />
              {errors.additionalDetails && <p className="error-message">{errors.additionalDetails}</p>}
            </div>

            {/* Animal Status */}
            <div className="form-group">
              <label className="label">Does the animal appear to be lost or abandoned?</label>
              <div className="gender-group">
                <button
                  type="button"
                  className={`gender-button ${animalStatus === "lost" ? "active" : ""}`}
                  onClick={() => setAnimalStatus("lost")}
                >
                  Lost (Has collar/looks cared for)
                </button>
                <button
                  type="button"
                  className={`gender-button ${animalStatus === "abandoned" ? "active" : ""}`}
                  onClick={() => setAnimalStatus("abandoned")}
                >
                  Abandoned (Appears neglected)
                </button>
              </div>
              {errors.animalStatus && <p className="error-message">{errors.animalStatus}</p>}
            </div>

            {/* Action Required */}
            <div className="form-group">
              <label className="label">Action Required</label>
              <div className="gender-group">
                <button
                  type="button"
                  className={`gender-button ${actionRequired === "rescue" ? "active" : ""}`}
                  onClick={() => setActionRequired("rescue")}
                >
                  Rescue Needed Urgently
                </button>
                <button
                  type="button"
                  className={`gender-button ${actionRequired === "awareness" ? "active" : ""}`}
                  onClick={() => setActionRequired("awareness")}
                >
                  Just Reporting for Awareness
                </button>
                <button
                  type="button"
                  className={`gender-button ${actionRequired === "medical" ? "active" : ""}`}
                  onClick={() => setActionRequired("medical")}
                >
                  Needs Medical Help
                </button>
              </div>
              {errors.actionRequired && <p className="error-message">{errors.actionRequired}</p>}
            </div>

            {/* Contact Information */}
            <div className="form-group">
              <label className="label" htmlFor="contact-name">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                className="input"
                placeholder="Enter your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              {errors.contactName && <p className="error-message">{errors.contactName}</p>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="contact-phone">
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                className="input"
                placeholder="Enter your phone number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              {errors.contactPhone && <p className="error-message">{errors.contactPhone}</p>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                className="input"
                placeholder="Enter your email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              {errors.contactEmail && <p className="error-message">{errors.contactEmail}</p>}
            </div>

            {/* Add this at the bottom before the submit/clear buttons */}
            <div className="form-navigation">
              <button 
                type="button" 
                className="back-button"
                onClick={() => navigate('/rescue')}
              >
                Back to Rescue Page
              </button>
            </div>
            
            {/* Submit & Clear Buttons */}
            <div className="button-group">
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                Submit Report
              </button>
              <button
                type="button"
                className="clear-button"
                onClick={handleClearForm}
                disabled={isSubmitting}
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportStrayPetForm;