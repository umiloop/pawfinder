import React from 'react';
import './Accessibility.css';

const Accessibility: React.FC = () => {
  return (
    <div className="accessibility-container">
      <div className="accessibility-content">
        <h1>Accessibility Statement</h1>
        <p className="effective-date">Last Updated: April 8, 2024</p>
        
        <section className="accessibility-section">
          <h2>Our Commitment</h2>
          <p>
            PawFinder is committed to ensuring digital accessibility for people with disabilities. We are continually
            improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>
        </section>
        
        <section className="accessibility-section">
          <h2>Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve
            accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and
            Level AAA.
          </p>
          <p>
            PawFinder strives to conform to WCAG 2.1 level AA. We are actively working to increase the accessibility and
            usability of our website and to meet and exceed these guidelines.
          </p>
        </section>
        
        <section className="accessibility-section">
          <h2>Measures We Take</h2>
          <p>We take the following measures to ensure accessibility of PawFinder:</p>
          <ul>
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our design and development process</li>
            <li>Assign clear accessibility goals and responsibilities</li>
            <li>Conduct regular accessibility testing with automated tools and manual testing</li>
            <li>Train our staff on accessibility principles and best practices</li>
          </ul>
        </section>
        
        <section className="accessibility-section">
          <h2>Features and Accommodations</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul>
            <li>Semantic HTML structure with proper heading hierarchy</li>
            <li>Descriptive alt text for all images</li>
            <li>Sufficient color contrast between text and background</li>
            <li>Keyboard navigation support for all functionality</li>
            <li>ARIA landmarks to identify regions of the page</li>
            <li>Text resizing without loss of content or functionality</li>
            <li>Form labels and clear instructions for all interactive elements</li>
            <li>Focus indicators for keyboard navigation</li>
          </ul>
        </section>
        
        <section className="accessibility-section">
          <h2>Accessibility Technologies We Use</h2>
          <p>Our website uses the following technologies to support accessibility:</p>
          <ul>
            <li>HTML5 for semantic structure</li>
            <li>CSS3 for styling and responsive design</li>
            <li>JavaScript for enhanced functionality with ARIA attributes</li>
            <li>SVG graphics with appropriate text alternatives</li>
            <li>Responsive design for various devices and viewport sizes</li>
          </ul>
        </section>
        
        <section className="accessibility-section">
          <h2>Limitations and Alternatives</h2>
          <p>
            Despite our efforts to ensure accessibility of PawFinder, there may be some limitations. Below is a description of
            known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
          </p>
          <ul>
            <li>
              <strong>Legacy content:</strong> Some older content may not be fully accessible. We plan to update these pages as
              resources permit. Please contact us for assistance if you encounter issues.
            </li>
            <li>
              <strong>Third-party content:</strong> Some of our content may be hosted on third-party platforms that may not
              fully conform to accessibility standards. We're working with our partners to improve this.
            </li>
            <li>
              <strong>Maps and location-based services:</strong> Some of our pet-finding features use maps that may present
              challenges for screen reader users. We offer alternative text-based location information.
            </li>
          </ul>
        </section>
        
        <section className="accessibility-section">
          <h2>Feedback and Contact Information</h2>
          <p>
            We welcome your feedback on the accessibility of PawFinder. Please let us know if you encounter accessibility
            barriers on our website:
          </p>
          <ul>
            <li>Phone: (555) 123-4567</li>
            <li>E-mail: <a href="mailto:accessibility@pawfinder.com">accessibility@pawfinder.com</a></li>
            <li>Postal address: 123 Rescue Lane, Pawville, PA 12345</li>
          </ul>
          <p>
            We try to respond to feedback within 3 business days and typically address accessibility issues within 2 weeks,
            depending on the complexity of the fix required.
          </p>
        </section>
        
        <section className="accessibility-section">
          <h2>Assessment Methods</h2>
          <p>PawFinder assesses the accessibility of our website through the following methods:</p>
          <ul>
            <li>Self-evaluation using automated testing tools</li>
            <li>Manual keyboard navigation testing</li>
            <li>Screen reader testing using NVDA and VoiceOver</li>
            <li>User testing with individuals with disabilities</li>
            <li>Third-party accessibility evaluations as needed</li>
          </ul>
        </section>
        
        <section className="accessibility-section">
          <h2>Additional Resources</h2>
          <p>For more information about web accessibility, please visit these resources:</p>
          <ul>
            <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a></li>
            <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer">W3C Web Accessibility Initiative (WAI)</a></li>
            <li><a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">Americans with Disabilities Act (ADA)</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Accessibility;