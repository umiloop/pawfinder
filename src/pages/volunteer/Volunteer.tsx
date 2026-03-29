import React, { useState } from 'react';
import './Volunteer.css';

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    experience: '',
    availability: [] as string[],
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name as keyof typeof formData] as string[], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: (formData[name as keyof typeof formData] as string[]).filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form data submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission (optional)
    setFormData({
      name: '',
      email: '',
      phone: '',
      interests: [],
      experience: '',
      availability: [],
      message: ''
    });
  };

  return (
    <div className="volunteer-page">
      {/* Hero Section */}
      <section className="volunteer-hero">
        <div className="volunteer-hero-content">
          <h1>Become a Volunteer</h1>
          <p>Join our team and make a difference in the lives of animals in need</p>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="volunteer-why">
        <div className="container">
          <div className="section-header">
            <h2>Why Volunteer With Us?</h2>
            <p>Your time and talents can help save lives and create forever homes</p>
          </div>
          
          <div className="volunteer-benefits">
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="src/assets/images/volunteer-img/paw.png" alt="Paw icon" />
              </div>
              <h3>Make a Direct Impact</h3>
              <p>Help animals find loving homes and improve their quality of life while they wait.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="src/assets/images/volunteer-img/pet-care.png" alt="Heart icon" />
              </div>
              <h3>Build Connections</h3>
              <p>Meet like-minded animal lovers and become part of our compassionate community.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="src/assets/images/volunteer-img/skill.png" alt="Skill icon" />
              </div>
              <h3>Gain New Skills</h3>
              <p>Develop valuable experience while contributing to a meaningful cause.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="src/assets/images/volunteer-img/welfare.png" alt="Wellbeing icon" />
              </div>
              <h3>Improve Wellbeing</h3>
              <p>Volunteering with animals has been shown to reduce stress and increase happiness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="volunteer-opportunities">
        <div className="container">
          <div className="section-header">
            <h2>Volunteer Opportunities</h2>
            <p>There are many ways to help, regardless of your schedule or experience</p>
          </div>
          
          <div className="opportunities-grid">
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/animalcare.jpg" alt="Animal care volunteer" />
              <div className="opportunity-content">
                <h3>Animal Care</h3>
                <p>Help with daily care routines including feeding, walking, grooming, and socializing with animals.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> 3-4 hours per week</li>
                  <li><strong>Training:</strong> Provided on-site</li>
                  <li><strong>Skills Needed:</strong> Comfort around animals, basic physical fitness</li>
                </ul>
              </div>
            </div>
            
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/fostercare.jpg" alt="Foster volunteer" />
              <div className="opportunity-content">
                <h3>Foster Program</h3>
                <p>Provide temporary homes for animals awaiting adoption, including those needing special care.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> 2-8 weeks per animal</li>
                  <li><strong>Training:</strong> Initial home visit and training session</li>
                  <li><strong>Skills Needed:</strong> Safe home environment, pet care experience</li>
                </ul>
              </div>
            </div>
            
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/eventsup.jpg" alt="Event volunteer" />
              <div className="opportunity-content">
                <h3>Event Support</h3>
                <p>Help with adoption events, fundraisers, and community outreach programs.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> Event-based (typically 4-8 hours)</li>
                  <li><strong>Training:</strong> Pre-event briefing</li>
                  <li><strong>Skills Needed:</strong> People skills, enthusiasm</li>
                </ul>
              </div>
            </div>
            
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/petphotographer.jpg" alt="Photographer volunteer" />
              <div className="opportunity-content">
                <h3>Photography & Social Media</h3>
                <p>Take photos of adoptable pets or help manage our social media presence.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> Flexible hours</li>
                  <li><strong>Training:</strong> Guidelines provided</li>
                  <li><strong>Skills Needed:</strong> Photography or social media experience</li>
                </ul>
              </div>
            </div>
            
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/Adminsup.jpg" alt="Administrative volunteer" />
              <div className="opportunity-content">
                <h3>Administrative Support</h3>
                <p>Assist with office tasks, answering calls, processing applications, and data entry.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> 2-4 hours per week</li>
                  <li><strong>Training:</strong> Provided on-site</li>
                  <li><strong>Skills Needed:</strong> Basic computer literacy, organization</li>
                </ul>
              </div>
            </div>
            
            <div className="opportunity-card">
              <img src="src/assets/images/volunteer-img/transport.jpg" alt="Transport volunteer" />
              <div className="opportunity-content">
                <h3>Transport Team</h3>
                <p>Help transport animals to vet appointments, adoption events, or foster homes.</p>
                <ul className="opportunity-details">
                  <li><strong>Time Commitment:</strong> As needed basis</li>
                  <li><strong>Training:</strong> Brief orientation</li>
                  <li><strong>Skills Needed:</strong> Valid driver's license, reliable vehicle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Stories Section */}
      <section className="volunteer-stories">
        <div className="container">
          <div className="section-header">
            <h2>Volunteer Stories</h2>
            <p>Hear from the amazing people who help make our mission possible</p>
          </div>
          
          <div className="stories-carousel">
            <div className="story-card">
              <div className="story-photo">
                <img src="src/assets/images/volunteer-img/womenvol.jpg" alt="Volunteer Sarah" />
              </div>
              <div className="story-content">
                <h3>Sarah's Story</h3>
                <p className="volunteer-role">Foster Coordinator • Volunteer since 2021</p>
                <p className="story-quote">
                  "Volunteering with PawFinder has been one of the most rewarding experiences of my life. 
                  Seeing animals transform from scared and shut-down to happy and confident 
                  in their foster homes is something I'll never tire of witnessing."
                </p>
              </div>
            </div>
            
            <div className="story-card">
              <div className="story-photo">
                <img src="src/assets/images/volunteer-img/handsome-young-guy-with-glasses-posing.jpg" alt="Volunteer Michael" />
              </div>
              <div className="story-content">
                <h3>Michael's Story</h3>
                <p className="volunteer-role">Weekend Dog Walker • Volunteer since 2022</p>
                <p className="story-quote">
                  "I started volunteering because I couldn't have a dog in my apartment. 
                  Now, I have 'weekend dogs' that I look forward to seeing every Saturday. 
                  It's the highlight of my week, and I've made great friends with the other volunteers."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Process Section */}
      <section className="volunteer-process">
        <div className="container">
          <div className="section-header">
            <h2>How to Get Started</h2>
            <p>Becoming a volunteer is easy! Here's what to expect:</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Apply</h3>
              <p>Fill out our volunteer application form with your interests and availability.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Orientation</h3>
              <p>Attend a volunteer orientation session to learn about our mission and policies.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Training</h3>
              <p>Complete role-specific training for your area of interest.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Start Volunteering</h3>
              <p>Begin making a difference in the lives of animals in need!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="volunteer-application" id="volunteer-form">
        <div className="container">
          <div className="section-header">
            <h2>Volunteer Application</h2>
            <p>Ready to join our team? Fill out the form below to get started!</p>
          </div>
          
          {formSubmitted ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Thank You for Your Interest!</h3>
              <p>Your volunteer application has been received. A member of our team will contact you within 2-3 business days to discuss the next steps.</p>
              <button 
                className="button primary-button" 
                onClick={() => setFormSubmitted(false)}
                style={{ marginTop: '20px' }}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form className="volunteer-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Areas of Interest <span className="required">*</span></label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Animal Care"
                      checked={formData.interests.includes('Animal Care')}
                      onChange={handleCheckboxChange}
                    />
                    Animal Care
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Foster Program"
                      checked={formData.interests.includes('Foster Program')}
                      onChange={handleCheckboxChange}
                    />
                    Foster Program
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Event Support"
                      checked={formData.interests.includes('Event Support')}
                      onChange={handleCheckboxChange}
                    />
                    Event Support
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Photography & Social Media"
                      checked={formData.interests.includes('Photography & Social Media')}
                      onChange={handleCheckboxChange}
                    />
                    Photography & Social Media
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Administrative Support"
                      checked={formData.interests.includes('Administrative Support')}
                      onChange={handleCheckboxChange}
                    />
                    Administrative Support
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value="Transport Team"
                      checked={formData.interests.includes('Transport Team')}
                      onChange={handleCheckboxChange}
                    />
                    Transport Team
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="experience">Relevant Experience</label>
                <textarea 
                  id="experience" 
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Tell us about any experience you have with animals or in your areas of interest."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Availability <span className="required">*</span></label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="Weekday Mornings"
                      checked={formData.availability.includes('Weekday Mornings')}
                      onChange={handleCheckboxChange}
                    />
                    Weekday Mornings
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="Weekday Afternoons"
                      checked={formData.availability.includes('Weekday Afternoons')}
                      onChange={handleCheckboxChange}
                    />
                    Weekday Afternoons
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="Weekday Evenings"
                      checked={formData.availability.includes('Weekday Evenings')}
                      onChange={handleCheckboxChange}
                    />
                    Weekday Evenings
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="Weekend Mornings"
                      checked={formData.availability.includes('Weekend Mornings')}
                      onChange={handleCheckboxChange}
                    />
                    Weekend Mornings
                  </label>
                  
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="availability" 
                      value="Weekend Afternoons"
                      checked={formData.availability.includes('Weekend Afternoons')}
                      onChange={handleCheckboxChange}
                    />
                    Weekend Afternoons
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Additional Information</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Is there anything else you'd like us to know about your interest in volunteering?"
                ></textarea>
              </div>
              
              <div className="form-submit">
                <button type="submit" className="button primary-button">Submit Application</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="volunteer-faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Get answers to common questions about volunteering with PawFinder</p>
          </div>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3>Do I need prior experience to volunteer?</h3>
              <p>No prior experience is required for most volunteer positions. We provide training for all roles. Your passion for animals and willingness to learn is what matters most!</p>
            </div>
            
            <div className="faq-item">
              <h3>Is there a minimum age requirement?</h3>
              <p>Volunteers must be at least 16 years old to volunteer independently. Youth aged 12-15 can volunteer with a parent or guardian as a supervising adult volunteer.</p>
            </div>
            
            <div className="faq-item">
              <h3>How much time do I need to commit?</h3>
              <p>Time commitments vary by role. Some positions require regular weekly shifts, while others can be more flexible. We appreciate any time you can give, and we'll work with your schedule.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I volunteer if I have allergies to animals?</h3>
              <p>Yes! We have many roles that don't require direct animal contact, such as administrative support, fundraising, event planning, and social media management.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do I need to live near a shelter to volunteer?</h3>
              <p>While some roles require on-site presence, we also have virtual volunteer opportunities including social media support, graphic design, and fundraising assistance.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I volunteer as part of a group or corporate team?</h3>
              <p>Absolutely! We welcome group and corporate volunteer opportunities. Contact us directly to arrange a customized volunteer experience for your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="volunteer-contact">
        <div className="container">
          <div className="contact-content">
            <h2>Still Have Questions?</h2>
            <p>Reach out to our volunteer coordinator for more information:</p>
            <div className="contact-details">
              <p><strong>Email:</strong> <a href="mailto:volunteer@pawfinder.com">volunteer@pawfinder.com</a></p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;