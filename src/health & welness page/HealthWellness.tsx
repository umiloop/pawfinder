import React, { useState, useEffect } from 'react';
import './HealthWellness.css';
import { 
  FaClipboardCheck, 
  FaSyringe, 
  FaExclamationTriangle, 
  FaBone, 
  FaDownload 
} from 'react-icons/fa';

interface Event {
  id: number;
  month: string;
  day: string;
  title: string;
  location: string;
  description: string;
  link: string;
}

const HealthWellness: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  const tabContent = [
    {
      title: "Why Adoption Matters",
      content: "When you adopt a pet, you're saving a life and making room for another animal in need. Adoption helps reduce the population of homeless animals and fights against unethical breeding practices.",
      benefits: [
        "Many shelter pets are already vaccinated and spayed/neutered",
        "Adoption fees are significantly less than breeder prices",
        "Adult pets often have established personalities and basic training",
        "You're supporting animal welfare organizations in your community"
      ],
      quote: {
        text: "Adoption gives animals a second chance at finding their forever home. It's one of the most rewarding experiences for both the pet and their new family.",
        author: "Dr. Maria Sanchez, Veterinarian and Animal Welfare Advocate"
      },
      image: "src/assets/images/edudog.jpg",
      link: "/adoption-guide"
    },
    {
      title: "Responsible Ownership",
      content: "Being a responsible pet owner means understanding and meeting your pet's physical, social, and emotional needs throughout their life.",
      benefits: [
        "Regular veterinary checkups prevent health issues",
        "Proper training creates a well-behaved companion",
        "Understanding breed-specific needs improves quality of life",
        "Planning for emergencies ensures your pet's safety"
      ],
      quote: {
        text: "Responsible ownership is about commitment—providing care, love, and attention for the entire life of your pet, which could be 10-15 years or more.",
        author: "Dr. James Wilson, Veterinary Surgeon"
      },
      image: "src/assets/images/welnesssrc/health tab/dogrespo.jpg",
      link: "/responsible-ownership"
    },
    {
      title: "Pet Health Essentials",
      content: "Preventive healthcare is crucial for keeping your pet healthy. Understanding the basics of pet health helps you identify problems early.",
      benefits: [
        "Preventive vaccinations protect against common diseases",
        "Regular dental care prevents painful conditions",
        "Proper nutrition supports overall health",
        "Weight management prevents many chronic conditions"
      ],
      quote: {
        text: "Prevention is always better than treatment. A proactive approach to your pet's health can add years to their life and life to their years.",
        author: "Dr. Emily Chen, Veterinary Medicine Specialist"
      },
      image: "src/assets/images/welnesssrc/health tab/puupyhealth.jpg",
      link: "/pet-health-guide"
    },
    {
      title: "Training & Behavior",
      content: "Understanding your pet's behavior is key to building a strong relationship. Positive reinforcement training creates a happy, well-adjusted pet.",
      benefits: [
        "Positive reinforcement builds trust and confidence",
        "Training provides mental stimulation",
        "Understanding body language prevents problems",
        "Consistent rules create security for your pet"
      ],
      quote: {
        text: "Training isn't about control—it's about communication. When we understand each other, both pet and human can live harmoniously.",
        author: "Lisa Chen, Certified Animal Behaviorist"
      },
      image: "src/assets/images/welnesssrc/health tab/training.jpg",
      link: "/training-guide"
    }
  ];

  const healthTips = [
    "Schedule annual wellness exams even when your pet seems healthy",
    "Keep pets at a healthy weight to prevent diabetes, arthritis, and other conditions",
    "Dental care is essential—brush your pet's teeth regularly",
    "Know the signs of common pet emergencies",
    "Keep all medications and chemicals out of your pet's reach"
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://pawfinder-backend.onrender.com/api/admin/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="health-wellness-container-re">
      {/* Enhanced Hero Section */}
      <section className="hero-section-health">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
              <path d="M12,3C10.34,3 9,4.34 9,6C9,7.31 9.83,8.42 11,8.83V15.17C9.83,15.58 9,16.69 9,18C9,19.66 10.34,21 12,21C13.66,21 15,19.66 15,18C15,16.69 14.17,15.58 13,15.17V8.83C14.17,8.42 15,7.31 15,6C15,4.34 13.66,3 12,3M7.37,10.11L6,13.56L7.88,15.37L10.41,12H14.5C14.78,12 15,11.78 15,11.5A0.5,0.5 0 0,0 14.5,11H10.26L7.37,10.11M18.7,10.13L17,11.9V16H15V17H19V16H18V12.34L19.37,11.34L18.7,10.13Z" />
            </svg>
          </div>
          <h1>Pet Health & Wellness</h1>
          <p className="hero-subtitle">Complete resources for your pet's lifelong health journey</p>
          <div className="hero-buttons">
            <a href="#pet-education" className="hero-cta-button primary">Explore Resources</a>
            <a href="/clinics" className="hero-cta-button secondary">Find a Clinic Near You</a>
          </div>
          
          <div className="hero-features">
            <div className="hero-feature">
              <span className="feature-icon">✓</span>
              <span>Expert Advice</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">✓</span>
              <span>Wellness Guides</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">✓</span>
              <span>Emergency Tips</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Healthcare Services</h2>
          <p>Essential services to keep your pet happy and healthy</p>
        </div>

        <div className="services-grid">
          {/* Veterinary Clinics Card */}
          <div className="service-card">
            <div className="card-icon">
              <img src="src/assets/images/hospital.png" alt="Clinic Icon" />
            </div>
            <h3>Veterinary Clinics</h3>
            <p>Find trusted partner clinics offering specialized care near you</p>
            <a href="/clinics" className="button primary-button">Find a Clinic</a>
          </div>

          {/* Health Checkups Card */}
          <div className="service-card">
            <div className="card-icon">
              <img src="src/assets/images/checkup.png" alt="Checkup Icon" />
            </div>
            <h3>Health Checkups</h3>
            <p>Learn about essential preventive care and prepare for vet visits</p>
            <a href="/checkups-info" className="button primary-button">View Checklist</a>
          </div>

          {/* Vaccination Card */}
          <div className="service-card">
            <div className="card-icon">
              <img src="src/assets/images/injection.png" alt="Vaccine Icon" />
            </div>
            <h3>Vaccination Programs</h3>
            <p>Stay updated on vaccination schedules with personalized reminders</p>
            <a href="/vaccination-info" className="button primary-button">View Vaccine Guide</a>
          </div>
        </div>
      </section>

      {/* Quick Health Tips Section */}
      <section className="health-tips-section">
        <div className="section-header">
          <h2>Essential Pet Health Tips</h2>
          <p>Quick tips for keeping your pet healthy</p>
        </div>
        <div className="tips-container">
          <ul className="tips-list">
            {healthTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="education-section" id="pet-education">
        <div className="section-header">
          <h2>Educational Resources</h2>
          <p>Expert knowledge to help you become the best pet parent</p>
        </div>

        <div className="education-tabs">
          <div className="tab-navigation">
            {tabContent.map((tab, index) => (
              <button 
                key={index}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="tab-content active">
            <div className="tab-flex">
              <div className="tab-text">
                <h3>{tabContent[activeTab].title}</h3>
                <p>{tabContent[activeTab].content}</p>

                <h4>Benefits:</h4>
                <ul className="benefits-list">
                  {tabContent[activeTab].benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <blockquote className="expert-quote">
                  "{tabContent[activeTab].quote.text}"
                  <cite>— {tabContent[activeTab].quote.author}</cite>
                </blockquote>
              </div>
              <div className="tab-image">
                <img src={tabContent[activeTab].image} alt={tabContent[activeTab].title} />
              </div>
            </div>
            <a href={tabContent[activeTab].link} className="button secondary-button">Complete Guide</a>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="featured-articles">
        <div className="section-header">
          <h2>Expert Articles</h2>
          <p>Curated content from veterinarians, trainers, and animal welfare experts</p>
        </div>

        <div className="articles-grid">
          <article className="article-card">
            <div className="article-image">
              <img src="src/assets/images/pet-food.png" alt="Pet nutrition" />
              <div className="article-category">Pet Health</div>
            </div>
            <div className="article-content">
              <h3>Sterilization Saves Lives</h3>
              <p>Understanding the health benefits and social impact of spaying and neutering your pets.</p>
              <a href="/sterilization-benefits" className="text-link">
                Read More <span className="arrow-icon">→</span>
              </a>
            </div>
          </article>

          <article className="article-card">
            <div className="article-image">
              <img src="src/assets/images/pet-insurance.png" alt="Pet adoption" />
              <div className="article-category">Pet Welfare</div>
            </div>
            <div className="article-content">
              <h3>Adopt, Don't Shop: The Wellness Impact</h3>
              <p>How adopting a pet creates powerful benefits for both you and the animal.</p>
              <a href="/AdoptDontShop" className="text-link">
                Read More <span className="arrow-icon">→</span>
              </a>
            </div>
          </article>

          <article className="article-card">
            <div className="article-image">
              <img src="src/assets/images/pawfeet.png" alt="Physical health" />
              <div className="article-category">Human Health</div>
            </div>
            <div className="article-content">
              <h3>The Physical Health Benefits of Having a Pet</h3>
              <p>How walking dogs, playing with pets, and being active with animals improves your health.</p>
              <a href="/physical-health-benefits" className="text-link">
                Read More <span className="arrow-icon">→</span>
              </a>
            </div>
          </article>
        </div>

        <div className="view-all-container">
          <a href="/articles" className="button secondary-button">View All Articles</a>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="resources-section">
        <div className="resources-container">
          <div className="resources-content">
            <h2>Free Downloadable Resources</h2>
            <p>Practical guides to help you provide the best care for your pet</p>
            <ul className="resources-list">
              <li>
                <a href="/resources/new-pet-checklist.pdf" className="resource-link" download>
                  <span className="resource-icon">
                    <FaClipboardCheck />
                  </span>
                  <span className="resource-text">New Pet Owner Checklist</span>
                  <span className="download-icon"><FaDownload /></span>
                </a>
              </li>
              <li>
                <a href="/resources/vaccination-schedule.pdf" className="resource-link" download>
                  <span className="resource-icon">
                    <FaSyringe />
                  </span>
                  <span className="resource-text">Vaccination Schedule by Age</span>
                  <span className="download-icon"><FaDownload /></span>
                </a>
              </li>
              <li>
                <a href="/resources/pet-emergency-guide.pdf" className="resource-link" download>
                  <span className="resource-icon">
                    <FaExclamationTriangle />
                  </span>
                  <span className="resource-text">Pet Emergency Action Guide</span>
                  <span className="download-icon"><FaDownload /></span>
                </a>
              </li>
              <li>
                <a href="/resources/nutrition-guide.pdf" className="resource-link" download>
                  <span className="resource-icon">
                    <FaBone />
                  </span>
                  <span className="resource-text">Pet Nutrition Guide</span>
                  <span className="download-icon"><FaDownload /></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="newsletter-signup">
            <h3>Get Expert Tips Delivered</h3>
            <p>Join our newsletter for monthly pet care advice</p>
            <form className="signup-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="button primary-button">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Expert Testimonials */}
      <section className="testimonial-section">
        <div className="section-header">
          <h2>Expert Partnerships</h2>
          <p>We collaborate with leading professionals in animal care</p>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="expert-image">
              <img src="src/assets/images/Doc1.jpg" alt="Dr. James Wilson" />
            </div>
            <div className="expert-info">
              <h3>Dr. James Wilson</h3>
              <span className="expert-title">Veterinary Surgeon, Animal Care Center</span>
              <p>"This platform provides essential knowledge that every pet owner should have. The educational resources align perfectly with what we recommend to our clients."</p>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="expert-image">
              <img src="src/assets/images/Doc2.jpg" alt="Lisa Chen" />
            </div>
            <div className="expert-info">
              <h3>Lisa Chen</h3>
              <span className="expert-title">Certified Animal Behaviorist</span>
              <p>"The responsible ownership guides here set a new standard for education. I regularly recommend these resources to new pet parents."</p>
            </div>
          </div>
        </div>

        <div className="partner-logos">
          <div className="logo-container">
            <img src="src/assets/images/welnesssrc/medical.png" alt="Partner Clinic" />
          </div>
          <div className="logo-container">
            <img src="src/assets/images/welnesssrc/vet.png" alt="Partner Organization" />
          </div>
          <div className="logo-container">
            <img src="src\assets\images\welnesssrc\pet-house.png" alt="Partner Shelter" />
          </div>
          <div className="logo-container">
            <img src="src\assets\images\welnesssrc\handshake.png" alt="Partner Association" />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Join us for educational seminars and wellness clinics</p>
        </div>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-date">
                  <span className="event-month">{event.month}</span>
                  <span className="event-day">{event.day}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                  <p>{event.description}</p>
                  {event.link && (
                    <a href={event.link} className="text-link">Learn More</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Emergency Resources Section */}
      <section className="emergency-section">
        <div className="section-header">
          <h2>Pet Emergency Resources</h2>
          <p>Be prepared for unexpected situations</p>
        </div>
        
        <div className="emergency-container">
          <div className="emergency-info">
            <h3>Know the Signs of Emergency</h3>
            <ul className="emergency-list">
              <li>Difficulty breathing or choking</li>
              <li>Excessive bleeding that doesn't stop</li>
              <li>Severe injury, including broken bones</li>
              <li>Inability to urinate or defecate</li>
              <li>Ingestion of toxic substances</li>
              <li>Seizures or collapse</li>
              <li>Severe vomiting or diarrhea</li>
            </ul>
          </div>
          
          <div className="emergency-actions">
            <h3>What To Do</h3>
            <ol className="action-steps">
              <li>Stay calm - your pet can sense your anxiety</li>
              <li>Call your emergency veterinarian</li>
              <li>Be prepared to describe symptoms clearly</li>
              <li>Follow veterinarian instructions</li>
              <li>Transport your pet safely</li>
            </ol>
            <a href="/emergency-resources" className="button primary-button emergency-button">Find Emergency Clinics</a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Need Personalized Advice?</h2>
          <p>Connect with Us for specific questions about your pet's health</p>
          <div className="cta-buttons">
            <a href="/find-vet" className="button primary-button">Contact Us</a>
            {/* <a href="/ask-expert" className="button secondary-button">Ask an Expert</a> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthWellness;