import React from 'react';
import './VaccinationInfo.css';

const VaccinationInfo: React.FC = () => {
  return (
    <div className="vaccination-container">
      {/* Hero Section */}
      <section className="vaccination-hero">
        <div className="vaccination-hero-content">
          <h1>Pet Vaccination Programs</h1>
          <p className="vaccination-subtitle">Protecting your pet against preventable diseases</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="vaccination-info-section">
        <div className="vaccination-section-header">
          <h2>Why Vaccinations Matter</h2>
          <p>Essential protection for your pet's health</p>
        </div>

        <div className="vaccination-content">
          <div className="vaccination-text-block">
            <p>Vaccinations are a crucial part of preventive healthcare for pets. They help protect against serious and sometimes fatal diseases by stimulating the immune system to create defenses against specific infections.</p>
            
            <p>Vaccines contain antigens that resemble disease-causing organisms but don't cause illness. When administered, they trigger immune responses that prepare the body to fight future infections.</p>
            
            <p>Regular vaccinations not only protect your pet but also contribute to community health by preventing the spread of contagious diseases to other animals and, in some cases like rabies, to humans.</p>
          </div>
        </div>
      </section>

      {/* Dog Vaccination Schedule */}
      <section className="vaccination-info-section alternate-bg">
        <div className="vaccination-section-header">
          <h2>Dog Vaccination Schedule</h2>
          <p>Recommended immunizations based on age</p>
        </div>

        <div className="vaccination-content">
          <div className="vaccination-schedule">
            <table>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Core Vaccines</th>
                  <th>Non-Core Vaccines (Based on Risk)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6-8 weeks</td>
                  <td>
                    <ul>
                      <li>Distemper</li>
                      <li>Parvovirus</li>
                      <li>Adenovirus (Hepatitis)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Bordetella (Kennel Cough)</li>
                      <li>Parainfluenza</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>10-12 weeks</td>
                  <td>
                    <ul>
                      <li>DHPP (Distemper, Hepatitis, Parainfluenza, Parvo) booster</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Bordetella</li>
                      <li>Leptospirosis</li>
                      <li>Lyme (if in endemic area)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>16 weeks</td>
                  <td>
                    <ul>
                      <li>DHPP booster</li>
                      <li>Rabies (first dose)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Leptospirosis booster</li>
                      <li>Lyme booster</li>
                      <li>Canine Influenza</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>12-16 months</td>
                  <td>
                    <ul>
                      <li>DHPP booster</li>
                      <li>Rabies booster</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Bordetella (annual or biannual)</li>
                      <li>Leptospirosis annual booster</li>
                      <li>Lyme annual booster</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Adult (1-3 years)</td>
                  <td>
                    <ul>
                      <li>DHPP (1-3 year intervals)</li>
                      <li>Rabies (1-3 year intervals, as required by law)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Bordetella (annual or biannual)</li>
                      <li>Leptospirosis (annual)</li>
                      <li>Lyme (annual, if in endemic area)</li>
                      <li>Canine Influenza (annual, if at risk)</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cat Vaccination Schedule */}
      <section className="vaccination-info-section">
        <div className="vaccination-section-header">
          <h2>Cat Vaccination Schedule</h2>
          <p>Recommended immunizations based on age</p>
        </div>

        <div className="vaccination-content">
          <div className="vaccination-schedule">
            <table>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Core Vaccines</th>
                  <th>Non-Core Vaccines (Based on Risk)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6-8 weeks</td>
                  <td>
                    <ul>
                      <li>FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>FeLV (Feline Leukemia Virus) for at-risk kittens</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>10-12 weeks</td>
                  <td>
                    <ul>
                      <li>FVRCP booster</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>FeLV booster</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>14-16 weeks</td>
                  <td>
                    <ul>
                      <li>FVRCP booster</li>
                      <li>Rabies (first dose)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>FeLV final kitten booster</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>12-16 months</td>
                  <td>
                    <ul>
                      <li>FVRCP booster</li>
                      <li>Rabies booster</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>FeLV (for at-risk cats)</li>
                      <li>FIV (Feline Immunodeficiency Virus, if at risk)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Adult (1-3 years)</td>
                  <td>
                    <ul>
                      <li>FVRCP (1-3 year intervals)</li>
                      <li>Rabies (1-3 year intervals, as required by law)</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>FeLV (annual, for at-risk cats)</li>
                      <li>Bordetella (for cats in boarding facilities)</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Vaccines Information */}
      <section className="vaccination-info-section alternate-bg">
        <div className="vaccination-section-header">
          <h2>Understanding Common Vaccines</h2>
          <p>What each vaccine protects against</p>
        </div>

        <div className="vaccination-content">
          <div className="vaccination-info-grid">
            <div className="vaccination-card">
              <h3>Rabies</h3>
              <p><strong>For:</strong> Dogs, Cats</p>
              <p><strong>Protects Against:</strong> Rabies virus, which attacks the central nervous system and is fatal. Transmissible to humans.</p>
              <p><strong>Legal Requirement:</strong> Yes, in most areas</p>
            </div>

            <div className="vaccination-card">
              <h3>DHPP (Dogs)</h3>
              <p><strong>For:</strong> Dogs</p>
              <p><strong>Protects Against:</strong></p>
              <ul>
                <li><strong>D:</strong> Distemper - Affects respiratory, gastrointestinal, and nervous systems</li>
                <li><strong>H:</strong> Hepatitis - Infectious liver disease</li>
                <li><strong>P:</strong> Parainfluenza - Respiratory infection</li>
                <li><strong>P:</strong> Parvovirus - Severe, often fatal gastrointestinal disease</li>
              </ul>
            </div>

            <div className="vaccination-card">
              <h3>FVRCP (Cats)</h3>
              <p><strong>For:</strong> Cats</p>
              <p><strong>Protects Against:</strong></p>
              <ul>
                <li><strong>FVR:</strong> Feline Viral Rhinotracheitis - Upper respiratory infection</li>
                <li><strong>C:</strong> Calicivirus - Respiratory infection and oral disease</li>
                <li><strong>P:</strong> Panleukopenia - Severe, often fatal gastrointestinal disease</li>
              </ul>
            </div>

            <div className="vaccination-card">
              <h3>Bordetella</h3>
              <p><strong>For:</strong> Dogs, sometimes Cats</p>
              <p><strong>Protects Against:</strong> Kennel cough, a highly contagious respiratory infection</p>
              <p><strong>When Needed:</strong> For pets that visit boarding facilities, grooming salons, dog parks, or training classes</p>
            </div>

            <div className="vaccination-card">
              <h3>Leptospirosis</h3>
              <p><strong>For:</strong> Dogs</p>
              <p><strong>Protects Against:</strong> Bacterial infection that affects kidneys and liver. Can be transmitted to humans.</p>
              <p><strong>When Needed:</strong> For dogs with outdoor lifestyles, especially around water or wildlife</p>
            </div>

            <div className="vaccination-card">
              <h3>Feline Leukemia (FeLV)</h3>
              <p><strong>For:</strong> Cats</p>
              <p><strong>Protects Against:</strong> Viral infection that suppresses immune system and can lead to cancer</p>
              <p><strong>When Needed:</strong> For outdoor cats or those exposed to outdoor cats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vaccination Considerations */}
      <section className="vaccination-info-section">
        <div className="vaccination-section-header">
          <h2>Important Considerations</h2>
          <p>Working with your veterinarian for personalized care</p>
        </div>

        <div className="vaccination-content">
          <div className="vaccination-considerations-grid">
            <div className="vaccination-consideration-item">
              <h3>Individual Risk Assessment</h3>
              <p>Your pet's vaccination needs should be tailored to their specific lifestyle, environment, and health status. Factors like indoor vs. outdoor living, travel plans, and local disease prevalence all influence which vaccines are necessary.</p>
            </div>

            <div className="vaccination-consideration-item">
              <h3>Medical History</h3>
              <p>Some pets may have medical conditions or histories of vaccine reactions that require special consideration. Always inform your veterinarian about your pet's complete medical history.</p>
            </div>

            <div className="vaccination-consideration-item">
              <h3>Age Considerations</h3>
              <p>Very young, senior, or immunocompromised pets may need adjusted vaccination protocols. Your veterinarian can determine the safest approach.</p>
            </div>

            <div className="vaccination-consideration-item">
              <h3>Local Regulations</h3>
              <p>Some vaccines, like rabies, are legally required in most areas. Requirements may vary by location, so check with local authorities or your veterinarian.</p>
            </div>

            <div className="vaccination-consideration-item">
              <h3>Vaccination Documentation</h3>
              <p>Keep detailed records of your pet's vaccinations for boarding, grooming, travel, or emergency situations. Many facilities require proof of current vaccination.</p>
            </div>

            <div className="vaccination-consideration-item">
              <h3>Potential Side Effects</h3>
              <p>Most pets experience minimal or no side effects from vaccines. Some may have mild lethargy or soreness at the injection site. Contact your veterinarian if you notice concerning symptoms after vaccination.</p>
            </div>
          </div>

          <div className="vaccination-vet-consultation">
            <h3>The Importance of Veterinary Consultation</h3>
            <p>While these guidelines provide general information, nothing replaces personalized advice from a veterinarian who knows your pet. Regular veterinary consultations ensure your pet receives the most appropriate preventive care for their specific circumstances.</p>
            <p>Your veterinarian can help you develop a vaccination schedule that provides necessary protection without over-vaccinating, balancing disease risk with your pet's individual health needs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="vaccination-cta">
        <div className="vaccination-cta-content">
          <h2>Need to Update Your Pet's Vaccinations?</h2>
          <p>Consult with a qualified veterinarian about your pet's specific needs</p>
          <div className="vaccination-buttons">
            <a href="/find-vet" className="vaccination-button vaccination-primary-button">Find a Veterinarian</a>
            <a href="/vaccination-schedule.pdf" className="vaccination-button vaccination-secondary-button">Download Vaccine Schedule</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VaccinationInfo;