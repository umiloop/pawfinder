import React from 'react';
import './AdoptDontShop.css';
import { FaHeart, FaPaw, FaHandHoldingHeart, FaHome, FaDog, FaCat, FaBalanceScale, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { MdPets, MdHealthAndSafety } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdoptDontShop: React.FC = () => {
  return (
    <div className="adopt-article-container">
      <Link to="/health" className="adopt-article-back-button">
        <FaArrowLeft /> Back to Health & Wellness
      </Link>

      <div className="adopt-article-hero">
        <h1>Adopt, Don't Shop: The Wellness Impact on You and the Animal</h1>
        <p className="adopt-article-subtitle">How rescuing a pet creates a powerful emotional wellness connection that benefits both of you</p>
      </div>

      <div className="adopt-article-content">
        <section className="adopt-article-section">
          <h2>The Adoption Connection</h2>
          <p>
            When you adopt a pet from a shelter or rescue organization, you're not just bringing home a new companion—you're 
            participating in a life-changing experience that benefits both you and your new pet in profound ways. Adoption creates a special bond 
            built on rescue, second chances, and mutual emotional healing.
          </p>
          <p>
            This unique connection forms the foundation of a relationship that can significantly enhance your emotional wellness 
            while literally saving an animal's life. The ripple effects extend far beyond your home, creating positive change 
            throughout your community.
          </p>
          
          <div className="adopt-article-callout">
            <h3><FaHeart /> A Transformative Experience</h3>
            <p>
              Studies show that adopted pets often form exceptionally strong bonds with their new families, as if they 
              understand they've been given a second chance. This gratitude manifests in loyalty, affection, and a 
              unique emotional connection that enriches both lives.
            </p>
          </div>
        </section>

        <section className="adopt-article-section">
          <h2>The Emotional Benefits for You</h2>
          
          <div className="adopt-article-benefits-grid">
            <div className="adopt-article-benefit-card">
              <div className="adopt-article-benefit-icon"><FaHandHoldingHeart /></div>
              <h3>Enhanced Mental Health</h3>
              <p>
                Adopting a pet provides significant mental health benefits that can transform your daily life:
              </p>
              <ul>
                <li>Reduced symptoms of depression and anxiety</li>
                <li>Lower stress levels and blood pressure</li>
                <li>Increased production of oxytocin, the "bonding hormone"</li>
                <li>Decreased feelings of loneliness and isolation</li>
              </ul>
            </div>
            
            <div className="adopt-article-benefit-card">
              <div className="adopt-article-benefit-icon"><MdHealthAndSafety /></div>
              <h3>Physical Health Improvements</h3>
              <p>
                The benefits of pet adoption extend to your physical wellbeing:
              </p>
              <ul>
                <li>Increased physical activity through walks and play</li>
                <li>Stronger immune system functioning</li>
                <li>Lower risk of heart disease and heart attacks</li>
                <li>More structured daily routines supporting overall health</li>
              </ul>
            </div>
          </div>
          
          <div className="adopt-article-benefits-grid">
            <div className="adopt-article-benefit-card">
              <div className="adopt-article-benefit-icon"><FaBalanceScale /></div>
              <h3>Purpose and Meaning</h3>
              <p>
                Giving a home to a shelter animal provides profound purpose:
              </p>
              <ul>
                <li>Satisfaction of making a life-saving difference</li>
                <li>Connection to a cause greater than yourself</li>
                <li>Teaching compassion and responsibility to family members</li>
                <li>Being part of the solution to animal homelessness</li>
              </ul>
            </div>
            
            <div className="adopt-article-benefit-card">
              <div className="adopt-article-benefit-icon"><MdPets /></div>
              <h3>Social Connection</h3>
              <p>
                Adopted pets can enhance your social life in unexpected ways:
              </p>
              <ul>
                <li>Meeting fellow pet owners in your community</li>
                <li>Joining adoption and rescue communities</li>
                <li>Improved social interactions and conversation starters</li>
                <li>Building relationships through volunteer opportunities</li>
              </ul>
            </div>
          </div>
          
          <div className="adopt-article-expert-quote">
            <p>
              "The human-animal bond in adoption situations is particularly powerful because there's often a mutual rescue happening. 
              The person is rescuing the animal from homelessness, while the animal is often rescuing the person from loneliness, 
              grief, or emotional struggles."
            </p>
            <cite>— Dr. Sophia Williams, Veterinary Behaviorist and Animal Welfare Advocate</cite>
          </div>
        </section>

        <section className="adopt-article-section">
          <h2>The Life-Changing Impact for Shelter Animals</h2>
          <p>
            For shelter animals, adoption isn't just about finding a home—it's about transformation, second chances, 
            and sometimes, survival itself. When you choose adoption, here's what you're providing to your new companion:
          </p>
          
          <div className="adopt-article-impact-cards">
            <div className="adopt-article-impact-card">
              <div className="adopt-article-impact-icon"><FaHome /></div>
              <h3>From Cage to Home</h3>
              <p>
                Shelter environments, even good ones, are stressful for animals. The transition from a noisy, confined space 
                to a loving home dramatically improves their mental and physical well-being, reducing stress hormones and allowing their 
                true personalities to emerge.
              </p>
            </div>
            
            <div className="adopt-article-impact-card">
              <div className="adopt-article-impact-icon"><FaHeart /></div>
              <h3>Emotional Healing</h3>
              <p>
                Many shelter animals have experienced trauma, abandonment, or neglect. A stable, loving environment allows them 
                to heal emotionally, build trust, and overcome past traumas. Over time, even the most fearful animals can 
                transform into confident, secure companions.
              </p>
            </div>
            
            <div className="adopt-article-impact-card">
              <div className="adopt-article-impact-icon"><FaPaw /></div>
              <h3>Life-Saving Opportunity</h3>
              <p>
                In shelters with high intake rates, adoption literally saves lives. Each adopted pet creates space for another 
                animal in need, potentially saving multiple lives through a single adoption. You become part of a life-saving chain reaction.
              </p>
            </div>
          </div>
          
          <div className="adopt-article-transformation">
            <h3>The Remarkable Transformation</h3>
            <div className="adopt-article-transformation-wrapper">
              <div className="adopt-article-transformation-before">
                <h4>Before Adoption</h4>
                <ul>
                  <li>Stress and anxiety in shelter environment</li>
                  <li>Limited human interaction and exercise</li>
                  <li>Potential depression and withdrawn behavior</li>
                  <li>Possible health deterioration from stress</li>
                  <li>Uncertainty about the future</li>
                </ul>
              </div>
              <div className="adopt-article-transformation-after">
                <h4>After Adoption</h4>
                <ul>
                  <li>Relaxed, comfortable, and secure in a home</li>
                  <li>Regular interaction, play, and enrichment</li>
                  <li>Emerging personality and natural behaviors</li>
                  <li>Improved health and vitality</li>
                  <li>Stability and lifetime care</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="adopt-article-section">
          <h2>The Special Bond of Adopted Pets</h2>
          <p>
            Many adopters report that rescued pets seem to possess a special understanding and gratitude for their 
            new lives. While we should be careful about attributing human emotions to animals, research and countless 
            anecdotes suggest that the bond formed through adoption has unique qualities:
          </p>
          
          <div className="adopt-article-stories-grid">
            <div className="adopt-article-story-card">
              <h3>Emma's Story</h3>
              <p>
                "After losing my husband, the silence in our home was unbearable. Adopting Max, a senior shepherd mix who had been 
                overlooked at the shelter for months, changed everything. It was as if he understood grief—he would quietly 
                rest his head on my lap when I was having difficult moments. We healed together, two souls finding comfort 
                in each other's company. Today, we're both thriving in ways I couldn't have imagined."
              </p>
              <cite>— Emma, 68</cite>
            </div>
            
            <div className="adopt-article-story-card">
              <h3>The Martinez Family</h3>
              <p>
                "Our daughter Sophia was diagnosed with anxiety disorder at age 10. After consulting with her therapist, 
                we adopted Luna, a calm adult cat who had been surrendered when her elderly owner passed away. The transformation 
                in Sophia was remarkable—Luna seemed to sense when anxiety attacks were coming and would gently climb into Sophia's lap. 
                Their connection has helped Sophia develop coping mechanisms that no therapy alone could provide."
              </p>
              <cite>— The Martinez Family</cite>
            </div>
            
            <div className="adopt-article-story-card">
              <h3>Jake's Journey</h3>
              <p>
                "As a veteran with PTSD, I struggled with reintegrating into civilian life. Adopting Buddy, a mixed breed with his own 
                trauma history, gave me purpose. We were both hypervigilant and anxious at first, but somehow we understood each other. 
                Training and caring for him gave me structure, and his progress mirrored my own healing. Six years later, we're both 
                unrecognizable from those first tentative days together."
              </p>
              <cite>— Jake, Marine Corps Veteran</cite>
            </div>
          </div>
        </section>

        <section className="adopt-article-section">
          <h2>Adoption vs. Shopping: Making an Informed Choice</h2>
          <p>
            Understanding the differences between adopting from a shelter and purchasing from a breeder or store helps 
            you make an informed decision that aligns with your values:
          </p>
          
          <div className="adopt-article-comparison">
            <div className="adopt-article-comparison-column">
              <div className="adopt-article-comparison-header">
                <FaDog className="adopt-article-comparison-icon" />
                <h3>When You Adopt</h3>
              </div>
              <ul>
                <li>Save a life and create space for another animal in need</li>
                <li>Adoption fees typically include vaccinations, spay/neuter, and microchipping</li>
                <li>Support nonprofit organizations working to end animal homelessness</li>
                <li>Combat puppy mills and irresponsible breeding practices</li>
                <li>Often know the animal's personality and behaviors in advance</li>
                <li>Wide variety of breeds, mixes, ages, and personalities available</li>
                <li>Post-adoption support from many shelters and rescues</li>
              </ul>
            </div>
            
            <div className="adopt-article-comparison-column">
              <div className="adopt-article-comparison-header">
                <FaCat className="adopt-article-comparison-icon" />
                <h3>When You Shop</h3>
              </div>
              <ul>
                <li>No direct impact on reducing pet homelessness</li>
                <li>Higher costs, often without included healthcare</li>
                <li>May inadvertently support inhumane breeding operations</li>
                <li>Less predictable personality with puppies and kittens</li>
                <li>Limited to specific breeds or types</li>
                <li>Potentially higher risk of genetic health issues in purebreds</li>
                <li>Support structures vary widely by source</li>
              </ul>
            </div>
          </div>
          
          <div className="adopt-article-callout">
            <h3><FaBalanceScale /> Finding Ethical Breeders</h3>
            <p>
              If you decide a specific breed is necessary for your situation, research thoroughly to find ethical breeders 
              who prioritize animal welfare over profit, provide excellent care, conduct health testing, and breed responsibly. 
              Always visit in person, meet the parents, and ask detailed questions about their breeding practices and the care provided.
            </p>
          </div>
        </section>

        <section className="adopt-article-section">
          <h2>Common Myths About Shelter Pets</h2>
          
          <div className="adopt-article-myths-facts">
            <div className="adopt-article-myth">
              <h3>Myth: Shelter pets have behavioral problems</h3>
              <p>
                <strong>Fact:</strong> Most animals end up in shelters due to human circumstances—moving, financial changes, 
                or allergies—not behavioral issues. Shelters evaluate behavior and work with animals to ensure they're 
                ready for adoption. Many shelter pets are already house-trained and have basic manners.
              </p>
            </div>
            
            <div className="adopt-article-myth">
              <h3>Myth: You can't find purebred animals in shelters</h3>
              <p>
                <strong>Fact:</strong> Approximately 25-30% of shelter animals are purebreds. Additionally, breed-specific 
                rescue organizations focus on rehoming specific breeds. With patience and networking with shelters, you can 
                find nearly any breed through adoption.
              </p>
            </div>
            
            <div className="adopt-article-myth">
              <h3>Myth: Shelter pets have unknown health issues</h3>
              <p>
                <strong>Fact:</strong> Most shelters provide thorough veterinary exams, vaccinations, and spay/neuter 
                services before adoption. Many also test for common diseases and provide treatment for any identified issues, 
                meaning you often receive more health information than when purchasing a pet.
              </p>
            </div>
            
            <div className="adopt-article-myth">
              <h3>Myth: You can't find puppies or kittens in shelters</h3>
              <p>
                <strong>Fact:</strong> Shelters regularly have puppies and kittens, particularly during "kitten season" 
                in spring and summer. Many shelters also work with foster programs that care for younger animals until 
                they're ready for adoption.
              </p>
            </div>
          </div>
        </section>

        <section className="adopt-article-section adopt-article-match-section">
          <h2 className="adopt-article-match-title">
            <FaSearch /> Finding Your Perfect Match
          </h2>
          
          <p className="adopt-article-match-description">
            Successful adoption starts with finding the right match for your lifestyle, living situation, and expectations. 
            Here's how to approach the adoption process thoughtfully:
          </p>
          
          <div className="adopt-article-match-steps">
            <div className="adopt-article-match-step">
              <div className="adopt-article-match-step-number">1</div>
              <div className="adopt-article-match-step-content">
                <h3>Self-Assessment</h3>
                <p>
                  Be honest about your lifestyle, activity level, living space, budget, and time commitments. Consider how a pet 
                  will fit into your life for the next 10-15+ years, not just your current situation.
                </p>
              </div>
            </div>
            
            <div className="adopt-article-match-step">
              <div className="adopt-article-match-step-number">2</div>
              <div className="adopt-article-match-step-content">
                <h3>Research and Preparation</h3>
                <p>
                  Learn about different species, breeds, and personality types to understand what would work best for you. 
                  Prepare your home and gather necessary supplies before bringing your new pet home.
                </p>
              </div>
            </div>
            
            <div className="adopt-article-match-step">
              <div className="adopt-article-match-step-number">3</div>
              <div className="adopt-article-match-step-content">
                <h3>Visit Multiple Shelters</h3>
                <p>
                  Don't rush the process. Visit different shelters and rescues, interact with multiple animals, 
                  and be open to possibilities you hadn't considered. Sometimes the perfect match isn't what you initially envisioned.
                </p>
              </div>
            </div>
            
            <div className="adopt-article-match-step">
              <div className="adopt-article-match-step-number">4</div>
              <div className="adopt-article-match-step-content">
                <h3>Ask Detailed Questions</h3>
                <p>
                  Shelter staff know their animals well and can provide valuable insights. Ask about an animal's background, 
                  personality, medical history, and any specific care needs or behavioral considerations.
                </p>
              </div>
            </div>
            
            <div className="adopt-article-match-step">
              <div className="adopt-article-match-step-number">5</div>
              <div className="adopt-article-match-step-content">
                <h3>Consider Adult and Senior Pets</h3>
                <p>
                  While puppies and kittens are adorable, adult and senior pets often have established personalities, 
                  are typically house-trained, and can be easier to integrate into your home. Their calmer energy may be perfect for many households.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="adopt-article-conclusion">
          <h2>A Meaningful Choice</h2>
          <p>
            Choosing adoption isn't just a practical pet acquisition decision—it's a meaningful choice that ripples outward, 
            creating positive impacts for you, your new pet, and your community. The emotional wellness benefits flow in both directions, 
            creating a unique bond built on second chances and shared growth.
          </p>
          <p>
            As millions of animals wait in shelters for homes, your decision to adopt truly makes a difference. You gain not just a pet, 
            but a companion with whom you share a unique journey of transformation—one that enhances your emotional wellbeing while offering 
            an animal the gift of a loving forever home.
          </p>
          <div className="adopt-article-conclusion-cta">
            <h3><FaHandHoldingHeart /> Start Your Adoption Journey</h3>
            <p>
              Ready to discover how adoption can transform both your life and an animal's? Explore local shelters and find your perfect match today!
            </p>
            <a href="/adopt" className="adopt-article-button adopt-article-primary-button">Find Adoptable Pets</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptDontShop;