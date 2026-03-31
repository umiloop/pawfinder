import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaEnvelope, FaEye, FaPhone, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './RequestsReceived.css';

interface AdoptionRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  petAge: number;
  petBreed: string;
  petGender: string;
  petType: string;

  // Requester Information
  requesterName: string;
  requesterEmail: string;
  requesterContactNumber: string;
  requesterAddress: string;

  // Living Situation
  livingSituation: string;
  hasOtherPets: string;
  workSchedule: string;

  // Experience and Reason
  experienceWithPets: string;
  reasonForAdoption: string;

  // Status and Dates
  reviewStatus: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
  responseDate?: string;
}

const RequestsReceived: React.FC = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AdoptionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<AdoptionRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
  const fetchRequests = async () => {
    try {

      //Get user data from localStorage
      const userDataRaw = localStorage.getItem("user"); // Replace "user" with your actual localStorage key
      let userId = "";
      let username = "";
      if (userDataRaw) {
        try {
          const userData = JSON.parse(userDataRaw);
          userId = userData.userId;
          username = userData.username;
          console.log("username :", username);
          console.log("userid :", userId);
        } catch (error) {
          console.error("Error parsing user data from local storage:", error);
        }
      }
      // Replace userId with the actual user ID from your auth context or props
      // const userId = 777; // This should come from your authentication system
      const response = await fetch(`https://pawfinder-backend.onrender.com/api/adoption-requests/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch adoption requests');
      }
      
      const data = await response.json();
      
      // Transform the data to match our frontend interface
      const transformedRequests = data.map((request: any) => ({
        requestId: request.requestId,
        petId: request.petId,
        petName: request.petName,
        petImageUrl: request.petImageUrl,
        petAge: request.petAge,
        petBreed: request.petBreed,
        petGender: request.petGender,
        petType: request.petType,
        requesterName: request.requesterName,
        requesterEmail: request.requesterEmail,
        requesterContactNumber: request.requesterContactNumber,
        requesterAddress: request.requesterAddress,
        livingSituation: request.livingSituation,
        hasOtherPets: request.hasOtherPets,
        workSchedule: request.workSchedule,
        experienceWithPets: request.experienceWithPets,
        reasonForAdoption: request.reasonForAdoption,
        reviewStatus: request.reviewStatus,
        submissionDate: request.submissionDate,
        responseDate: request.responseDate
      }));
      
      setRequests(transformedRequests);
      setFilteredRequests(transformedRequests);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching adoption requests:", error);
      toast.error("Failed to load adoption requests");
      setIsLoading(false);
    }
  };

  fetchRequests();
}, []);
  
  const handleViewDetails = (request: AdoptionRequest) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleApproveRequest = async (requestId: number) => {
  try {
    const response = await fetch(`https://pawfinder-backend.onrender.com/api/adoption-requests/${requestId}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if using JWT
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to approve request');
    }
    
    const updatedRequest = await response.json();
    
    // Update request status in state
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.requestId === requestId ? { 
          ...req, 
          reviewStatus: 'Approved',
          responseDate: updatedRequest.responseDate 
        } : req
      )
    );
    
    if (selectedRequest && selectedRequest.requestId === requestId) {
      setSelectedRequest({
        ...selectedRequest, 
        reviewStatus: 'Approved',
        responseDate: updatedRequest.responseDate
      });
    }
    
    toast.success("Adoption request approved!");
  } catch (error) {
    console.error("Error approving request:", error);
    toast.error("Failed to approve request");
  }
};

const handleRejectRequest = async (requestId: number) => {
  try {
    const response = await fetch(`https://pawfinder-backend.onrender.com/api/adoption-requests/${requestId}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if using JWT
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to reject request');
    }
    
    const updatedRequest = await response.json();
    
    // Update request status in state
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.requestId === requestId ? { 
          ...req, 
          reviewStatus: 'Rejected',
          responseDate: updatedRequest.responseDate 
        } : req
      )
    );
    
    if (selectedRequest && selectedRequest.requestId === requestId) {
      setSelectedRequest({
        ...selectedRequest, 
        reviewStatus: 'Rejected',
        responseDate: updatedRequest.responseDate
      });
    }
    
    toast.success("Adoption request rejected");
  } catch (error) {
    console.error("Error rejecting request:", error);
    toast.error("Failed to reject request");
  }
};
  
  const handleCallRequester = (phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.warning("No phone number available for this requester");
    }
  };
  
  const handleEmailRequester = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'adoption-badge-pending';
    case 'approved': return 'adoption-badge-approved';
    case 'rejected': return 'adoption-badge-rejected';
    default: return '';
  }
};

// Update the filter to handle the capitalized statuses
useEffect(() => {
  let filtered = [...requests];

  // Filter by status
  if (statusFilter !== 'all') {
    filtered = filtered.filter(request => 
      request.reviewStatus.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(request => 
      request.petName.toLowerCase().includes(term) || 
      request.requesterName.toLowerCase().includes(term) ||
      request.requesterEmail.toLowerCase().includes(term)
    );
  }

  setFilteredRequests(filtered);
}, [statusFilter, searchTerm, requests]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Helper to format living situation into readable text
  const formatLivingSituation = (situation: string): string => {
    switch (situation) {
      case 'apartment':
        return 'Apartment';
      case 'house':
        return 'House with yard';
      case 'house-no-yard':
        return 'House without yard';
      case 'condo':
        return 'Condo/Townhouse';
      default:
        return situation.charAt(0).toUpperCase() + situation.slice(1);
    }
  };
  
  // Helper to format work schedule into readable text
  const formatWorkSchedule = (schedule: string): string => {
    switch (schedule) {
      case 'remote':
        return 'Work from home/Remote';
      case 'part-time':
        return 'Part-time (less than 20 hours/week)';
      case 'full-time':
        return 'Full-time (40+ hours/week)';
      case 'flexible':
        return 'Flexible hours';
      case 'office':
        return 'Office-based work';
      default:
        return schedule.charAt(0).toUpperCase() + schedule.slice(1);
    }
  };

  // Group requests by pet
  const groupRequestsByPet = () => {
    const grouped: Record<string, AdoptionRequest[]> = {};
    
    filteredRequests.forEach(request => {
      if (!grouped[request.petId]) {
        grouped[request.petId] = [];
      }
      grouped[request.petId].push(request);
    });
    
    return grouped;
  };
  
  const groupedRequests = groupRequestsByPet();
  
  return (
    <div className="adoption-requests-section">
      <div className="adoption-filter-search-bar">
        <div className="adoption-filter-container">
          <FaFilter className="adoption-filter-icon" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="adoption-status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="adoption-search-container">
          <FaSearch className="adoption-search-icon" />
          <input 
            type="text"
            placeholder="Search by pet or requester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adoption-search-input"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="adoption-loading-container">
          <div className="adoption-loading-spinner"></div>
          <p>Loading adoption requests...</p>
        </div>
      ) : Object.keys(groupedRequests).length > 0 ? (
        <div className="adoption-grouped-requests">
          {Object.entries(groupedRequests).map(([petId, petRequests]) => (
            <div key={petId} className="adoption-pet-requests-group">
              <div className="adoption-pet-info-header">
                <img 
                  src={petRequests[0].petImageUrl} 
                  alt={petRequests[0].petName} 
                  className="adoption-pet-thumbnail"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/default-pet.jpg"; // Fallback image
                  }} 
                />
                <div className="adoption-pet-info">
                  <h3>{petRequests[0].petName}</h3>
                  <span className="adoption-request-count">
                    {petRequests.length} {petRequests.length === 1 ? 'request' : 'requests'}
                  </span>
                </div>
              </div>
              
              <div className="adoption-request-list">
                {petRequests.map(request => (
                  <div key={request.requestId} className="adoption-request-item">
                    <div className="adoption-requester-info">
                      <h4>{request.requesterName}</h4>
                      <p>
                        <FaPhone style={{ fontSize: '14px', color: '#6c757d' }} />
                        {request.requesterContactNumber || "No phone number"}
                      </p>
                      <p className="adoption-request-date">{formatDate(request.submissionDate)}</p>
                    </div>
                    
                    <div className="adoption-request-status">
                      <span className={`adoption-status-badge ${getStatusBadgeClass(request.reviewStatus)}`}>
                        {request.reviewStatus.charAt(0).toUpperCase() + request.reviewStatus.slice(1)}
                      </span>
                    </div>
                    
                    <div className="adoption-request-actions">
                      <button 
                        className="adoption-action-button adoption-view-btn" 
                        onClick={() => handleViewDetails(request)}
                      >
                        <span className="adoption-action-tooltip">View Details</span>
                        <FaEye />
                      </button>
                      
                      {request.requesterContactNumber && (
                        <button 
                          className="adoption-action-button adoption-contact-btn" 
                          onClick={() => handleCallRequester(request.requesterContactNumber)}
                        >
                          <span className="adoption-action-tooltip">Call</span>
                          <FaPhone />
                        </button>
                      )}
                      
                      {request.reviewStatus === 'Pending' && (
                        <>
                          <button 
                            className="adoption-action-button adoption-approve-btn" 
                            onClick={() => handleApproveRequest(request.requestId)}
                          >
                            <span className="adoption-action-tooltip">Approve</span>
                            <FaCheck />
                          </button>
                          <button 
                            className="adoption-action-button adoption-reject-btn" 
                            onClick={() => handleRejectRequest(request.requestId)}
                          >
                            <span className="adoption-action-tooltip">Reject</span>
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="adoption-no-results">
          <div className="adoption-no-results-icon">📭</div>
          <h3>No adoption requests found</h3>
          {searchTerm || statusFilter !== 'all' ? (
            <p>Try adjusting your filters or search criteria</p>
          ) : (
            <p>You haven't received any adoption requests yet</p>
          )}
        </div>
      )}
      
      {/* Request Details Modal - With unique class names */}
      {isDetailsModalOpen && selectedRequest && (
        <div className="adoption-modal-overlay" onClick={() => setIsDetailsModalOpen(false)}>
          <div className="adoption-modal-content" onClick={e => e.stopPropagation()}>
            <button className="adoption-close-modal-btn" onClick={() => setIsDetailsModalOpen(false)}>×</button>
            
            <h2>Adoption Request Details</h2>
            
            {/* Status indicator banner */}
            <div className={`adoption-modal-status ${selectedRequest.reviewStatus}`}>
              <FaCheck className="adoption-modal-status-icon" />
              <p className="adoption-modal-status-text">
                Status: {selectedRequest.reviewStatus.charAt(0).toUpperCase() + selectedRequest.reviewStatus.slice(1)}
              </p>
            </div>
            
            <div className="adoption-modal-grid">
              <div className="adoption-modal-pet-info">
                <img 
                  src={selectedRequest.petImageUrl} 
                  alt={selectedRequest.petName} 
                  className="adoption-modal-pet-image" 
                />
                <div>
                  <h3>{selectedRequest.petName}</h3>
                  <p className="adoption-modal-pet-details">
                    {selectedRequest.petBreed} • {selectedRequest.petAge} years old • {selectedRequest.petGender}
                  </p>
                </div>
              </div>
              
              <div className="adoption-modal-requester-info">
                <h3>Requester Information</h3>
                
                {/* Contact Information */}
                <div className="adoption-contact-info-item">
                  <FaUser className="adoption-contact-icon" />
                  <p className="adoption-contact-text">{selectedRequest.requesterName}</p>
                </div>
                
                <div className="adoption-contact-info-item">
                  <FaPhone className="adoption-contact-icon" />
                  <p className="adoption-contact-text">{selectedRequest.requesterContactNumber}</p>
                </div>
                
                <div className="adoption-contact-info-item">
                  <FaEnvelope className="adoption-contact-icon" />
                  <p className="adoption-contact-text">{selectedRequest.requesterEmail}</p>
                </div>
                
                {/* Living Situation */}
                <div className="adoption-living-situation">
                  <h4>Living Situation</h4>
                  <div className="adoption-living-situation-details">
                    <div className="adoption-living-detail">
                      <span className="adoption-detail-label">Address:</span>
                      <span className="adoption-detail-value">{selectedRequest.requesterAddress}</span>
                    </div>
                    <div className="adoption-living-detail">
                      <span className="adoption-detail-label">Housing Type:</span>
                      <span className="adoption-detail-value">
                        {formatLivingSituation(selectedRequest.livingSituation)}
                      </span>
                    </div>
                    <div className="adoption-living-detail">
                      <span className="adoption-detail-label">Has Other Pets:</span>
                      <span className="adoption-detail-value">
                        {selectedRequest.hasOtherPets === "yes" ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="adoption-living-detail">
                      <span className="adoption-detail-label">Work Schedule:</span>
                      <span className="adoption-detail-value">
                        {formatWorkSchedule(selectedRequest.workSchedule)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience and Reason */}
            <div className="adoption-experience-section">
              <h3>Pet Experience</h3>
              <p className="adoption-experience-content">{selectedRequest.experienceWithPets}</p>
            </div>
            
            <div className="adoption-reason-section">
              <h3>Reason for Adoption</h3>
              <p className="adoption-reason-content">{selectedRequest.reasonForAdoption}</p>
            </div>
            
            {/* Contact methods */}
            <div className="adoption-contact-methods">
              {selectedRequest.requesterContactNumber && (
                <a 
                  href={`tel:${selectedRequest.requesterContactNumber}`} 
                  className="adoption-contact-method-btn"
                >
                  <FaPhone className="adoption-contact-method-icon" />
                  Call {selectedRequest.requesterName} at {selectedRequest.requesterContactNumber}
                </a>
              )}
              
              <a 
                href={`mailto:${selectedRequest.requesterEmail}`} 
                className="adoption-contact-method-btn"
              >
                <FaEnvelope className="adoption-contact-method-icon" />
                Email {selectedRequest.requesterName} at {selectedRequest.requesterEmail}
              </a>
            </div>
            
            {/* Action buttons */}
            {selectedRequest.reviewStatus === 'Pending' && (
              <div className="adoption-modal-actions">
                <button 
                  className="adoption-btn adoption-btn-outline"
                  onClick={() => setIsDetailsModalOpen(false)}
                >
                  Cancel
                </button>
                
                <button 
                  className="adoption-btn adoption-btn-danger"
                  onClick={() => {
                    handleRejectRequest(selectedRequest.requestId);
                    setIsDetailsModalOpen(false);
                  }}
                >
                  <FaTimes /> Reject Request
                </button>
                
                <button 
                  className="adoption-btn adoption-btn-success"
                  onClick={() => {
                    handleApproveRequest(selectedRequest.requestId);
                    setIsDetailsModalOpen(false);
                  }}
                >
                  <FaCheck /> Approve Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsReceived;