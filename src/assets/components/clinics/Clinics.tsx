import React, { useState, useEffect } from 'react';
import './Clinics.css';
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaGlobe, FaStethoscope } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiFilterLine, RiFilter3Line } from 'react-icons/ri';
import { BsSortDownAlt } from 'react-icons/bs';
import { MdDirections } from 'react-icons/md';
import { IoWarning } from 'react-icons/io5';
import { HiPhone } from 'react-icons/hi';

interface Clinic {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  services: string[];
  imageUrl: string;
  rating: number;
  reviews: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string; // Added for direct map embed URL
}

const Clinics: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(true);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      // Real clinic data with embedded map links
      const data: Clinic[] = [
        {
          id: 1,
          name: "PetVet Clinic",
          address: "98, 4 Havelock Rd",
          city: "Colombo 00500, Sri Lanka",
          phone: "0777738838",
          email: "info@petvet.com",
          website: "https://www.petvet.com",
          hours: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm",
          services: ["General Checkups", "Vaccinations", "Surgery", "Dental Care", "Pet Grooming"],
          imageUrl: "src/assets/images/welnesssrc/images.jpg",
          rating: 4.1,
          reviews: 643,
          coordinates: { lat: 6.9014, lng: 79.8617 },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9676019451385!2d79.85771267448263!3d6.894478718742173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bd53f89af1b%3A0xdaacded9384ef910!2sPetVet%20Clinic!5e0!3m2!1sen!2slk!4v1747742722772!5m2!1sen!2slk" 
        },
        {
          id: 2,
          name: "Uni-Vet Animal Hospital",
          address: "Ratnapura - Horana - Panadura Hwy",
          city: "Panadura, Sri Lanka",
          phone: "0777738839",
          email: "care@univet.com",
          website: "https://www.univet.com",
          hours: "Mon-Sat: 7am-7pm, Sun: 10am-4pm",
          services: ["General Checkups", "Dental Care", "Pet Nutrition", "Emergency Care", "Pet Boarding"],
          imageUrl: "src/assets/images/welnesssrc/univet.jpg",
          rating: 4.3,
          reviews: 424,
          coordinates: { lat: 6.7139, lng: 79.9080 },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5185478582875!2d79.95684527448155!3d6.706385721012104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae248e147627075%3A0xa16f92cf1a7f03fb!2sUni-Vet%20Animal%20Hospital!5e0!3m2!1sen!2slk!4v1747743060809!5m2!1sen!2slk"
        },
        {
          id: 3,
          name: "Veterinary Hospital",
          address: "7H8X+WR6 Animal Clinic",
          city: "Getambe, Sri Lanka",
          phone: "0777738840",
          email: "hello@vethospital.com",
          website: "https://www.vethospital.com",
          hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
          services: ["Emergency Care", "Surgery", "Vaccinations", "Pet Rehabilitation", "Specialist Consultations"],
          imageUrl: "src/assets/images/welnesssrc/getambe.jpg",
          rating: 3.7,
          reviews: 40,
          coordinates: { lat: 7.2671, lng: 80.5974 },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.902123456789!2d80.5950123!3d7.2670999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d1cb424a7%3A0x1b0c45a0e4f6c8a1!2sVeterinary%20Hospital!5e0!3m2!1sen!2slk!4v1647881234567!5m2!1sen!2slk"
        },
        {
          id: 4,
          name: "PetsVcare Animal Hospitals",
          address: "506/7 Elvitigala Mawatha",  
          city: "Colombo 5",
          phone: "0773457238",
          email: "petsvcare@gmail.com",
          website: "https://petsvcare.lk/",
          hours: "Mon-Fri: 8am-7pm, Sat: 9am-3pm",
          services: ["Emergency Care", "Orthopedic Surgery", "Cardiology", "Internal Medicine", "Radiology"],
          imageUrl: "src/assets/images/welnesssrc/new-pesvcare-hospital-narahenpita.jpg",
          rating: 4.2,
          reviews: 882,
          coordinates: { lat: 30.2672, lng: -97.7431 },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9730184034247!2d79.87429817448266!3d6.893830718750113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25914d29f535d%3A0x1fa9d21b23109656!2sPetsVcare%20Animal%20Hospitals!5e0!3m2!1sen!2slk!4v1747742826815!5m2!1sen!2slk" 
        },
        {
          id: 5,
          name: "Dr.Pet Hospital",
          address: "Matara Rd",
          city: "Galle 80000",
          phone: "0912234907",
          email: "info@healinghandsvet.com",
          website: "https://www.healinghandsvet.com",
          hours: "Mon-Sat: 8am-8pm, Sun: Emergency Only",
          services: ["Preventive Care", "Dental Care", "Surgery", "Vaccinations", "Exotic Pet Care"],
          imageUrl: "src/assets/images/welnesssrc/drgalle.jpg",
          rating: 4.4,
          reviews: 214,
          coordinates: { lat: 47.6062, lng: -122.3321 },
          mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31741.678852990586!2d80.20783327284903!3d6.034497341046905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173ef42e5a7cb%3A0xfa6804d60be15263!2sDr.Pet%20Hospital!5e0!3m2!1sen!2slk!4v1747742122929!5m2!1sen!2slk"
        }
      ];
      
      setClinics(data);
      if (data.length > 0) {
        setSelectedClinic(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort the clinics
  const filteredClinics = clinics
    .filter(clinic => 
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      clinic.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(clinic => 
      filterService === '' || 
      clinic.services.some(service => service.toLowerCase().includes(filterService.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return a.name.localeCompare(b.name); // default sort by name
    });

  // Get unique services for filter dropdown
  const allServices = Array.from(
    new Set(clinics.flatMap(clinic => clinic.services))
  ).sort();

  // Handle click on a clinic in the list
  const handleClinicClick = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    
    // Scroll to the clinic in the list on mobile
    if (window.innerWidth < 768) {
      const detailsElement = document.getElementById('clinic-details');
      if (detailsElement) {
        detailsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Generate directions URL
  const getDirectionsUrl = (clinic: Clinic) => {
    const encodedAddress = encodeURIComponent(`${clinic.name}, ${clinic.address}, ${clinic.city}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  // Format rating stars with icons
  const formatRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="star-icon filled" />);
    }
    
    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<AiFillStar key="half" className="star-icon half-filled" />);
    }
    
    // Add empty stars
    const emptyStarsCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} className="star-icon empty" />);
    }
    
    return <div className="stars-container">{stars}</div>;
  };

  return (
    <div className="pf-clinics-container">
      {/* Hero Section */}
      <section className="pf-clinics-hero">
        <div className="pf-hero-content">
          <h1>Find Veterinary Clinics</h1>
          <p>Discover trusted veterinary clinics providing exceptional care for your beloved pets</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pf-search-filter">
        <div className="pf-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by clinic name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="pf-filters">
          <div className="pf-filter-group">
            <label htmlFor="service-filter">
              <RiFilterLine className="filter-icon" /> Filter by service:
            </label>
            <select
              id="service-filter"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            >
              <option value="">All Services</option>
              {allServices.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div className="pf-filter-group">
            <label htmlFor="sort-by">
              <BsSortDownAlt className="sort-icon" /> Sort by:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Clinic Name</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content with Clinics List and Details */}
      <section className="pf-clinics-main">
        {loading ? (
          <div className="pf-loading">
            <div className="loading-spinner">
              <span>Loading clinics...</span>
            </div>
          </div>
        ) : error ? (
          <div className="pf-error-message">
            <IoWarning className="error-icon" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="pf-clinics-layout">
            {/* Left Side - Clinics List */}
            <div className="pf-clinics-list">
              <h2>Available Clinics</h2>
              {filteredClinics.length === 0 ? (
                <div className="pf-no-results">
                  <RiFilter3Line className="no-results-icon" />
                  <p>No clinics found matching your criteria</p>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="pf-clinics-cards">
                  {filteredClinics.map((clinic) => (
                    <div 
                      key={clinic.id}
                      className={`pf-clinic-list-card ${selectedClinic?.id === clinic.id ? 'pf-selected' : ''}`}
                      onClick={() => handleClinicClick(clinic)}
                    >
                      <div className="pf-clinic-card-image">
                        <img src={clinic.imageUrl} alt={clinic.name} />
                      </div>
                      <div className="pf-clinic-card-content">
                        <h3>{clinic.name}</h3>
                        <p className="pf-clinic-address">
                          <FaMapMarkerAlt className="location-icon" />
                          {clinic.address}, {clinic.city}
                        </p>
                        
                        <div className="pf-clinic-rating-small">
                          {formatRating(clinic.rating)}
                          <span className="rating-value">{clinic.rating.toFixed(1)}</span>
                          <span className="pf-reviews-count">({clinic.reviews} reviews)</span>
                        </div>
                        
                        <div className="pf-clinic-services-tags">
                          {clinic.services.map((service, index) => (
                            index < 3 && <span key={index} className="pf-service-tag">{service}</span>
                          ))}
                          {clinic.services.length > 3 && (
                            <span className="pf-more-tag">+{clinic.services.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Selected Clinic Details */}
            {selectedClinic && (
              <div id="clinic-details" className="pf-clinic-details">
                <div className="pf-clinic-details-card">
                  <h2 className="pf-clinic-name">{selectedClinic.name}</h2>
                  
                  <div className="pf-clinic-map">
                    {isMapVisible && (
                      <iframe
                        title={`Map of ${selectedClinic.name}`}
                        width="100%"
                        height="250"
                        frameBorder="0"
                        src={selectedClinic.mapEmbedUrl}
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>

                  <div className="pf-clinic-info">
                    <div className="pf-clinic-rating">
                      {formatRating(selectedClinic.rating)}
                      <span className="pf-rating-number">{selectedClinic.rating.toFixed(1)}</span>
                      <span className="pf-reviews-count">({selectedClinic.reviews} reviews)</span>
                    </div>
                    
                    <div className="pf-clinic-location">
                      <div className="pf-info-label">
                        <FaMapMarkerAlt className="info-icon location-icon" />
                        <span className="pf-label-text">Address</span>
                      </div>
                      <p>{selectedClinic.address}, {selectedClinic.city}</p>
                    </div>
                    
                    <div className="pf-clinic-phone">
                      <div className="pf-info-label">
                        <FaPhoneAlt className="info-icon phone-icon" />
                        <span className="pf-label-text">Phone</span>
                      </div>
                      <p>{selectedClinic.phone}</p>
                    </div>
                    
                    <div className="pf-clinic-hours">
                      <div className="pf-info-label">
                        <FaClock className="info-icon hours-icon" />
                        <span className="pf-label-text">Hours</span>
                      </div>
                      <p>{selectedClinic.hours}</p>
                    </div>
                    
                    {selectedClinic.website && (
                      <div className="pf-clinic-website">
                        <div className="pf-info-label">
                          <FaGlobe className="info-icon website-icon" />
                          <span className="pf-label-text">Website</span>
                        </div>
                        <a href={selectedClinic.website} target="_blank" rel="noopener noreferrer">
                          {selectedClinic.website}
                        </a>
                      </div>
                    )}
                    
                    <div className="pf-clinic-services">
                      <div className="pf-info-label">
                        <FaStethoscope className="info-icon services-icon" />
                        <span className="pf-label-text">Services</span>
                      </div>
                      <div className="pf-services-list">
                        {selectedClinic.services.map((service, index) => (
                          <span key={index} className="pf-service-tag">{service}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pf-clinic-actions">
                      <a href={`tel:${selectedClinic.phone}`} className="pf-btn pf-btn-call">
                        <HiPhone className="btn-icon" /> Call Now
                      </a>
                      <a 
                        href={getDirectionsUrl(selectedClinic)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="pf-btn pf-btn-directions"
                      >
                        <MdDirections className="btn-icon" /> Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Emergency Services Banner */}
      <section className="pf-emergency-banner">
        <div className="pf-emergency-content">
          <div className="pf-emergency-icon">
            <IoWarning className="emergency-icon" />
          </div>
          <div className="pf-emergency-text">
            <h3>Pet Emergency?</h3>
            <p>Some clinics offer 24/7 emergency services. Find emergency care near you.</p>
          </div>
          <a href="/emergency-clinics" className="pf-btn-emergency">Find Emergency Care</a>
        </div>
      </section>
    </div>
  );
};

export default Clinics;