import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUser, FaCamera, FaKey, FaCheck, FaTimes, FaSpinner, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './MyProfile.css';
import userProfileImage from '../../../assets/images/userprofile.png';

// Fallback user data for when user prop is incomplete
const fallbackUser = {
  id: "default",
  firstName: "User",
  lastName: "Name",
  email: "user@example.com",
  phoneNumber: "",
  accountType: "Individual",
  location: "",
  bio: "",
  profilePicture: "",
  createdAt: new Date().toISOString()
};

interface MyProfileProps {
  user: any; // Changed to 'any' to handle possible undefined fields
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
  // Merge provided user data with fallback values to ensure all required fields exist
  const safeUser = {
    ...fallbackUser,
    ...user,
    // Ensure nested properties exist
    firstName: user?.firstName || fallbackUser.firstName,
    lastName: user?.lastName || fallbackUser.lastName,
    email: user?.email || fallbackUser.email,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: safeUser.firstName,
    lastName: safeUser.lastName,
    phoneNumber: safeUser.phoneNumber || '',
    location: safeUser.location || '',
    bio: safeUser.bio || '',
    profilePicture: userProfileImage
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // Clean up object URL when component unmounts or when a new file is selected
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      
      // Create and set preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  
  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (profileData.phoneNumber && !/^\+?[\d\s()-]{10,15}$/.test(profileData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Here you would normally upload the image and save profile data
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancelEdit = () => {
    // Reset form data
    setProfileData({
      firstName: safeUser.firstName,
      lastName: safeUser.lastName,
      phoneNumber: safeUser.phoneNumber || '',
      location: safeUser.location || '',
      bio: safeUser.bio || '',
      profilePicture: userProfileImage
    });
    
    // Clear any selected image and preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedImage(null);
    
    // Clear errors and exit edit mode
    setErrors({});
    setIsEditing(false);
  };
  
  const handleCancelPasswordChange = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsChangingPassword(false);
  };
  
  // Calculate member since date
  const memberSince = safeUser.createdAt 
    ? new Date(safeUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'N/A';
  
  return (
    <div className="profile-section">
      {!isEditing && !isChangingPassword ? (
        <div className="profile-view">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {profileData.profilePicture || previewUrl ? (
                  <img 
                    src={previewUrl || profileData.profilePicture}
                    alt={`${profileData.firstName} ${profileData.lastName}`}
                    className="avatar-img"
                  />
                ) : (
                  <img src={userProfileImage} alt="Default Profile" className="default-avatar" />
                )}
              </div>
            </div>
            
            <div className="profile-actions">
              <button 
                className="profile-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button 
                className="profile-password-btn"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            </div>
          </div>
          
          <div className="profile-info-container">
            <div className="profile-main-info">
              <h2>{profileData.firstName} {profileData.lastName}</h2>
              <span className="profile-type">{safeUser.accountType}</span>
              <p className="member-since">Member since {memberSince}</p>
            </div>
            
            <div className="profile-details">
              {safeUser.location && (
                <div className="profile-detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <p>{safeUser.location}</p>
                </div>
              )}
              
              <div className="profile-detail-item">
                <FaEnvelope className="detail-icon" />
                <p>{safeUser.email}</p>
              </div>
              
              {safeUser.phoneNumber && (
                <div className="profile-detail-item">
                  <FaPhone className="detail-icon" />
                  <p>{safeUser.phoneNumber}</p>
                </div>
              )}
            </div>
            
            {safeUser.bio && (
              <div className="profile-bio">
                <h3>About</h3>
                <p>{safeUser.bio}</p>
              </div>
            )}
          </div>
        </div>
      ) : isEditing ? (
        <div className="profile-form-container">
          <h2 className="form-title">Edit Profile</h2>
          
          <div className="profile-edit-content">
            <div className="profile-image-upload">
              <div className="profile-avatar-edit">
                {previewUrl || profileData.profilePicture ? (
                  <img 
                    src={previewUrl || profileData.profilePicture} 
                    alt="Profile Preview" 
                    className="avatar-preview" 
                  />
                ) : (
                  <div className="default-avatar-large"><FaUser /></div>
                )}
                <label htmlFor="profile-image" className="image-upload-label">
                  <FaCamera />
                  <span>Change Photo</span>
                </label>
                <input 
                  type="file"
                  id="profile-image"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/gif"
                  className="image-input"
                />
              </div>
            </div>
            
            <form className="profile-form" onSubmit={handleProfileSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                  />
                  {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                  />
                  {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={safeUser.email}
                    className="form-input disabled"
                    disabled
                  />
                  <p className="help-text">Email cannot be changed</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="City, State"
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell us about yourself or your organization..."
                  rows={4}
                />
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <FaSpinner className="spinner-icon" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="profile-form-container">
          <h2 className="form-title">Change Password</h2>
          
          <form className="profile-form password-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group full-width">
              <label htmlFor="currentPassword">Current Password</label>
              <input 
                type="password" 
                id="currentPassword" 
                name="currentPassword" 
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={`form-input ${errors.currentPassword ? 'input-error' : ''}`}
              />
              {errors.currentPassword && <p className="error-text">{errors.currentPassword}</p>}
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="newPassword">New Password</label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`form-input ${errors.newPassword ? 'input-error' : ''}`}
              />
              {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
              <p className="help-text">Password must be at least 8 characters</p>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancelPasswordChange}
                disabled={isSaving}
              >
                <FaTimes /> Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="spinner-icon" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaKey />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProfile;