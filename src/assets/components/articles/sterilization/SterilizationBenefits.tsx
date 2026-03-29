import React from 'react';
import './SterilizationBenefits.css';
import { FaPaw, FaHeartbeat, FaClinicMedical, FaGlobe, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SterilizationBenefits: React.FC = () => {
  return (
    <div className="article-container">
      <Link to="/health" className="article-back-button">
        <FaArrowLeft /> Back to Health & Wellness
      </Link>

      <div className="article-hero">
        <h1>Sterilization Saves Lives</h1>
        <p className="article-subtitle">Understanding the health benefits and social impact of spaying and neutering your pets</p>
      </div>

      <div className="article-content">
        <section className="article-section">
          <h2>Why Sterilization Matters</h2>
          <p>
            Spaying and neutering (sterilization) are among the most important decisions you can make for your pet's health 
            and wellbeing. Beyond preventing unwanted litters, these routine procedures have far-reaching benefits for your 
            pet, your family, and your community.
          </p>
          <p>
            Every year, millions of healthy dogs and cats are euthanized in shelters worldwide simply because there 
            aren't enough homes for them all. By choosing to sterilize your pet, you directly contribute to reducing 
            this overwhelming number and help break the cycle of pet homelessness.
          </p>
          
          <div className="article-callout">
            <h3><FaGlobe /> The Impact of Overpopulation</h3>
            <p>
              A single unspayed female cat and her offspring can theoretically produce 420,000 kittens over a seven-year period. 
              For dogs, one unspayed female and her offspring can produce up to 67,000 puppies in six years.
            </p>
          </div>
        </section>

        <section className="article-section">
          <h2>Health Benefits for Your Pet</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><FaHeartbeat /></div>
              <h3>For Female Pets</h3>
              <ul>
                <li>Eliminates the risk of uterine infections (pyometra)</li>
                <li>Prevents ovarian and uterine cancers</li>
                <li>Significantly reduces the risk of mammary tumors (breast cancer)</li>
                <li>No heat cycles, reducing stress and discomfort</li>
                <li>Prevents complications from pregnancy and birth</li>
              </ul>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon"><FaHeartbeat /></div>
              <h3>For Male Pets</h3>
              <ul>
                <li>Eliminates the risk of testicular cancer</li>
                <li>Reduces the risk of prostate problems</li>
                <li>Decreases aggressive behavior in many cases</li>
                <li>Reduces the urge to roam, lowering the risk of injury</li>
                <li>Prevents marking and spraying behaviors in many animals</li>
              </ul>
            </div>
          </div>
          
          <div className="expert-quote">
            <p>
              "Early spaying of female dogs before their first heat cycle can reduce the risk of mammary tumors by 99.5%. 
              This is a simple decision that can literally save your pet's life."
            </p>
            <cite>— Dr. Sarah Williams, Veterinary Oncologist</cite>
          </div>
        </section>

        <section className="article-section">
          <h2>Common Myths About Sterilization</h2>
          
          <div className="myths-facts">
            <div className="myth">
              <h3>Myth: My pet will become overweight after sterilization</h3>
              <p>
                <strong>Fact:</strong> Weight gain is related to overeating and lack of exercise, not sterilization. 
                Monitoring diet and providing regular exercise will keep your pet at a healthy weight.
              </p>
            </div>
            
            <div className="myth">
              <h3>Myth: Female pets should have one litter before spaying</h3>
              <p>
                <strong>Fact:</strong> There is no scientific evidence that having a litter benefits a pet's health or behavior. 
                In fact, spaying before the first heat cycle provides the greatest health benefits.
              </p>
            </div>
            
            <div className="myth">
              <h3>Myth: Sterilization changes a pet's personality</h3>
              <p>
                <strong>Fact:</strong> Your pet's fundamental personality will not change. Behavioral changes are typically positive, 
                reducing unwanted behaviors like aggression, roaming, and urine marking.
              </p>
            </div>
            
            <div className="myth">
              <h3>Myth: Sterilization is expensive</h3>
              <p>
                <strong>Fact:</strong> Many communities offer low-cost sterilization programs. The cost of spaying/neutering 
                is far less than caring for a litter or treating conditions that sterilization helps prevent.
              </p>
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>When to Sterilize Your Pet</h2>
          <p>
            The ideal age for sterilization depends on several factors including species, breed, size, and individual health considerations. 
            For many pets, the procedure can be safely performed as early as 8 weeks of age, though most veterinarians recommend 
            between 4-6 months.
          </p>
          
          <div className="timing-guidelines">
            <div className="timing-card">
              <h3>Dogs:</h3>
              <ul>
                <li>Small breeds: 6-9 months of age</li>
                <li>Medium breeds: 6-12 months of age</li>
                <li>Large/giant breeds: Consult your veterinarian, as timing may affect growth</li>
              </ul>
            </div>
            
            <div className="timing-card">
              <h3>Cats:</h3>
              <ul>
                <li>Generally recommended at 4-6 months before first heat cycle</li>
                <li>Can be safely performed as early as 8 weeks of age in many cases</li>
              </ul>
            </div>
          </div>
          
          <p>
            Always consult with your veterinarian to determine the best timing for your specific pet's needs.
          </p>
        </section>

        <section className="article-section">
          <h2>The Procedure: What to Expect</h2>
          
          <div className="procedure-steps">
            <div className="step">
              <h3>Pre-Surgery</h3>
              <p>
                Your veterinarian will likely perform a physical examination and may recommend blood work to ensure your pet is 
                healthy enough for anesthesia. You'll receive instructions about fasting before surgery.
              </p>
            </div>
            
            <div className="step">
              <h3>During Surgery</h3>
              <p>
                <strong>Spaying (females):</strong> This procedure, called an ovariohysterectomy, removes the ovaries and uterus. 
                It typically takes 20-90 minutes depending on the animal's size, age, and species.
              </p>
              <p>
                <strong>Neutering (males):</strong> This procedure removes the testicles and typically takes 5-20 minutes.
              </p>
              <p>
                Both procedures are performed under general anesthesia with careful monitoring throughout.
              </p>
            </div>
            
            <div className="step">
              <h3>Recovery</h3>
              <p>
                Most pets go home the same day. Recovery typically takes 7-14 days, during which activity should be limited. 
                Your veterinarian will provide specific aftercare instructions and may prescribe pain medication.
              </p>
            </div>
          </div>
          
          <div className="article-callout">
            <h3><FaClinicMedical /> Recovery Support</h3>
            <p>
              Create a quiet, comfortable recovery space for your pet, and use an Elizabethan collar (cone) if necessary 
              to prevent licking or chewing at the incision site. Monitor the incision daily for signs of redness, 
              swelling, or discharge.
            </p>
          </div>
        </section>

        <section className="article-section">
          <h2>Community Impact</h2>
          <p>
            The benefits of sterilization extend far beyond your individual pet. By choosing to spay or neuter, you're 
            contributing to a more humane and sustainable approach to pet population management.
          </p>
          
          <div className="community-benefits">
            <div className="benefit">
              <h3>Reducing Shelter Populations</h3>
              <p>
                Fewer unwanted litters mean fewer animals entering already overcrowded shelters, reducing euthanasia rates 
                and allowing resources to go further for animals in need.
              </p>
            </div>
            
            <div className="benefit">
              <h3>Improving Public Health</h3>
              <p>
                Sterilized pets are less likely to roam, reducing the number of strays and feral animals that can spread 
                disease or cause other community issues.
              </p>
            </div>
            
            <div className="benefit">
              <h3>Saving Taxpayer Money</h3>
              <p>
                Public animal control and sheltering costs are significantly reduced in communities with high sterilization rates.
              </p>
            </div>
          </div>
          
          <div className="impact-stats">
            <div className="stat">
              <h3>7.6 Million</h3>
              <p>Animals enter shelters in the U.S. every year</p>
            </div>
            
            <div className="stat">
              <h3>2.7 Million</h3>
              <p>Healthy, adoptable animals are euthanized annually</p>
            </div>
            
            <div className="stat">
              <h3>90%</h3>
              <p>Reduction in unwanted litters possible through widespread sterilization</p>
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>Finding Affordable Options</h2>
          <p>
            Cost should never be a barrier to sterilizing your pet. Many communities offer resources to make these 
            procedures accessible to all pet owners:
          </p>
          
          <ul className="resources-list">
            <li>Low-cost spay/neuter clinics</li>
            <li>Voucher programs through local animal welfare organizations</li>
            <li>Mobile sterilization clinics</li>
            <li>Shelter programs that include sterilization in adoption fees</li>
            <li>Veterinary schools that offer discounted services</li>
          </ul>
          
          <p>
            Contact your local animal shelter, humane society, or veterinary clinic to learn about affordable options in your area.
          </p>
        </section>

        <div className="article-conclusion">
          <h2>Take Action Today</h2>
          <p>
            Sterilizing your pet is one of the most important and responsible decisions you can make as a pet owner. 
            The procedure is safe, effective, and provides lifelong benefits to your pet, your family, and your community.
          </p>
          <p>
            Talk to your veterinarian about the best timing and options for your pet, and be part of the solution to 
            pet homelessness and overpopulation.
          </p>
          <div className="conclusion-cta">
            <h3><FaPaw /> Make a Difference</h3>
            <p>
              If you've already sterilized your pets, consider supporting local organizations that provide these services 
              to pets in need through donations or volunteering.
            </p>
            <a href="/clinics" className="button primary-button">Find a Veterinarian</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SterilizationBenefits;