import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./ReportMissingPetForm.css";
import { reportMissingPet } from '../../../service/ReportMissingPetService';
import { useNavigate } from 'react-router-dom';

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

// Add this function to provide real-time validation for email fields
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Add this function to validate phone numbers as the user types
const validatePhoneNumber = (phone: string): boolean => {
  return /^\d{10,15}$/.test(phone.replace(/[\s-]/g, ''));
};

const ReportMissingPetForm: React.FC = () => {
  // State for form data
  const [petName, setPetName] = useState('');
  const [petPhotos, setPetPhotos] = useState<File[]>([]);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState('Years');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [contactPreference, setContactPreference] = useState('');
  
  // Additional fields
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationText, setLocationText] = useState('');
  const [city, setCity] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [useMap, setUseMap] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [offerReward, setOfferReward] = useState<boolean | null>(null);
  const [rewardAmount, setRewardAmount] = useState('');
  
  // Add these new state variables for last seen date and time
  const [lastSeenDate, setLastSeenDate] = useState('');
  const [lastSeenTime, setLastSeenTime] = useState('');
  
  // State for validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewCard, setPreviewCard] = useState(false);

  // Add new state variables for submission and navigation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      photoURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 3 - petPhotos.length); // Allow only 3 images
      const newErrors = { ...errors };
      delete newErrors.petPhotos; // Clear previous errors

      // Validate file size and type
      for (const file of newPhotos) {
        if (file.size > 5 * 1024 * 1024) {
          newErrors.petPhotos = "File size must be less than 5MB";
          break;
        } else if (!file.type.match(/^image\/(jpeg|jpg|png|gif|bmp|webp)$/)) {
          newErrors.petPhotos = "Only image files (JPG, PNG, GIF) are allowed";
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
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(photoURLs[index]);
    setPhotoURLs(current => current.filter((_, i) => i !== index));
  };
  
  // Enhance the validateForm function to better handle errors
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let firstErrorElement: HTMLElement | null = null;
    
    // Required fields validation
    if (petPhotos.length === 0) {
      newErrors.petPhotos = "Please upload at least one photo of your pet";
      if (!firstErrorElement) firstErrorElement = document.getElementById('petPhotos');
    }
    if (!petName) {
      newErrors.petName = "Pet name is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('petName');
    }
    if (!petType) {
      newErrors.petType = "Pet type is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('petType');
    }
    if (!breed) {
      newErrors.breed = "Breed is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('breed');
    }
    if (!age) {
      newErrors.age = "Age is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('age');
    }
    if (!gender) {
      newErrors.gender = "Gender is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('gender');
    }
    if (!useMap && !locationText) {
      newErrors.location = "Last seen location is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('location');
    }
    if (useMap && !position) {
      newErrors.map = "Please select a location on the map";
      if (!firstErrorElement) firstErrorElement = document.getElementById('location');
    }
    if (!ownerName) {
      newErrors.ownerName = "Owner name is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('ownerName');
    }
    
    // Contact details validation - at least one is required
    if (!phoneNumber && !email) {
      newErrors.contact = "At least one contact method is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('contactInfo');
    }
    
    // Phone number validation if provided
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      if (!firstErrorElement) firstErrorElement = document.getElementById('contactInfo');
    }
    
    // Email validation if provided
    if (email && !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      if (!firstErrorElement) firstErrorElement = document.getElementById('contactInfo');
    }
    
    // Contact preference validation
    if (!contactPreference) {
      newErrors.contactPreference = "Please select a contact preference";
      if (!firstErrorElement) firstErrorElement = document.getElementById('contactPreference');
    }
    
    // Reward validation
    if (offerReward === null) {
      newErrors.offerReward = "Please specify if a reward is offered";
      if (!firstErrorElement) firstErrorElement = document.getElementById('reward');
    } else if (offerReward === true && !rewardAmount) {
      newErrors.rewardAmount = "Please enter a reward amount";
      if (!firstErrorElement) firstErrorElement = document.getElementById('reward');
    }

    // Last seen date validation
    if (!lastSeenDate) {
      newErrors.lastSeenDate = "Last seen date is required";
      if (!firstErrorElement) firstErrorElement = document.getElementById('lastSeenDateTime');
    }
    
    setErrors(newErrors);
    
    // Scroll to first error field
    if (firstErrorElement) {
      setTimeout(() => {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return false;
    }
    
    return true;
  };

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

  // Modify handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null); // Reset submission error
    
    if (validateForm()) {
      setIsSubmitting(true); 
      
      // Form data for submission
      const formData = {
        petName,
        petType,
        breed,
        age: parseInt(age),
        ageUnit,
        gender,
        description,
        location_coordinates: useMap ? JSON.stringify(position) : null,
        location_address: useMap ? null : locationText,
        location_city: useMap ? null : city,
        location_details: locationDetails,
        userId,
        username,
        ownerName,
        phoneNumber,
        email,
        contactPreference,
        offerReward,
        rewardAmount: offerReward ? parseFloat(rewardAmount) : null,
        photoURLs,
        lastSeenDate,
        lastSeenTime
      };

      try {
        await reportMissingPet(formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setPreviewCard(false); // Start with success message, not preview
      } catch (err) {
        setIsSubmitting(false);
        console.error("Error submitting report:", err);
        setSubmissionError("Failed to submit your report. Please try again or contact support if the problem persists.");
        
        // Scroll to top to show the error banner
        formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleClearForm = () => {
    // Clear all form fields
    setPetName('');
    setPetType('');
    setBreed('');
    setAge('');
    setAgeUnit('Years');
    setGender('');
    setDescription('');
    setContactPreference('');
    setPosition(null);
    setLocationText('');
    setCity('');
    setLocationDetails('');
    setUseMap(false);
    setOwnerName('');
    setPhoneNumber('');
    setEmail('');
    setOfferReward(null);
    setRewardAmount('');
    setLastSeenDate('');
    setLastSeenTime('');
    
    // Clean up photo URLs and reset photos
    photoURLs.forEach(url => URL.revokeObjectURL(url));
    setPetPhotos([]);
    setPhotoURLs([]);
    
    // Reset errors and form state
    setErrors({});
    setPreviewCard(false);
    setIsSubmitted(false);
  };
  
  // Missing Pet Card Preview Component
  const MissingPetCard = () => {
    return (
      <div className="missing-pet-card">
        <div className="missing-pet-card-header">
          <h3>MISSING PET</h3>
          {offerReward && <div className="reward-badge">REWARD: ${rewardAmount}</div>}
        </div>
        
        <div className="missing-pet-card-content">
          <div className="missing-pet-photo">
            {photoURLs.length > 0 && (
              <img src={photoURLs[0]} alt={`${petName} - Missing Pet`} />
            )}
          </div>
          
          <div className="missing-pet-details">
            <h4>{petName}</h4>
            <p><strong>Type:</strong> {petType}</p>
            <p><strong>Breed:</strong> {breed}</p>
            <p><strong>Age:</strong> {age} {ageUnit}</p>
            <p><strong>Gender:</strong> {gender}</p>
            
            <p>
              <strong>Last Seen:</strong> {useMap ? 'See map location' : `${locationText}, ${city}`}
              {lastSeenDate && ` on ${new Date(lastSeenDate).toLocaleDateString()}`}
              {lastSeenTime && ` at ${lastSeenTime}`}
            </p>
            {locationDetails && <p><strong>Location Details:</strong> {locationDetails}</p>}
            
            <div className="contact-section">
              <h5>Contact Information</h5>
              <p><strong>Owner:</strong> {ownerName}</p>
              {phoneNumber && <p><strong>Phone:</strong> {phoneNumber}</p>}
              {email && <p><strong>Email:</strong> {email}</p>}
              {offerReward && rewardAmount && (
                <p><strong>Reward:</strong> ${rewardAmount}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success Confirmation Component
  const SuccessConfirmation = () => {
    return (
      <div className="success-confirmation">
        <div className="success-icon">✓</div>
        <h2>Report Submitted Successfully!</h2>
        <p>Your missing pet report has been submitted and is pending admin approval.</p>
        <p>Once approved, it will be visible to the community.</p>
        <p className="status-note">You'll receive a notification when your report is approved.</p>
        
        <div className="confirmation-actions">
          <button 
            className="preview-button"
            onClick={() => setPreviewCard(true)}
          >
            View Report
          </button>
          <button 
            className="home-button"
            onClick={() => navigate("/rescue")}
          >
            Return to Rescue Page
          </button>
          <button 
            className="new-report-button"
            onClick={handleClearForm}
          >
            Report Another Pet
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isSubmitting && (
        <div className="form-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Submitting your report...</p>
          </div>
        </div>
      )}
      
      {!isSubmitted ? (
        <div className="form-wrapper" ref={formContainerRef}>
          {submissionError && (
            <div className="error-banner">
              <div className="error-icon">!</div>
              <p>{submissionError}</p>
              <button 
                onClick={() => setSubmissionError(null)}
                className="close-error"
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 className="form-title">Report a Missing Pet</h2>
              <button 
                type="button" 
                className="back-button"
                onClick={() => navigate('/rescue')}
              >
                <span className="back-icon">←</span> Back to Rescue
              </button>
            </div>
          <div className="form-container" id="petPhotos">
            <p className="form-subtitle">
              We'll help you to find your loving furry friend
            </p>

            {/* Pet Photo Upload */}
            <div className="form-group">
              <label className="label">Pet Photo</label>
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
            <div className="form-group" id="petName">
              <label className="label" htmlFor="pet-name">Pet Name</label>
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
            <div className="form-group" id="petType">
              <label className="label" htmlFor="pet-type">Pet Type</label>
              <select 
                id="pet-type" 
                className="input"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
              {errors.petType && <p className="error-message">{errors.petType}</p>}
            </div>

            {/* Breed */}
            <div className="form-group" id="breed">
              <label className="label" htmlFor="breed">Breed</label>
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
            <div className="form-group" id="age">
              <label className="label" htmlFor="age">Age</label>
              <div className="input-group">
                <input 
                  id="age" 
                  type="number" 
                  className="input" 
                  placeholder="Age" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
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
            <div className="form-group" id="gender">
              <label className="label">Gender</label>
              <div className="gender-group">
                <button 
                  type="button" 
                  className={`gender-button ${gender === 'Male' ? 'active' : ''}`}
                  onClick={() => setGender('Male')}
                >
                  Male
                </button>
                <button 
                  type="button" 
                  className={`gender-button ${gender === 'Female' ? 'active' : ''}`}
                  onClick={() => setGender('Female')}
                >
                  Female
                </button>
              </div>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            {/* Last Seen Location */}
            <div className="form-group" id="location">
              <label className="label">Last Seen Location</label>
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
                    placeholder="Enter street address where pet was last seen"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    style={{ marginTop: '10px' }}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ marginTop: '10px' }}
                  />
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

            {/* Last Seen Date and Time */}
            <div className="form-group" id="lastSeenDateTime">
              <label className="label">When Was Your Pet Last Seen?</label>
              <div className="input-group">
                <div className="date-time-input">
                  <label className="sub-label" htmlFor="last-seen-date">Date</label>
                  <input 
                    id="last-seen-date" 
                    type="date" 
                    className="input" 
                    value={lastSeenDate}
                    onChange={(e) => setLastSeenDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  />
                  {errors.lastSeenDate && <p className="error-message">{errors.lastSeenDate}</p>}
                </div>
                
                <div className="date-time-input">
                  <label className="sub-label" htmlFor="last-seen-time">Time (Approximate)</label>
                  <input 
                    id="last-seen-time" 
                    type="time" 
                    className="input" 
                    value={lastSeenTime}
                    onChange={(e) => setLastSeenTime(e.target.value)}
                  />
                  {errors.lastSeenTime && <p className="error-message">{errors.lastSeenTime}</p>}
                </div>
              </div>
            </div>

            {/* Owner's Name */}
            <div className="form-group" id="ownerName">
              <label className="label" htmlFor="owner-name">
                Owner's Name
              </label>
              <input 
                id="owner-name" 
                type="text" 
                className="input" 
                placeholder="Enter your name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              {errors.ownerName && <p className="error-message">{errors.ownerName}</p>}
            </div>

            {/* Contact Information */}
            <div className="form-group" id="contactInfo">
              <label className="label" htmlFor="phone-number">
                Phone Number
              </label>
              <input 
                id="phone-number" 
                type="tel" 
                className={`input ${phoneNumber && !validatePhoneNumber(phoneNumber) ? 'input-error' : ''}`}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber && validatePhoneNumber(e.target.value)) {
                    setErrors({...errors, phoneNumber: ''});
                  }
                }}
              />
              {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
              
              <label className="label" htmlFor="email" style={{ marginTop: '15px' }}>
                Email Address
              </label>
              <input 
                id="email" 
                type="email" 
                className={`input ${email && !validateEmail(email) ? 'input-error' : ''}`}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email && validateEmail(e.target.value)) {
                    setErrors({...errors, email: ''});
                  }
                }}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {errors.contact && <p className="error-message">{errors.contact}</p>}
            </div>

            {/* Contact Preference */}
            <div className="form-group" id="contactPreference">
              <label className="label">Contact Preference</label>
              <div className="gender-group">
                <button 
                  type="button" 
                  className={`gender-button ${contactPreference === 'Email' ? 'active' : ''}`}
                  onClick={() => setContactPreference('Email')}
                >
                  Email
                </button>
                <button 
                  type="button" 
                  className={`gender-button ${contactPreference === 'Phone' ? 'active' : ''}`}
                  onClick={() => setContactPreference('Phone')}
                >
                  Phone
                </button>
                <button 
                  type="button" 
                  className={`gender-button ${contactPreference === 'Both' ? 'active' : ''}`}
                  onClick={() => setContactPreference('Both')}
                >
                  Both
                </button>
              </div>
              {errors.contactPreference && <p className="error-message">{errors.contactPreference}</p>}
            </div>

            {/* Reward Offered */}
            <div className="form-group" id="reward">
              <label className="label">Reward Offered?</label>
              <div className="gender-group">
                <button 
                  type="button" 
                  className={`gender-button ${offerReward === true ? 'active' : ''}`}
                  onClick={() => setOfferReward(true)}
                >
                  Yes
                </button>
                <button 
                  type="button" 
                  className={`gender-button ${offerReward === false ? 'active' : ''}`}
                  onClick={() => setOfferReward(false)}
                >
                  No
                </button>
              </div>
              {errors.offerReward && <p className="error-message">{errors.offerReward}</p>}
              
              {offerReward && (
                <div className="form-group" style={{ marginTop: '15px' }}>
                  <label className="label" htmlFor="reward-amount">
                    Reward Amount ($)
                  </label>
                  <input 
                    id="reward-amount" 
                    type="number" 
                    className="input" 
                    placeholder="Enter reward amount"
                    value={rewardAmount}
                    onChange={(e) => setRewardAmount(e.target.value)}
                    min="0"
                  />
                  {errors.rewardAmount && <p className="error-message">{errors.rewardAmount}</p>}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group" id="description">
              <label className="label" htmlFor="description-text">Description</label>
              <textarea 
                id="description-text" 
                className="textarea" 
                placeholder="Tell us about your pet, distinctive features, or anything that might help people recognize them"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit & Clear Buttons */}
            <div className="button-group">
              <button type="submit" className="submit-button">
                Submit Missing Pet Report
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
          </form>
        </div>
      ) : !previewCard ? (
        <SuccessConfirmation />
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <h2 className="form-title">Missing Pet Report Preview</h2>
            <button 
              type="button" 
              className="close-button"
              onClick={() => navigate("/rescue")}
              aria-label="Close preview"
            >
              ×
            </button>
          </div>
          
          <MissingPetCard />
          
          <div className="preview-actions">
            <p>This is how your missing pet report will appear in our rescue section.</p>
            <div className="button-group">
              <button 
                className="submit-button" 
                onClick={handleClearForm}
              >
                Create Another Report
              </button>
              <button 
                className="secondary-button" 
                onClick={() => navigate("/rescue")}
              >
                Return to Rescue Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportMissingPetForm;