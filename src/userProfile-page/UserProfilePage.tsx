import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserProfilePage.css';
import { FaUser, FaPaw, FaHeart, FaInbox, FaLifeRing, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import UserService from '../service/UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userProfileImage from '../assets/images/userprofile.png';

// Components for each section
import MyProfile from './sections/my-profile/MyProfile';
import AdoptionRequests from './sections/my-adoption-request/AdoptionRequests';
import MyListings from './sections/my-listings/MyListings';
import RequestsReceived from './sections/adoption-request-recieved/RequestsReceived';
import RescueSubmitted from './sections/rescue-reported/RescueSubmitted';
import MissingPetReports from './sections/my-missing-pet/MissingPetReports';

interface UserProfilePageProps {
  section?: string;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ section }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<ReturnType<typeof UserService.getCurrentUser> | null>(null);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if user is logged in
        const currentUser = UserService.getCurrentUser();
        const authStatus = localStorage.getItem('isAuthenticated');
        
        if (!currentUser || authStatus !== 'true') {
          toast.error('Please log in to access your profile');
          navigate('/');
          return;
        }
        
        setIsAuthenticated(true);
        setUser(currentUser);

        // Get section from URL path if not provided as prop
        const path = location.pathname.split('/').pop();
        if (path && ['profile', 'adoption-requests', 'listings', 'requests-received', 'rescue', 'missing'].includes(path)) {
          setActiveSection(path);
        } else if (section) {
          setActiveSection(section);
        }

        // Handle responsive design
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, [navigate, location.pathname, section]);

  const handleSectionChange = (sectionName: string) => {
    setActiveSection(sectionName);
    if (sectionName === 'profile') {
      navigate('/profile/my-profile');
    } else {
      navigate(`/profile/${sectionName}`);
    }
  };

  const handleLogout = () => {
    try {
      UserService.logoutUser();
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      toast.success('Logged out successfully');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  // Renders the active section component
  const renderSection = () => {
    if (!user) {
      // If no user data at all, show an error
      return (
        <div className="profile-error">
          <h3>Unable to load profile data</h3>
          <p>Please try refreshing the page or log in again.</p>
        </div>
      );
    }

    // For debugging - add these lines temporarily
    console.log("Current active section:", activeSection);
    console.log("User data:", user);

    switch (activeSection) {
      case 'profile':
        return <MyProfile user={user} />;
      case 'adoption-requests':
        return <AdoptionRequests />;
      case 'listings':
        return <MyListings />;
      case 'requests-received':
        return <RequestsReceived />;
      case 'rescue':
        return <RescueSubmitted />;
      case 'missing':
        return <MissingPetReports />;
      default:
        return <MyProfile user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {/* Sidebar for desktop / Tab navigation for mobile */}
      {isMobile ? (
        <div className="profile-tabs">
          <div className={`tab ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => handleSectionChange('profile')}>
            <FaUser /> <span>My Profile</span>
          </div>
          <div className={`tab ${activeSection === 'adoption-requests' ? 'active' : ''}`} onClick={() => handleSectionChange('adoption-requests')}>
            <FaHeart /> <span>Adoption Requests</span>
          </div>
          <div className={`tab ${activeSection === 'listings' ? 'active' : ''}`} onClick={() => handleSectionChange('listings')}>
            <FaPaw /> <span>My Listings</span>
          </div>
          <div className={`tab ${activeSection === 'requests-received' ? 'active' : ''}`} onClick={() => handleSectionChange('requests-received')}>
            <FaInbox /> <span>Requests Received</span>
          </div>
          <div className={`tab ${activeSection === 'rescue' ? 'active' : ''}`} onClick={() => handleSectionChange('rescue')}>
            <FaLifeRing /> <span>Rescue Reports</span>
          </div>
          <div className={`tab ${activeSection === 'missing' ? 'active' : ''}`} onClick={() => handleSectionChange('missing')}>
            <FaSearch /> <span>Missing Pets</span>
          </div>
        </div>
      ) : (
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              {user.profilePicture ? (
                // <img src={user.profilePicture} alt={user.firstName} />
                <img src={userProfileImage} alt="Default Profile" className="default-avatar" />
              ) : (
                <FaUser className="default-avatar" />
              )}
            </div>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.email}</p>
          </div>
          
          <div className="sidebar-nav">
            <div className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => handleSectionChange('profile')}>
              <FaUser /> <span>My Profile</span>
            </div>
            <div className={`nav-item ${activeSection === 'adoption-requests' ? 'active' : ''}`} onClick={() => handleSectionChange('adoption-requests')}>
              <FaHeart /> <span>My Adoption Requests</span>
            </div>
            <div className={`nav-item ${activeSection === 'listings' ? 'active' : ''}`} onClick={() => handleSectionChange('listings')}>
              <FaPaw /> <span>My Listings</span>
            </div>
            <div className={`nav-item ${activeSection === 'requests-received' ? 'active' : ''}`} onClick={() => handleSectionChange('requests-received')}>
              <FaInbox /> <span>Adoption Requests Received</span>
            </div>
            <div className={`nav-item ${activeSection === 'rescue' ? 'active' : ''}`} onClick={() => handleSectionChange('rescue')}>
              <FaLifeRing /> <span>Rescue Submitted</span>
            </div>
            <div className={`nav-item ${activeSection === 'missing' ? 'active' : ''}`} onClick={() => handleSectionChange('missing')}>
              <FaSearch /> <span>Missing Pet Reports</span>
            </div>
          </div>
          
          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <div className="profile-content">
        <div className="section-header">
          <h1>{activeSection === 'profile' ? 'My Profile' : 
              activeSection === 'adoption-requests' ? 'My Adoption Requests' :
              activeSection === 'listings' ? 'My Listings' :
              activeSection === 'requests-received' ? 'Adoption Requests Received' :
              activeSection === 'rescue' ? 'Rescue Submitted' : 'Missing Pet Reports'}</h1>
        </div>
        
        <div className="section-content">
          {renderSection()}
        </div>
        
        {/* Mobile only logout button */}
        {isMobile && (
          <button className="mobile-logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;