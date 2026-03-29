import React from 'react';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms of Service</h1>
        <p className="effective-date">Last Updated: April 8, 2024</p>
        
        <section className="terms-section">
          <h2>Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and PawFinder,
            concerning your access to and use of the PawFinder website and services.
          </p>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you disagree
            with any part of the terms, you may not access our services.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Use of Services</h2>
          <p>
            PawFinder provides an online platform that connects potential pet adopters with animals
            in need of homes, helps reunite lost pets with their owners, and provides educational
            resources for pet owners.
          </p>
          
          <h3>Account Registration</h3>
          <p>
            Some features of our services require you to register for an account. You agree to provide
            accurate, current, and complete information during the registration process and to update
            such information to keep it accurate, current, and complete.
          </p>
          
          <h3>User Responsibilities</h3>
          <p>When using our services, you agree to:</p>
          <ul>
            <li>Provide truthful and accurate information</li>
            <li>Maintain the security of your account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Promptly notify us of any unauthorized use of your account</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
            <li>Not attempt to harm or exploit minors in any way</li>
          </ul>
        </section>
        
        <section className="terms-section">
          <h2>Pet Adoption Process</h2>
          <p>
            PawFinder facilitates pet adoptions but is not responsible for the final adoption decisions
            or agreements between adopters and shelters/rescues. All adoptions are subject to the
            individual policies and requirements of the relevant shelter or rescue organization.
          </p>
          <p>
            We strive to provide accurate information about available pets, but we cannot guarantee
            the accuracy, completeness, or suitability of any animal listed on our platform. We
            encourage all potential adopters to meet and learn about an animal before making an
            adoption decision.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>User Content</h2>
          <p>
            Our services allow you to post, link, store, share, and otherwise make available certain
            information, text, images, or other material ("User Content").
          </p>
          <p>
            By posting User Content on or through our services, you represent and warrant that:
          </p>
          <ul>
            <li>You own or have the right to use and share such content</li>
            <li>The content does not violate the privacy rights, publicity rights, copyrights, contractual rights, or any other rights of any person</li>
            <li>The content does not contain harmful, offensive, illegal, or otherwise objectionable material</li>
          </ul>
          <p>
            We reserve the right to remove any User Content that violates these Terms or that we
            determine is harmful, offensive, or otherwise objectionable.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Intellectual Property</h2>
          <p>
            Our services and their original content (excluding User Content), features, and functionality
            are and will remain the exclusive property of PawFinder and its licensors. Our services are
            protected by copyright, trademark, and other laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display,
            publicly perform, republish, download, store, or transmit any of our materials without our
            prior written consent.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Disclaimer of Warranties</h2>
          <p>
            Your use of our services is at your sole risk. Our services are provided on an "AS IS" and
            "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express or
            implied, including but not limited to the implied warranties of merchantability, fitness
            for a particular purpose, and non-infringement.
          </p>
          <p>
            We make no warranty that our services will meet your requirements, be available on an
            uninterrupted, timely, secure, or error-free basis, or be accurate, reliable, or free of
            viruses or other harmful code.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, PawFinder, its affiliates, and their respective
            officers, directors, employees, agents, suppliers, and licensors shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising out of or
            relating to your access to or use of, or inability to access or use, our services.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless PawFinder, its affiliates, and their
            respective officers, directors, employees, agents, and representatives from and against
            any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees
            (including reasonable attorneys' fees) arising out of or relating to your violation of
            these Terms or your use of our services.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services immediately, without
            prior notice or liability, for any reason, including if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use our services will immediately cease. If you wish to
            terminate your account, you may simply discontinue using our services or contact us to
            request account deletion.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. We will provide notice
            of any changes by posting the new Terms on this page and updating the "Last Updated" date.
          </p>
          <p>
            Your continued use of our services after any such changes constitutes your acceptance of
            the new Terms.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the state
            of Pennsylvania, without regard to its conflict of law provisions.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:legal@pawfinder.com">legal@pawfinder.com</a><br />
            Phone: (555) 123-4567<br />
            Address: 123 Rescue Lane, Pawville, PA 12345
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;