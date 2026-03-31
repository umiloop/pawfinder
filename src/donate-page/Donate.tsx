import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import './Donate.css';
import axios from 'axios';
import {motion} from "framer-motion"
import { Player } from '@lottiefiles/react-lottie-player';
import { FaPaw, FaCreditCard, FaExclamationCircle } from 'react-icons/fa';
import loadingAnimation from '../assets/animations/loading.json';

//  publishable key from Stripe dashboard
const stripePromise = loadStripe('pk_test_51REsQqQts9FgBehphqq1kgc0UwXXMPVMvBKH5KiAR6oj54kr6mZ5Wlk9DSgqH1Q34BrN201Grp7JIWKtJQXAiR4Q000NbTu6EB');

// Spring Boot API URL 
const API_URL = 'https://pawfinder-backend.onrender.com/api/donation'; // backend API endpoint

// Donation Types and Configuration
const DONATION_AMOUNTS = [
  { value: 10, label: '$10', description: 'Feeds 5 pets for a day' },
  { value: 25, label: '$25', description: 'Provides food for 10 pets for a week' },
  { value: 50, label: '$50', description: 'Covers medical checkups for 3 pets' },
  { value: 100, label: '$100', description: 'Supports shelter operations for a day' }
];

const SHELTER_IMPACTS = [
  { amount: 10, description: 'Provides daily meals for shelter pets', icon: 'food' },
  { amount: 25, description: 'Covers medical supplies and care', icon: 'medical' },
  { amount: 50, description: 'Supports shelter infrastructure', icon: 'shelter' }
];

const TESTIMONIALS = [
  {
    quote: "Thanks to your donations, we can provide hope and care for abandoned animals.",
    author: "Sarah Johnson",
    shelter: "City Animal Rescue Center"
  },
  {
    quote: "Every donation makes a real difference in the lives of these wonderful animals.",
    author: "Mike Rodriguez",
    shelter: "Paws of Hope Shelter"
  }
];

const DonationForm: React.FC<{
  setTotalRaised: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setTotalRaised }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmationDetails, setConfirmationDetails] = useState<{
    amount: number;
    name: string;
    email: string;
    transactionId: string;
  } | null>(null);

  const resetForm = () => {
    setSelectedAmount(null);
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setIsProcessing(false);
    setPaymentError(null);
    setShowConfirmation(false);
    setConfirmationDetails(null);
    
    // Reset the card element if it exists
    const cardElement = elements?.getElement(CardElement);
    if (cardElement) {
      cardElement.clear();
    }
  };

  const handleDonationSelect = (amount: typeof DONATION_AMOUNTS[0]) => {
    setSelectedAmount(amount.value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(value ? parseFloat(value) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAmount || !donorName || !donorEmail || !stripe || !elements) {
      setPaymentError('Please fill out all donation fields');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setPaymentError('Card element not found');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { data } = await axios.post(`${API_URL}/create-payment-intent`, {
        amount: selectedAmount,
        donorName,
        donorEmail
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: donorName,
              email: donorEmail
            }
          }
        }
      );

      if (error) {
        setPaymentError(error.message || 'An error occurred during payment processing');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setConfirmationDetails({
          amount: selectedAmount,
          name: donorName,
          email: donorEmail,
          transactionId: paymentIntent.id
        });
        setShowConfirmation(true);
        
        try {
          const response = await axios.post(`${API_URL}/test-payment?paymentIntentId=${paymentIntent.id}`);
          console.log('Test payment response:', response.data);
        } catch (err) {
          console.error('Error processing payment:', err);
        }
        
        setTotalRaised(prev => prev + selectedAmount);
        setSelectedAmount(null);
        setCustomAmount('');
        setDonorName('');
        setDonorEmail('');
        cardElement.clear();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setPaymentError(err.response.data.error || 'Payment processing failed');
      } else {
        setPaymentError('An unexpected error occurred. Please try again.');
      }
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#6772e5',
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };

  if (showConfirmation && confirmationDetails) {
    return (
      <motion.div 
        className="donation-confirmation"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="confirmation-content">
          <div className="confirmation-header">
            <FaPaw className="paw-icon" />
            <h2>Thank You for Your Donation!</h2>
          </div>
          
          <div className="receipt-container">
            <div className="receipt-header">
              <div className="receipt-logo">
                <FaPaw />
                <span>PawFinder</span>
              </div>
              <div className="receipt-title">Donation Receipt</div>
            </div>
            
            <div className="receipt-body">
              <div className="receipt-row">
                <span>Transaction ID</span>
                <span className="transaction-id">{confirmationDetails.transactionId}</span>
              </div>
              <div className="receipt-row">
                <span>Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="receipt-row">
                <span>Time</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="receipt-row">
                <span>Donor Name</span>
                <span>{confirmationDetails.name}</span>
              </div>
              <div className="receipt-row">
                <span>Email</span>
                <span>{confirmationDetails.email}</span>
              </div>
              <div className="receipt-row total">
                <span>Donation Amount</span>
                <span className="amount">${confirmationDetails.amount}</span>
              </div>
            </div>
            
            <div className="receipt-footer">
              <p>Thank you for supporting our cause!</p>
              <p>Your donation will help provide care for animals in need.</p>
            </div>
          </div>

          <motion.button
            className="new-donation-button"
            onClick={resetForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Make Another Donation
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <div className="donation-amounts">
        {DONATION_AMOUNTS.map((amount) => (
          <button
            type="button"
            key={amount.value}
            className={`donation-amount ${selectedAmount === amount.value ? 'selected' : ''}`}
            onClick={() => handleDonationSelect(amount)}
          >
            {amount.label}
            <span className="amount-description">{amount.description}</span>
          </button>
        ))}
        <div className="custom-amount-container">
          <label htmlFor="custom-amount">Custom Amount</label>
          <input
            type="number"
            id="custom-amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
            min="1"
          />
        </div>
      </div>

      <div className="donation-details">
        <input
          type="text"
          placeholder="Full Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
          className="donation-input"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          required
          className="donation-input"
        />
        <div className="card-element-container">
          <div className="card-element-header">
            <FaCreditCard />
            <span>Card Details</span>
          </div>
          <CardElement
            options={cardElementOptions}
            className="card-element"
          />
        </div>
      </div>

      {paymentError && (
        <motion.div 
          className="error-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationCircle />
          <p className="error-message">{paymentError}</p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        className="donate-submit-button"
        disabled={!selectedAmount || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <div className="loading-spinner">
            <Player
              autoplay
              loop
              src={loadingAnimation}
              style={{ width: '40px', height: '40px' }}
              speed={1.5}
            />
            <span>Processing Payment...</span>
          </div>
        ) : (
          selectedAmount ? `Donate $${selectedAmount}` : 'Select Donation Amount'
        )}
      </motion.button>
    </form>
  );
};

const Donate: React.FC = () => {
  const [donationGoal] = useState<number>(10000);
  const [totalRaised, setTotalRaised] = useState<number>(0);
  
  const scrollToDonation = () => {
    document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/donation-stats`);
        if (data && data.totalRaised) {
          setTotalRaised(data.totalRaised);
        }
      } catch (err) {
        console.error('Error fetching donation statistics:', err);
      }
    };

    fetchDonationStats();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="donation-page">
        <section className="hero-section-donate">
          <div className="hero-content-donate">
            <h1 className="hero-title-donate">Help Us Feed Shelter Pets</h1>
            <p className="hero-description-donate">
              Your donation can provide food, shelter, and care for animals in need.
            </p>
            <button
              className="cta-button-donate primary-cta"
              onClick={scrollToDonation}
            >
              Donate Now
            </button>
            <button className="cta-button-donate secondary-cta">
              Learn More About Our Shelters
            </button>
          </div>
        </section>

        <section className="shelter-impact">
          <h2>How Your Donation Helps</h2>
          <div className="impact-grid">
            {SHELTER_IMPACTS.map((impact) => (
              <div key={impact.amount} className="impact-card">
                <div className={`impact-icon ${impact.icon}`}></div>
                <h3>${impact.amount} {impact.description}</h3>
              </div>
            ))}
          </div>

          <div className="donation-progress">
            <h3>Our Fundraising Progress</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(totalRaised / donationGoal) * 100}%` }}
              ></div>
            </div>
            <p>
              ${totalRaised.toLocaleString()} raised of ${donationGoal.toLocaleString()} goal
            </p>
          </div>

          <div className="testimonials">
            {TESTIMONIALS.map((testimonial, index) => (
              <blockquote key={index} className="testimonial-card">
                <p>"{testimonial.quote}"</p>
                <footer>
                  - {testimonial.author}, {testimonial.shelter}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="donation-form" className="donation-form-section">
          <h2>Make a Donation</h2>
          <DonationForm setTotalRaised={setTotalRaised} />
        </section>
      </div>
    </Elements>
  );
};

export default Donate;