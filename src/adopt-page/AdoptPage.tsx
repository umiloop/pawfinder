import "./AdoptPage.css"
import PetCard from "../assets/components/pet-card/PetCard";
import React, { useEffect, useState, useRef } from "react";
import { AdoptPetService } from "../service/AdoptPetService";
import { 
  FaSearch, FaHeart, FaPaw, FaHome, FaMapMarkerAlt, 
  FaFilter, FaRegSmile, FaShieldAlt, FaHandHoldingHeart 
} from 'react-icons/fa';

const ADOPT_HERO_IMAGE = new URL("../assets/images/dog-licking-smiling-owner.jpg", import.meta.url).href;
const ADOPT_TESTIMONIAL_IMAGE_1 = new URL("../assets/images/Sucess-Story/testimo1.jpg", import.meta.url).href;
const ADOPT_TESTIMONIAL_IMAGE_2 = new URL("../assets/images/Sucess-Story/testimo3.jpg", import.meta.url).href;
const ADOPT_TESTIMONIAL_IMAGE_3 = new URL("../assets/images/Sucess-Story/testimo2.jpg", import.meta.url).href;
const DEFAULT_NO_RESULTS_IMAGE = "/no-results.svg";

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
    photoUrls?: string[];
    isShelterPet: boolean;
}

// Testimonial interface
interface Testimonial {
    name: string;
    quote: string;
    image: string;
}

// FAQ interface
interface FAQ {
    question: string;
    answer: string;
}

const AdoptPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("shelter");
    const [rehomePets, setRehomePets] = useState<Pet[]>([]);
    const [shelterPets, setShelterPets] = useState<Pet[]>([]);
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [displayedRehomePets, setDisplayedRehomePets] = useState<Pet[]>([]);
    const [displayedShelterPets, setDisplayedShelterPets] = useState<Pet[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [selectedAge, setSelectedAge] = useState<string>("");
    const [uniqueBreeds, setUniqueBreeds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [, setActiveTestimonial] = useState<number>(0);
    const filterRef = useRef<HTMLDivElement>(null);
    const [activeFaq, setActiveFaq] = useState<number>(-1);
    
    // Testimonials
    const testimonials: Testimonial[] = [
        {
            name: "Sarah & Max",
            quote: "Adopting Max changed our lives forever. He brought so much joy and love into our home. The process was so simple with Paw Finder!",
            image: ADOPT_TESTIMONIAL_IMAGE_1
        },
        {
            name: "David & Bella",
            quote: "Finding Bella on Paw Finder was the best thing that happened to us. The process was seamless and now we have the perfect addition to our family.",
            image: ADOPT_TESTIMONIAL_IMAGE_2
        },
        {
            name: "Jennifer & Charlie",
            quote: "Charlie was in a shelter for months before we found him. Now he's the happiest dog in the neighborhood. Thank you Paw Finder for bringing us together!",
            image: ADOPT_TESTIMONIAL_IMAGE_3
        }
    ];

    // FAQs
    const faqs: FAQ[] = [
        {
            question: "What documents do I need to adopt a pet?",
            answer: "Generally, you'll need a valid ID, proof of residence, and sometimes landlord permission if you're renting. Some shelters may require additional documentation."
        },
        {
            question: "Are adoption fees refundable?",
            answer: "Most adoption fees are non-refundable as they cover vaccinations, spaying/neutering, and general care costs. However, policies vary by shelter."
        },
        {
            question: "Can I adopt if I already have pets?",
            answer: "Yes! Many shelters encourage adopting into homes with existing pets. They might want to ensure compatibility with a meet-and-greet between your current pet and the potential new addition."
        },
        {
            question: "How long does the adoption process take?",
            answer: "The process can vary from same-day adoptions to several days, depending on the shelter's policies, the need for home visits, and reference checks."
        }
    ];

    useEffect(() => {
      setIsLoading(true);
      
      // Fetch Rehome Pets
      AdoptPetService.getApprovedRehomePets().then((data) => {
        setRehomePets(data);
        setDisplayedRehomePets(data);
        collectUniqueBreeds(data);
      });

      // Fetch Shelter Pets
      AdoptPetService.getApprovedShelterPets().then((data) => {
        setShelterPets(data);
        setDisplayedShelterPets(data);
        collectUniqueBreeds([...rehomePets, ...data]);
        setIsLoading(false);
      });

      // Set up click outside listener for filters
      const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
          setShowFilters(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }, [testimonials.length]);

    // Collect unique breeds for filter dropdown
    const collectUniqueBreeds = (pets: Pet[]) => {
      const breeds = new Set<string>();
      pets.forEach(pet => {
        if (pet.petBreed) {
          breeds.add(pet.petBreed);
        }
      });
      setUniqueBreeds(Array.from(breeds));
    };

    // Update displayed pets when filters change
    useEffect(() => {
      filterPets();
    }, [searchLocation, selectedBreed, selectedAge, rehomePets, shelterPets]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleLocationSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(event.target.value);
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAge(event.target.value);
    };

    const toggleFilters = () => {
      setShowFilters(prev => !prev);
    };

    const filterPets = () => {
      // Start with all pets
      let filteredRehome = [...rehomePets];
      let filteredShelter = [...shelterPets];
      
      // Filter by location if specified
      if (searchLocation.trim()) {
        filteredRehome = filteredRehome.filter(pet => 
          pet.petLocation.toLowerCase().includes(searchLocation.toLowerCase())
        );
        filteredShelter = filteredShelter.filter(pet => 
          pet.petLocation.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }
      
      // Filter by breed if specified
      if (selectedBreed) {
        filteredRehome = filteredRehome.filter(pet => pet.petBreed === selectedBreed);
        filteredShelter = filteredShelter.filter(pet => pet.petBreed === selectedBreed);
      }
      
      // Filter by age if specified
      if (selectedAge) {
        filteredRehome = filteredRehome.filter(pet => {
          if (selectedAge === "puppy" && pet.petAge.includes("month")) return true;
          if (selectedAge === "young" && 
              (pet.petAge.includes("1 year") || pet.petAge.includes("2 year"))) return true;
          if (selectedAge === "adult" && 
              (parseInt(pet.petAge) >= 3 && parseInt(pet.petAge) <= 8)) return true;
          if (selectedAge === "senior" && parseInt(pet.petAge) > 8) return true;
          return false;
        });
        
        filteredShelter = filteredShelter.filter(pet => {
          if (selectedAge === "puppy" && pet.petAge.includes("month")) return true;
          if (selectedAge === "young" && 
              (pet.petAge.includes("1 year") || pet.petAge.includes("2 year"))) return true;
          if (selectedAge === "adult" && 
              (parseInt(pet.petAge) >= 3 && parseInt(pet.petAge) <= 8)) return true;
          if (selectedAge === "senior" && parseInt(pet.petAge) > 8) return true;
          return false;
        });
      }
      
      setDisplayedRehomePets(filteredRehome);
      setDisplayedShelterPets(filteredShelter);
    };

    const clearFilters = () => {
      setSearchLocation("");
      setSelectedBreed("");
      setSelectedAge("");
    };
    
    // Get current pet count based on selected category
    const getCurrentPetCount = () => {
      return selectedCategory === "shelter" ? 
        displayedShelterPets.length : 
        displayedRehomePets.length;
    };

    return (
        <div className="adopt-page">
          {/* Hero Section */}
          <section className="adopt-hero-section">
            <div className="adopt-hero-overlay" aria-hidden="true" />
            <img
              src={ADOPT_HERO_IMAGE}
              alt="Happy dog with owner"
              className="adopt-hero-image"
            />

            <div className="adopt-hero-content">
              <div className="adopt-hero-text">
                <span className="adopt-hero-preheading">Find Your Perfect Match</span>
                <h1 className="adopt-hero-heading">
                  Give a Forever Home to a <span className="adopt-hero-highlight">Furry Friend</span>
                </h1>
                <p className="adopt-hero-subheading">
                  Every pet deserves a loving home. Browse through our adorable pets waiting 
                  to bring joy, love, and endless cuddles to your family.
                </p>
                <div className="adopt-hero-buttons">
                  <a href="#pet-listings" className="adopt-hero-button primary">
                    Meet Available Pets
                  </a>
                  <a href="#how-it-works" className="adopt-hero-button secondary">
                    How It Works
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Why Adopt Section */}
          <section className="adopt-why-section">
            <div className="section-header">
              <h2>Why Adopt a Pet?</h2>
              <p className="section-description">
                Adoption is a rewarding experience that benefits both you and your new furry friend.
              </p>
            </div>
            
            <div className="adopt-benefits-container">
              <div className="adopt-benefit-card">
                <div className="adopt-icon-circle">
                  <FaHeart className="adopt-benefit-icon" />
                </div>
                <h3>Save a Life</h3>
                <p>By adopting, you're giving a deserving pet a second chance at a happy life.</p>
              </div>
              <div className="adopt-benefit-card">
                <div className="adopt-icon-circle">
                  <FaPaw className="adopt-benefit-icon" />
                </div>
                <h3>Ready for Home</h3>
                <p>Many shelter pets are already house-trained and socialized.</p>
              </div>
              <div className="adopt-benefit-card">
                <div className="adopt-icon-circle">
                  <FaHome className="adopt-benefit-icon" />
                </div>
                <h3>Lower Costs</h3>
                <p>Adoption fees are often less than purchasing from breeders or pet stores.</p>
              </div>
              <div className="adopt-benefit-card">
                <div className="adopt-icon-circle">
                  <FaRegSmile className="adopt-benefit-icon" />
                </div>
                <h3>Emotional Support</h3>
                <p>Studies show pet owners have decreased levels of stress and improved mental health.</p>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section id="pet-listings" className="adopt-filter-section">
            <div className="section-header">
              <h2 className="section-heading">Find Your Perfect Companion</h2>
              <p className="section-description">
                Use our advanced filters to find the perfect pet match for your lifestyle and home.
              </p>
            </div>

            <div className="adopt-filter-container">
              {/* Location Search Bar */}
              <div className="adopt-search-container">
                <div className="adopt-search-wrapper">
                  <FaMapMarkerAlt className="adopt-search-icon" />
                  <input
                    type="text"
                    placeholder="Search for pets near you..."
                    value={searchLocation}
                    onChange={handleLocationSearch}
                    className="adopt-search-input"
                    aria-label="Search by location"
                  />
                </div>
                <button className="adopt-search-button" aria-label="Search">
                  <FaSearch className="button-icon" /> Find Nearby Pets
                </button>
                <button 
                  className={`adopt-filter-toggle ${showFilters ? 'active' : ''}`}
                  onClick={toggleFilters}
                  aria-expanded={showFilters}
                  aria-controls="advanced-filters"
                >
                  <FaFilter className="button-icon" /> Filters
                  {(selectedBreed || selectedAge) && (
                    <span className="filter-badge">{(selectedBreed ? 1 : 0) + (selectedAge ? 1 : 0)}</span>
                  )}
                </button>
              </div>

              {/* Additional Filters */}
              <div 
                ref={filterRef}
                id="advanced-filters" 
                className={`adopt-advanced-filters ${showFilters ? 'show' : ''}`}
                aria-hidden={!showFilters}
              >
                <div className="adopt-filter-group">
                  <label htmlFor="breed">Breed:</label>
                  <select 
                    id="breed" 
                    value={selectedBreed} 
                    onChange={handleBreedChange}
                    className="adopt-filter-select"
                  >
                    <option value="">All Breeds</option>
                    {uniqueBreeds.map((breed, index) => (
                      <option key={index} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>

                <div className="adopt-filter-group">
                  <label htmlFor="age">Age:</label>
                  <select 
                    id="age" 
                    value={selectedAge} 
                    onChange={handleAgeChange}
                    className="adopt-filter-select"
                  >
                    <option value="">All Ages</option>
                    <option value="puppy">Puppy/Kitten</option>
                    <option value="young">Young</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>

                <div className="adopt-filter-group">
                  <label htmlFor="sort">Category:</label>
                  <select 
                    id="sort" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    className="adopt-filter-select"
                  >
                    <option value="shelter">Shelter Pets</option>
                    <option value="rehome">Rehome Pets</option>
                  </select>
                </div>

                <button onClick={clearFilters} className="adopt-clear-filters">
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedBreed || selectedAge || searchLocation) && (
              <div className="adopt-active-filters">
                <span className="active-filters-label">Active filters:</span>
                {searchLocation && (
                  <span className="adopt-filter-tag">
                    Location: {searchLocation}
                    <button 
                      onClick={() => setSearchLocation('')} 
                      className="adopt-remove-filter"
                      aria-label={`Remove ${searchLocation} filter`}
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedBreed && (
                  <span className="adopt-filter-tag">
                    Breed: {selectedBreed}
                    <button 
                      onClick={() => setSelectedBreed('')} 
                      className="adopt-remove-filter"
                      aria-label={`Remove ${selectedBreed} filter`}
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedAge && (
                  <span className="adopt-filter-tag">
                    Age: {selectedAge}
                    <button 
                      onClick={() => setSelectedAge('')} 
                      className="adopt-remove-filter"
                      aria-label={`Remove ${selectedAge} filter`}
                    >
                      ×
                    </button>
                  </span>
                )}
                <button onClick={clearFilters} className="adopt-clear-all">
                  Clear All
                </button>
              </div>
            )}

            {/* Pet Listings */}
            <div className="adopt-pet-listings">
              {isLoading ? (
                <div className="adopt-loading">
                  <div className="adopt-spinner"></div>
                  <p>Finding adorable pets for you...</p>
                </div>
              ) : (
                <>
                  <div className="adopt-results-count">
                    <p>
                      <strong>{getCurrentPetCount()}</strong> pets found
                      {searchLocation && ` near "${searchLocation}"`}
                      {selectedBreed && `, breed: ${selectedBreed}`}
                      {selectedAge && `, age: ${selectedAge}`}
                    </p>
                  </div>

                  <div className="adopt-pets-grid">
                    {selectedCategory === "shelter" ? (
                      <div className="adopt-shelter-pets">
                        <div className="adopt-pets-header">
                          <h1>Shelter Pets <span className="adopt-pet-count">({displayedShelterPets.length})</span></h1>
                          {displayedShelterPets.length === 0 && (
                            <div className="adopt-no-results">
                              <img src={DEFAULT_NO_RESULTS_IMAGE} alt="No pets found" className="adopt-no-results-image" />
                              <p>No pets found with these filters. Try adjusting your search criteria.</p>
                              <button onClick={clearFilters} className="adopt-try-again">Clear All Filters</button>
                            </div>
                          )}
                        </div>
                        <div className="adopt-pets-list">
                          {displayedShelterPets.map((pet) => (
                            <PetCard key={pet.petId} pet={pet} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="adopt-rehome-pets">
                        <div className="adopt-pets-header">
                          <h1>Rehome Pets <span className="adopt-pet-count">({displayedRehomePets.length})</span></h1>
                          {displayedRehomePets.length === 0 && (
                            <div className="adopt-no-results">
                              <img src={DEFAULT_NO_RESULTS_IMAGE} alt="No pets found" className="adopt-no-results-image" />
                              <p>No pets found with these filters. Try adjusting your search criteria.</p>
                              <button onClick={clearFilters} className="adopt-try-again">Clear All Filters</button>
                            </div>
                          )}
                        </div>
                        <div className="adopt-pets-list">
                          {displayedRehomePets.map((pet) => (
                            <PetCard key={pet.petId} pet={pet} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Adoption Process */}
          <section id="how-it-works" className="adopt-process-section">
            <div className="section-header">
              <h2>How Adoption Works</h2>
              <p className="section-description">
                We've made the adoption process simple and straightforward so you can focus on finding your perfect match.
              </p>
            </div>

            <div className="adopt-steps-container">
              <div className="adopt-step">
                <div className="adopt-step-number">1</div>
                <h3>Browse & Find</h3>
                <p>Search for pets that match your lifestyle and living situation.</p>
              </div>
              <div className="adopt-step">
                <div className="adopt-step-number">2</div>
                <h3>Fill Application</h3>
                <p>Complete our comprehensive adoption application to ensure the best match.</p>
              </div>
              <div className="adopt-step">
                <div className="adopt-step-number">3</div>
                <h3>Contact</h3>
                <p>Reach out to the shelter or current owner to arrange a meeting.</p>
              </div>
              <div className="adopt-step">
                <div className="adopt-step-number">4</div>
                <h3>Meet & Greet</h3>
                <p>Spend time with your potential new family member to ensure a good fit.</p>
              </div>
              <div className="adopt-step">
                <div className="adopt-step-number">5</div>
                <h3>Adopt!</h3>
                <p>Complete the final paperwork and welcome your new pet home.</p>
              </div>
            </div>

            <div className="adopt-guarantees">
              <h3>Our Adoption Guarantees</h3>
              <div className="adopt-guarantees-container">
                <div className="adopt-guarantee">
                  <FaHandHoldingHeart className="adopt-guarantee-icon" />
                  <h4>30-Day Support</h4>
                  <p>Get help and advice from our team during the first month of adoption.</p>
                </div>
                <div className="adopt-guarantee">
                  <FaShieldAlt className="adopt-guarantee-icon" />
                  <h4>Health Verified</h4>
                  <p>All pets are checked by veterinarians and are up-to-date on vaccinations.</p>
                </div>
                <div className="adopt-guarantee">
                  <FaPaw className="adopt-guarantee-icon" />
                  <h4>Behavior Assessment</h4>
                  <p>We evaluate each pet's temperament to help match them with the right home.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Adoption Success Stories */}
          <section className="adopt-success-stories">
            <div className="section-header">
              <h2>Adoption Success Stories</h2>
              <p className="section-description">
                Meet some of the happy families who found their perfect companions through our platform.
              </p>
            </div>

            <div className="adopt-testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div className="adopt-testimonial-card" key={index}>
                  <div className="adopt-testimonial-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="adopt-testimonial-content">
                    <p className="adopt-testimonial-quote">"{testimonial.quote}"</p>
                    <h3 className="adopt-testimonial-name">{testimonial.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="adopt-faq-section">
            <div className="section-header">
              <h2>Frequently Asked Questions</h2>
              <p className="section-description">
                Get answers to common questions about the adoption process and pet ownership.
              </p>
            </div>

            <div className="adopt-faq-container">
              {faqs.map((faq, index) => (
                <div 
                  className={`adopt-faq-item ${activeFaq === index ? 'active' : ''}`} 
                  key={index}
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                >
                  <div className="adopt-faq-question">
                    <h3>{faq.question}</h3>
                    <span className="adopt-faq-icon">{activeFaq === index ? '−' : '+'}</span>
                  </div>
                  <div className="adopt-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="adopt-cta-section">
            <div className="adopt-cta-content">
              <h2>Ready to Change a Life?</h2>
              <p>Your perfect companion is just a few clicks away. Start your search today!</p>
              <a href="#pet-listings" className="adopt-cta-button">
                Find Your New Best Friend
              </a>
            </div>
          </section>
        </div>
    );
};

export default AdoptPage;
