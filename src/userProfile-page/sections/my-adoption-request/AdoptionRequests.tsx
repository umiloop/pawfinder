import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch, FaFileAlt, FaTimes, FaPaw, FaCalendarAlt, FaVenusMars, FaHeartbeat, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdoptionRequests.css';
import { getPetAdoptionRequestsByUserId } from '../../../service/UserProfileService';

interface AdoptionRequest {
  id: number;
  petName: string;
  petImage: string;
  shelter: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  responseDate?: string;
  petId: number;
  petAge?: number;
  petGender?: string;
  petHealth?: string;
  contactPhone?: string;
  contactEmail?: string;
  petBreed?: string;
  petType:String
}

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: AdoptionRequest | null;
}

// Pet Detail Preview Modal Component with unique class names
const PetDetailModal: React.FC<PetModalProps> = ({ isOpen, onClose, pet }) => {
  if (!isOpen || !pet) return null;
  
  return (
    <div className="adoption-req-modal-overlay" onClick={onClose}>
      <div className="adoption-req-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="adoption-req-modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="adoption-req-modal-header">
          <h2 className="adoption-req-modal-title">Pet Details: {pet.petName}</h2>
          <span className={`adoption-req-modal-status-badge ${getStatusBadgeClass(pet.status)}`}>
            {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
          </span>
        </div>
        
        <div className="adoption-req-modal-body">
          <div className="adoption-req-modal-pet-image-container">
            <img 
              src={pet.petImage} 
              alt={pet.petName} 
              className="adoption-req-modal-pet-image"
              onError={(e) => {
                e.currentTarget.src = '/default-pet.svg';
              }}
            />
          </div>
          
          <div className="adoption-req-pet-info-grid">
            <div className="adoption-req-pet-info-item">
              <FaPaw className="adoption-req-info-icon" />
              <div>
                <div className="adoption-req-info-label">Breed</div>
                <div className="adoption-req-info-value">{pet.petBreed || 'Not specified'}</div>
              </div>
            </div>
            
            <div className="adoption-req-pet-info-item">
              <FaCalendarAlt className="adoption-req-info-icon" />
              <div>
                <div className="adoption-req-info-label">Age</div>
                <div className="adoption-req-info-value">{pet.petAge ? `${pet.petAge} ${pet.petAge === 1 ? 'year' : 'years'}` : 'Not specified'}</div>
              </div>
            </div>
            
            <div className="adoption-req-pet-info-item">
              <FaVenusMars className="adoption-req-info-icon" />
              <div>
                <div className="adoption-req-info-label">Gender</div>
                <div className="adoption-req-info-value">{pet.petGender || 'Not specified'}</div>
              </div>
            </div>
            
            <div className="adoption-req-pet-info-item">
              <FaHeartbeat className="adoption-req-info-icon" />
              <div>
                <div className="adoption-req-info-label">Health</div>
                <div className="adoption-req-info-value">{pet.petHealth || 'Not specified'}</div>
              </div>
            </div>
          </div>
          
          <div className="adoption-req-shelter-section">
            <h3>Contact Information</h3>
            <p className="adoption-req-shelter-name">{pet.shelter}</p>
            
            {pet.contactPhone && (
              <div className="adoption-req-contact-item">
                <FaPhoneAlt className="adoption-req-contact-icon" />
                <span>{pet.contactPhone}</span>
              </div>
            )}
            
            {pet.contactEmail && (
              <div className="adoption-req-contact-item">
                <FaEnvelope className="adoption-req-contact-icon" />
                <span>{pet.contactEmail}</span>
              </div>
            )}
          </div>
          
          <div className="adoption-req-status-section">
            <h3>Adoption Request Status</h3>
            <div className="adoption-req-status-timeline">
              <div className="adoption-req-timeline-item">
                <div className="adoption-req-timeline-date">
                  {new Date(pet.requestDate).toLocaleDateString()}
                </div>
                <div className="adoption-req-timeline-content">
                  <h4>Request Submitted</h4>
                  <p>Your adoption request for {pet.petName} was submitted.</p>
                </div>
              </div>
              
              {pet.responseDate && (
                <div className="adoption-req-timeline-item">
                  <div className="adoption-req-timeline-date">
                    {new Date(pet.responseDate).toLocaleDateString()}
                  </div>
                  <div className="adoption-req-timeline-content">
                    <h4>Response Received</h4>
                    <p>{pet.status === 'approved' 
                      ? 'Your request has been approved! The shelter will contact you soon.' 
                      : 'Unfortunately, your request was not approved at this time.'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="adoption-req-modal-footer">
          <button className="adoption-req-modal-btn adoption-req-secondary" onClick={onClose}>Close</button>
          <button className="adoption-req-modal-btn adoption-req-primary" onClick={() => window.location.href = `/pet/${pet.petId}`}>
            View Full Listing
          </button>
        </div>
      </div>
    </div>
  );
};

const AdoptionRequests: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AdoptionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<AdoptionRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
    const fetchListings = async () => {
      try {

        // Get userId from localStorage
        const userDataRaw = localStorage.getItem("user");
        const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
        const userId = userData?.userId;

        if (!userId) throw new Error("User ID not found");

        // Fetch from backend
        const data = await getPetAdoptionRequestsByUserId(userId);
        
        const responseData: AdoptionRequest[] = data.map((item: any) => ({
            id: item.id.toString(),
            petName: item.petName,
            petImage: item.petImageUrl,
            shelter: item.address,
            status: item.reviewStatus,
            requestDate: item.submissionDate,
            responseDate: "2023-02-15",
            petId: item.petId,
            petAge: item.petAge,
            petGender: item.petGender,
            petHealth: "Senior, Special Diet",
            contactPhone: item.contactNumber,
            contactEmail: item.email,
            petBreed: item.petBreed,
            petType: item.petType,
        }));



        setTimeout(() => {
        setRequests(responseData);
        setFilteredRequests(responseData);
        setIsLoading(false);
    }, 800);
      } catch (error) {
        console.error("Error fetching pet listings:", error);
        // toast.error("Failed to load your pet listings");
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);
  
  useEffect(() => {
    filterRequests();
  }, [statusFilter, searchTerm, requests]);
  
  const filterRequests = () => {
    let filtered = [...requests];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(request => 
        request.petName.toLowerCase().includes(term) || 
        request.shelter.toLowerCase().includes(term)
      );
    }
    
    setFilteredRequests(filtered);
  };
  
  const openPetModal = (pet: AdoptionRequest) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };
  
  const closePetModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="adoption-requests-section">
      <h2 className="adoption-req-section-title">My Adoption Requests</h2>
      
      <div className="adoption-req-controls-row">
        <div className="adoption-req-filter-container">
          <label htmlFor="adoption-status-filter" className="adoption-req-filter-label">
            Filter by Status
          </label>
          <div className="adoption-req-dropdown-wrapper">
            <FaFilter className="adoption-req-filter-icon" />
            <select 
              id="adoption-status-filter"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="adoption-req-status-filter"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="adoption-req-search-container">
          <label htmlFor="adoption-req-search" className="adoption-req-search-label">
            Search
          </label>
          <div className="adoption-req-search-input-wrapper">
            <FaSearch className="adoption-req-search-icon" />
            <input 
              id="adoption-req-search"
              type="text"
              placeholder="Search pet or shelter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="adoption-req-search-input"
            />
            {searchTerm && (
              <button 
                className="adoption-req-clear-search-btn" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="adoption-req-loading-container">
          <div className="adoption-req-loading-spinner"></div>
          <p>Loading your adoption requests...</p>
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="adoption-req-grid">
          {filteredRequests.map(request => (
            <div key={request.id} className="adoption-req-card">
              <div className="adoption-req-image-container">
                <img 
                  src={request.petImage} 
                  alt={request.petName} 
                  className="adoption-req-pet-image"
                  onError={(e) => {
                    e.currentTarget.src = '/default-pet.svg';
                  }}
                />
                <div className="adoption-req-tooltip-container">
                  <span className={`adoption-req-status-badge adoption-req-${request.status}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  <div className="adoption-req-tooltip">
                    {getStatusTooltip(request.status)}
                  </div>
                </div>
              </div>
              
              <div className="adoption-req-details">
                <h3 className="adoption-req-pet-name">{request.petName}</h3>
                <p className="adoption-req-shelter-name">{request.shelter}</p>
                <div className="adoption-req-dates">
                  <div className="adoption-req-date-item">
                    <span className="adoption-req-date-label">Requested:</span>
                    <span className="adoption-req-date-value">{new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  {request.responseDate && (
                    <div className="adoption-req-date-item">
                      <span className="adoption-req-date-label">Response:</span>
                      <span className="adoption-req-date-value">{new Date(request.responseDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="adoption-req-view-details-btn" 
                  onClick={() => openPetModal(request)}
                  aria-label={`View details for ${request.petName}`}
                >
                  <FaFileAlt /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="adoption-req-no-results">
          <div className="adoption-req-no-results-icon">🔍</div>
          <h3>No adoption requests found</h3>
          {searchTerm || statusFilter !== 'all' ? (
            <p>Try adjusting your filters or search criteria</p>
          ) : (
            <p>You haven't submitted any adoption requests yet</p>
          )}
          <button className="adoption-req-browse-btn" onClick={() => navigate('/adopt')}>
            Browse Pets
          </button>
        </div>
      )}
      
      <PetDetailModal 
        isOpen={isModalOpen} 
        onClose={closePetModal} 
        pet={selectedPet} 
      />
    </div>
  );
};

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'pending': return 'adoption-req-badge-warning';
    case 'approved': return 'adoption-req-badge-success';
    case 'rejected': return 'adoption-req-badge-danger';
    default: return '';
  }
}

function getStatusTooltip(status: string) {
  switch (status) {
    case 'Pending':
      return "Awaiting shelter/owner response.";
    case 'Approved':
      return "Adoption approved. Await contact for next steps.";
    case 'Rejected':
      return "Your request was not accepted. You may apply for other pets.";
    default:
      return "";
  }
}

export default AdoptionRequests;