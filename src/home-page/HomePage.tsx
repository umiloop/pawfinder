import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "../assets/components/pet-card/PetCard";
import { AdoptPetService } from "../service/AdoptPetService";
import "./HomePage.css";

// Images
import HeroImage from "../assets/images/herohome.jpg";
import AdoptPetPic from "../assets/adoptPet.png";
import RescuePetPic from "../assets/images/rescuePet.png";
import ListPetPic from "../assets/images/listPet.png";
import CarePic from "../assets/images/care.png";
import TrustPic from "../assets/images/trust.png";
import GuidePic from "../assets/images/gude.png";
import DonatePic from "../assets/images/volunteer-img/testpii.jpeg";

// Define the Pet type
interface Pet {
  petId: number;
  petName: string;
  petAge: string;
  petLocation: string;
  petAvailabilityStatus: string;
  petPicture: string;
  petBreed: string;
  petGender: string;
  contactPersonNumber: string;
  userId: number;
  userName: string;
  description: string;
  isShelterPet: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Pets");
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Counter state
  const [counters, setCounters] = useState({
    adopted: 0,
    rescued: 0,
    volunteerHours: 0,
    shelters: 0
  });
  
  // Timer references to clear on unmount
  const counterTimers = useRef<{[key: string]: number}>({});
  
  // Section visibility state
  const [isVisible, setIsVisible] = useState({
    hero: false,
    actions: false,
    pets: false,
    benefits: false,
    testimonials: false,
    cta: false,
    stats: false
  });

  // Fetch featured pets
  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        setIsLoading(true);
        // Fetch both shelter and rehome pets
        const [shelterPets, rehomePets] = await Promise.all([
          AdoptPetService.getApprovedShelterPets(),
          AdoptPetService.getApprovedRehomePets()
        ]);

        // Combine and shuffle the pets
        const allPets = [...shelterPets, ...rehomePets];
        const shuffledPets = allPets.sort(() => Math.random() - 0.5);
        
        // Take the first 6 pets and ensure all required properties are present
        setFeaturedPets(shuffledPets.slice(0, 6).map(pet => ({
          ...pet,
          petAvailabilityStatus: "Available",
          petPicture: pet.petPicture || "/default-pet.jpg",
          isShelterPet: pet.isShelterPet ?? false
        })));
      } catch (error) {
        console.error('Error fetching featured pets:', error);
        setFeaturedPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);
  
  // Clean up timers on component unmount
  useEffect(() => {
    return () => {
      // Clear all running interval timers
      Object.values(counterTimers.current).forEach(timer => 
        window.clearInterval(timer)
      );
    };
  }, []);
  
  // Animation trigger on scroll with counter animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-50px"
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setIsVisible(prev => ({ ...prev, [sectionId]: true }));
          
          // Start counter animation when stats section is visible
          if (sectionId === 'stats') {
            startCounterAnimation();
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = ["hero", "actions", "pets", "benefits", "testimonials", "cta", "stats"];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    // Set hero section visible immediately
    setIsVisible(prev => ({ ...prev, hero: true }));
    
    return () => observer.disconnect();
  }, []);
  
  // Counter animation function
  const startCounterAnimation = () => {
    // Target values for each counter
    const targets = {
      adopted: 1200,
      rescued: 850,
      volunteerHours: 500,
      shelters: 320
    };
    
    // Animation duration settings
    const duration: number = 2000; // 2 seconds
    const interval: number = 16; // Update roughly 60 times per second
    
    // For each counter
    Object.entries(targets).forEach(([key, target]) => {
      // Clear any existing timer
      if (counterTimers.current[key]) {
        window.clearInterval(counterTimers.current[key]);
      }
      
      // Animation variables
      let current = 0;
      const increment = target / (duration / interval);
      
      // Set up interval
      counterTimers.current[key] = window.setInterval(() => {
        current += increment;
        
        if (current >= target) {
          // Animation complete
          setCounters(prev => ({ ...prev, [key]: target }));
          window.clearInterval(counterTimers.current[key]);
        } else {
          // Update counter
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, interval);
    });
  };

  // Filter pets based on active filter
  const getFilteredPets = () => {
    if (activeFilter === "All Pets") return featuredPets;
    if (activeFilter === "Dogs") return featuredPets.filter(pet => pet.petBreed.toLowerCase().includes('dog'));
    if (activeFilter === "Cats") return featuredPets.filter(pet => pet.petBreed.toLowerCase().includes('cat'));
    if (activeFilter === "Recently Added") return [...featuredPets].sort((a, b) => b.petId - a.petId);
    return featuredPets;
  };

  return (
    <div className="home-container">
      {/* Hero Section with Animation */}
      <div className={`hero-section ${isVisible.hero ? 'animate-fade-in' : ''}`} id="hero">
        <div className="hero-content">
          <h1>Find Your <span className="highlight">Pawfect</span> Companion</h1>
          <p>Connect with pets who need loving homes. Every adoption creates a lifelong bond and changes two lives forever.</p>
          <div className="hero-cta">
            <button className="primary-btn pulse" onClick={() => navigate('/adopt')}>
              Find a Pet
            </button>
            <button className="secondary-btn" onClick={() => navigate('/donate')}>
              Support Our Mission
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
          <img src={HeroImage} alt="Happy pets with their owners" className="bounce-subtle" />
        </div>
      </div>

      {/* Quick Actions Section with Animation */}
      <div className={`quick-actions-section ${isVisible.actions ? 'animate-fade-in' : ''}`} id="actions">
        <div className="section-header">
          <h2>How Can We Help You Today?</h2>
          <p>Whether you're looking to adopt, need help with a pet, or want to support our cause</p>
        </div>
        
        <div className="action-cards">
          <div className="action-card hover-lift" onClick={() => navigate('/adopt')}>
            <div className="action-icon">
              <img src={AdoptPetPic} alt="Adopt a Pet" />
            </div>
            <h3>Adopt a Pet</h3>
            <p>Find your perfect companion and give them a forever home</p>
            <button className="action-btn">Browse Pets</button>
          </div>
          
          <div className="action-card hover-lift" onClick={() => navigate('/listpet')}>
            <div className="action-icon">
              <img src={ListPetPic} alt="List a Pet" />
            </div>
            <h3>List a Pet</h3>
            <p>Need to rehome your pet? We can help find them a loving home</p>
            <button className="action-btn">Start Listing</button>
          </div>
          
          <div className="action-card hover-lift" onClick={() => navigate('/rescue')}>
            <div className="action-icon">
              <img src={RescuePetPic} alt="Report Rescue" />
            </div>
            <h3>Report a Rescue</h3>
            <p>Help us save animals in need by reporting those requiring rescue</p>
            <button className="action-btn">Report Now</button>
          </div>
          
          <div className="action-card hover-lift" onClick={() => navigate('/donate')}>
            <div className="action-icon">
              <img src={DonatePic} alt="Donate" />
            </div>
            <h3>Support Our Mission</h3>
            <p>Your donations help us care for animals until they find their forever homes</p>
            <button className="action-btn">Donate</button>
          </div>
        </div>
      </div>

      {/* Featured Pets Section with Animation */}
      <div className={`featured-pets-section ${isVisible.pets ? 'animate-slide-up' : ''}`} id="pets">
        <div className="section-header">
          <h2>Meet Our Featured Pets</h2>
          <p>These adorable companions are waiting for their forever homes</p>
          <div className="pet-filters">
            {["All Pets", "Dogs", "Cats", "Recently Added"].map((filter) => (
              <button 
                key={filter} 
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pet-cards-container">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading featured pets...</p>
            </div>
          ) : featuredPets.length === 0 ? (
            <div className="no-pets-message">
              <p>No pets available at the moment. Please check back later!</p>
            </div>
          ) : (
            <div className="pet-cards-grid">
              {getFilteredPets().map((pet) => (
                <PetCard key={pet.petId} pet={pet} />
              ))}
            </div>
          )}
        </div>
        
        <div className="view-more-container">
          <button className="view-more-btn" onClick={() => navigate('/available-pets')}>
            View All Available Pets <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Why Choose Us Section with Animation */}
      <div className={`why-choose-section ${isVisible.benefits ? 'animate-fade-in' : ''}`} id="benefits">
        <div className="section-header">
          <h2>Why Choose <span className="highlight">PawFinder</span>?</h2>
          <p>We're dedicated to creating perfect matches between pets and families</p>
        </div>
        
        <div className="benefits-container">
          <div className="benefit-card hover-lift">
            <div className="benefit-icon">
              <img src={CarePic} alt="Compassionate Care" />
            </div>
            <h3>Compassionate Care</h3>
            <p>Every animal receives personalized attention and medical care while awaiting adoption</p>
          </div>
          
          <div className="benefit-card hover-lift">
            <div className="benefit-icon">
              <img src={TrustPic} alt="Trusted Process" />
            </div>
            <h3>Trusted Matching</h3>
            <p>Our thorough adoption process ensures the perfect fit for both pets and families</p>
          </div>
          
          <div className="benefit-card hover-lift">
            <div className="benefit-icon">
              <img src={GuidePic} alt="Expert Guidance" />
            </div>
            <h3>Ongoing Support</h3>
            <p>We're here for you and your pet with resources, training advice, and community</p>
          </div>
        </div>

        {/* Testimonials Section with Animation */}
        <div className={`testimonials-container ${isVisible.testimonials ? 'animate-slide-up' : ''}`} id="testimonials">
          <h3>Success Stories</h3>
          <div className="testimonials">
            <div className="testimonial hover-lift">
              <div className="quote-icon">❝</div>
              <p>Adopting Luna was the best decision we ever made. The PawFinder team made the process so easy and supportive.</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundImage: 'url(src/assets/images/volunteer-img/womenvol.jpg)' }}></div>
                <span>- Sarah & James, New York</span>
              </div>
            </div>
            <div className="testimonial hover-lift">
              <div className="quote-icon">❝</div>
              <p>After losing my old dog, I wasn't sure I was ready. PawFinder helped me find Max, who has brought so much joy back to my life.</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundImage: 'url(src/assets/images/volunteer-img/handsome-young-guy-with-glasses-posing.jpg)' }}></div>
                <span>- Robert, Chicago</span>
              </div>
            </div>
          </div>
          <button className="secondary-btn" onClick={() => navigate('/success-stories')}>
            Read More Stories
          </button>
        </div>
      </div>

      {/* Call to Action Section with Animation */}
      <div className={`cta-section ${isVisible.cta ? 'animate-fade-in' : ''}`} id="cta">
        <div className="cta-background">
          <div className="cta-content">
            <h2>Ready to Meet Your New Best Friend?</h2>
            <p>Start your journey toward pet adoption today and change a life forever</p>
            <div className="cta-buttons">
              <button className="primary-btn pulse" onClick={() => navigate('/adopt')}>Find a Pet</button>
              <button className="secondary-btn-alt" onClick={() => navigate('/volunteer')}>Volunteer With Us</button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - using React state instead of DOM manipulation */}
      <div className={`stats-section ${isVisible.stats ? 'animate-fade-in' : ''}`} id="stats">
        <div className="stat-item">
          <div className="stat-number">{counters.adopted}</div>
          <div className="stat-label">Pets Adopted</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counters.rescued}</div>
          <div className="stat-label">Successful Rescues</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counters.volunteerHours}</div>
          <div className="stat-label">Volunteer Hours</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counters.shelters}</div>
          <div className="stat-label">Partner Shelters</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;