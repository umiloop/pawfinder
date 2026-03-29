import React from 'react';
import './CheckupsInfo.css';

const CheckupsInfo: React.FC = () => {
  return (
    <div className="checkups-container">
      {/* Hero Section */}
      <section className="checkups-hero">
        <div className="checkups-hero-content">
          <h1>Pet Health Checkups</h1>
          <p className="checkups-subtitle">Essential preventive care for your pet's wellbeing</p>
        </div>
      </section>

      {/* Why Regular Checkups Section */}
      <section className="checkups-info-section">
        <div className="checkups-section-header">
          <h2>Why Regular Checkups Are Important</h2>
          <p>Prevention is better than treatment</p>
        </div>

        <div className="checkups-content">
          <div className="checkups-info-grid">
            <div className="checkups-card">
              <div className="checkups-icon">
                <img src="src/assets/images/chekup-info/calendar_17579917.png" alt="Early Detection" />
              </div>
              <h3>Early Detection</h3>
              <p>Regular checkups allow veterinarians to catch health issues before they become serious problems. Many conditions are treatable when caught early.</p>
            </div>

            <div className="checkups-card">
              <div className="checkups-icon">
                <img src="src/assets/images/chekup-info/heart_17325556.png" alt="Preventive Care" />
              </div>
              <h3>Preventive Care</h3>
              <p>Checkups include preventive measures like vaccinations, parasite control, and dental assessments that keep your pet healthy and happy.</p>
            </div>

            <div className="checkups-card">
              <div className="checkups-icon">
                <img src="src/assets/images/chekup-info/petinsurance.png" alt="Cost Savings" />
              </div>
              <h3>Long-term Savings</h3>
              <p>Prevention is less expensive than treating advanced disease. Regular checkups can save you money in the long run.</p>
            </div>

            <div className="checkups-card">
              <div className="checkups-icon">
                <img src="src/assets/images/chekup-info/growth.png" alt="Track Growth" />
              </div>
              <h3>Track Development</h3>
              <p>Regular visits help monitor your pet's growth, weight changes, and age-related developments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens During a Vet Visit */}
      <section className="checkups-info-section alternate-bg">
        <div className="checkups-section-header">
          <h2>What a Typical Vet Visit Includes</h2>
          <p>Understanding what to expect during checkups</p>
        </div>

        <div className="checkups-content">
          <div className="checkups-visit-steps">
            <div className="checkups-visit-step">
              <h3>Physical Examination</h3>
              <ul>
                <li>Weight and temperature measurement</li>
                <li>Heart and lung auscultation</li>
                <li>Eye, ear, and oral cavity inspection</li>
                <li>Skin and coat assessment</li>
                <li>Lymph node palpation</li>
                <li>Abdominal palpation</li>
                <li>Joint and muscle evaluation</li>
              </ul>
            </div>

            <div className="checkups-visit-step">
              <h3>Preventive Care</h3>
              <ul>
                <li>Vaccination updates</li>
                <li>Parasite control (fleas, ticks, heartworm, intestinal worms)</li>
                <li>Dental assessment and care recommendations</li>
                <li>Nutrition consultation</li>
              </ul>
            </div>

            <div className="checkups-visit-step">
              <h3>Diagnostic Screening</h3>
              <ul>
                <li>Blood tests for older pets or specific concerns</li>
                <li>Fecal examination</li>
                <li>Urinalysis when indicated</li>
                <li>Other specialized tests as needed</li>
              </ul>
            </div>

            <div className="checkups-visit-step">
              <h3>Discussion and Planning</h3>
              <ul>
                <li>Review of findings</li>
                <li>Behavioral concerns</li>
                <li>Lifestyle assessment</li>
                <li>Treatment recommendations</li>
                <li>Follow-up planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Checkup Frequency Section */}
      <section className="checkups-info-section">
        <div className="checkups-section-header">
          <h2>How Often Pets Should Get Checked</h2>
          <p>Recommended schedules based on age and species</p>
        </div>

        <div className="checkups-content">
          <div className="checkups-tables">
            <div className="checkups-pet-table">
              <h3>Dogs</h3>
              <table>
                <thead>
                  <tr>
                    <th>Life Stage</th>
                    <th>Age</th>
                    <th>Checkup Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Puppies</td>
                    <td>0-16 weeks</td>
                    <td>Every 3-4 weeks for vaccinations</td>
                  </tr>
                  <tr>
                    <td>Adolescents</td>
                    <td>4-12 months</td>
                    <td>Every 3-6 months</td>
                  </tr>
                  <tr>
                    <td>Adults</td>
                    <td>1-7 years</td>
                    <td>Annually</td>
                  </tr>
                  <tr>
                    <td>Seniors</td>
                    <td>7+ years (varies by breed)</td>
                    <td>Every 6 months</td>
                  </tr>
                  <tr>
                    <td>With chronic conditions</td>
                    <td>Any age</td>
                    <td>As recommended by veterinarian</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="checkups-pet-table">
              <h3>Cats</h3>
              <table>
                <thead>
                  <tr>
                    <th>Life Stage</th>
                    <th>Age</th>
                    <th>Checkup Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kittens</td>
                    <td>0-16 weeks</td>
                    <td>Every 3-4 weeks for vaccinations</td>
                  </tr>
                  <tr>
                    <td>Adolescents</td>
                    <td>4-12 months</td>
                    <td>Every 3-6 months</td>
                  </tr>
                  <tr>
                    <td>Adults</td>
                    <td>1-10 years</td>
                    <td>Annually</td>
                  </tr>
                  <tr>
                    <td>Seniors</td>
                    <td>10+ years</td>
                    <td>Every 6 months</td>
                  </tr>
                  <tr>
                    <td>With chronic conditions</td>
                    <td>Any age</td>
                    <td>As recommended by veterinarian</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="checkups-note">
            <p><strong>Note:</strong> These are general guidelines. Individual needs may vary based on breed, health status, and lifestyle. Always follow your veterinarian's specific recommendations.</p>
          </div>
        </div>
      </section>

      {/* DIY Home Health Checks Section */}
      <section className="checkups-info-section alternate-bg">
        <div className="checkups-section-header">
          <h2>DIY Home Health Checks</h2>
          <p>Monitor your pet's health between veterinary visits</p>
        </div>

        <div className="checkups-content">
          <div className="checkups-diy">
            <div className="checkups-check-item">
              <h3>Weekly Checks</h3>
              <ul>
                <li><strong>Eyes:</strong> Clear, bright, no discharge or redness</li>
                <li><strong>Ears:</strong> Clean, no odor or excessive wax</li>
                <li><strong>Nose:</strong> Moist (dogs), no discharge</li>
                <li><strong>Teeth and gums:</strong> Clean teeth, pink gums</li>
                <li><strong>Coat:</strong> Shiny, no bald spots, excessive shedding or dandruff</li>
                <li><strong>Skin:</strong> No lumps, bumps, or areas of tenderness</li>
                <li><strong>Paws:</strong> Clean, no cracked pads or overgrown nails</li>
              </ul>
            </div>

            <div className="checkups-check-item">
              <h3>Daily Monitoring</h3>
              <ul>
                <li><strong>Appetite:</strong> Eating normally for their age and size</li>
                <li><strong>Water intake:</strong> Consistent, neither excessive nor decreased</li>
                <li><strong>Urination:</strong> Normal frequency, amount, and color</li>
                <li><strong>Bowel movements:</strong> Regular, formed stools</li>
                <li><strong>Energy level:</strong> Consistent with their normal behavior</li>
                <li><strong>Breathing:</strong> Regular, not labored or rapid when resting</li>
              </ul>
            </div>
          </div>

          <div className="checkups-warning">
            <h3>Warning Signs to Call Your Vet</h3>
            <div className="checkups-warning-grid">
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Vomiting or diarrhea that lasts more than 24 hours</p>
              </div>
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Significant increase or decrease in water consumption or urination</p>
              </div>
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Lethargy or depression lasting more than 24 hours</p>
              </div>
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Loss of appetite for more than 24 hours</p>
              </div>
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Difficulty breathing, persistent coughing or gagging</p>
              </div>
              <div className="checkups-warning-item">
                <span className="checkups-warning-bullet">⚠️</span>
                <p>Limping or inability to use a limb</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="checkups-cta">
        <div className="checkups-cta-content">
          <h2>Ready to Schedule a Checkup?</h2>
          <p>Find a veterinary partner near you</p>
          <div className="checkups-buttons">
            <a href="/clinics" className="checkups-button checkups-primary-button">Find a Vet</a>
            <a href="/health" className="checkups-button checkups-secondary-button">More Health Resources</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckupsInfo;