import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1>Privacy Policy</h1>
        <p className="effective-date">Last Updated: April 8, 2024</p>
        
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            At PawFinder, we respect your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or use our pet adoption services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this
            Privacy Policy, please do not access the site.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register on our website</li>
            <li>Express interest in adopting a pet</li>
            <li>Report a missing pet</li>
            <li>Sign up for our newsletter</li>
            <li>Participate in our community features</li>
          </ul>
          
          <p>The personal information we collect may include:</p>
          <ul>
            <li>Name, email address, phone number, and mailing address</li>
            <li>Pet preferences and household information</li>
            <li>Information about your current pets</li>
            <li>Photos you upload of pets</li>
          </ul>
          
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your
            device, including information about your web browser, IP address, time zone, and some of
            the cookies that are installed on your device.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect from you for the following purposes:</p>
          <ul>
            <li>To facilitate pet adoptions and match pets with suitable homes</li>
            <li>To help reunite lost pets with their owners</li>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our services</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To communicate with you about pet-related news and information</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Sharing Your Information</h2>
          <p>We may share your personal information in the following situations:</p>
          <ul>
            <li><strong>With Partner Shelters and Rescues:</strong> To facilitate the adoption process</li>
            <li><strong>With Service Providers:</strong> To perform service-related services or assist us in analyzing how our services are used</li>
            <li><strong>With Other Users:</strong> When you share personal information or otherwise interact in public areas with other users</li>
            <li><strong>For Legal Purposes:</strong> If required by law or to respond to legal process</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service
            and hold certain information. Cookies are files with a small amount of data which may include
            an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to
            protect the security of any personal information we process. However, please also remember
            that we cannot guarantee that the internet itself is 100% secure.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>Children's Privacy</h2>
          <p>
            Our service is not directed to anyone under the age of 13. We do not knowingly collect
            personally identifiable information from anyone under the age of 13. If you are a parent
            or guardian and you are aware that your child has provided us with personal data, please
            contact us.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to request restriction of processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>
        
        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:privacy@pawfinder.com">privacy@pawfinder.com</a><br />
            Phone: (555) 123-4567<br />
            Address: 123 Rescue Lane, Pawville, PA 12345
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;