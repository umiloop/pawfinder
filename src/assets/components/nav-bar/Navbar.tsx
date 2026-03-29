import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import LoginPage from "../signup-login/LoginPage";
import { FaUserCircle, FaPaw, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check authentication status on load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setIsModalOpen(false);
  };

  const handleUserProfileClick = () => {
    navigate('/profile');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Section: Logo */}
          <div className="navbar-left">
            <div className="logo" onClick={() => navigate('/')}>
              <FaPaw className="logo-icon" />
              <span className="logo-text">PawFinder</span>
            </div>
          </div>
          
          {/* Center Section: Navigation Links */}
          <div className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`} ref={mobileMenuRef}>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/adopt" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  Adopt
                </NavLink>
              </li>
              <li>
                <NavLink to="/listpet" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  List a Pet
                </NavLink>
              </li>
              <li>
                <NavLink to="/rescue" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  Rescue
                </NavLink>
              </li>
              <li>
                <NavLink to="/donate" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  Donate
                </NavLink>
              </li>
              <li>
                <NavLink to="/health" className={({ isActive }) => isActive ? "active-link" : ""} onClick={closeMobileMenu}>
                  Health & Welness
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* Right Section: Search and Auth */}
          <div className="navbar-right">
            
            
            {isAuthenticated ? (
              <div className="user-profile">
                <FaUserCircle className="user-profile-icon" onClick={handleUserProfileClick} />
                {/* <div className="user-dropdown">
                  <NavLink to="/profile" className="dropdown-item" onClick={closeMobileMenu}>My Profile</NavLink>
                  <NavLink to="/favorites" className="dropdown-item" onClick={closeMobileMenu}>My Adoption Requests</NavLink>
                  <NavLink to="/applications" className="dropdown-item" onClick={closeMobileMenu}>My Listings</NavLink>
                  <NavLink to="/applications" className="dropdown-item" onClick={closeMobileMenu}>Adoption Requests Received</NavLink>
                  <NavLink to="/applications" className="dropdown-item" onClick={closeMobileMenu}>Rescue Submitted</NavLink>
                  <NavLink to="/applications" className="dropdown-item" onClick={closeMobileMenu}>Missing Pet Reports</NavLink>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </div> */}
              </div>
            ) : (
              <button className="login-btn" onClick={() => setIsModalOpen(true)}>
                Login / Sign Up
              </button>
            )}
            
            <button 
              className="menu-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;