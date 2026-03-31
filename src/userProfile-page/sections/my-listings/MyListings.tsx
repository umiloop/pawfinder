import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaSort, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './MyListings.css';
import { getPetRehomeRequestsByUserId, getShelterPetRequestsByUserId } from '../../../service/UserProfileService';

interface Pet {
  id: number;
  petName: string;
  petImage: string;
  petType: string;
  petBreed: string;
  petAge: number;
  petGender: string;
  listingType: 'shelter' | 'rehome';
  petAvailabilityStatus: 'available' | 'adopted' | 'pending';
  datePosted: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

const MyListings: React.FC = () => {
  const [rehomePets, setRehomePets] = useState<Pet[]>([]);
  const [shelterPets, setShelterPets] = useState<Pet[]>([]);
  const [filteredListings, setFilteredListings] = useState<Pet[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {

        // Get userId from localStorage
        const userDataRaw = localStorage.getItem("user");
        const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
        const userId = userData?.userId;

        if (!userId) throw new Error("User ID not found");

        // Fetch from backend
        const rehomeResponse = await getPetRehomeRequestsByUserId(userId);
        
        const rehomeData: Pet[] = rehomeResponse.map((item: any) => ({
            id: item.id,
            petName: item.petName,
            petImage: item.photoUrls?.[0] || "/default-pet.jpg",
            petType: item.petType,
            petBreed: item.breed,
            petAge: item.age,
            petGender: item.gender,
            listingType: "rehome",
            petAvailabilityStatus: "available",
            datePosted: "2023-04-15",
            approvalStatus: item.reviewStatus?.toLowerCase() || "pending"
        }));

        const shelterResponse = await getShelterPetRequestsByUserId(userId);
        
        const shelterData: Pet[] = shelterResponse.map((item: any) => ({
          id: item.id,
          petName: item.petName,
          petImage: item.photoUrls?.[0] || "/default-pet.jpg",
          petType: item.petType,
          petBreed: item.breed,
          petAge: item.age,
          petGender: item.gender,
          listingType: "shelter",
          petAvailabilityStatus: "available",
          datePosted: "2023-04-15",
          approvalStatus: item.reviewStatus?.toLowerCase() || "pending"
        }));

        setRehomePets(rehomeData);
        setShelterPets(shelterData);

        const combined = sortListings([...rehomeData, ...shelterData], sortOrder);
        setFilteredListings(combined);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("Error fetching pet listings:", error);
        toast.error("Failed to load your pet listings");
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, typeFilter, approvalFilter, searchTerm, rehomePets, shelterPets]);

  const sortListings = (listingsToSort: Pet[], order: 'newest' | 'oldest') => {
    return [...listingsToSort].sort((a, b) => {
      const dateA = new Date(a.datePosted).getTime();
      const dateB = new Date(b.datePosted).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
    applyFilters(order);
  };

  const applyFilters = (order: 'newest' | 'oldest' = sortOrder) => {
    let combined: Pet[] = [];

    if (typeFilter === 'rehome') {
      combined = [...rehomePets];
    } else if (typeFilter === 'shelter') {
      combined = [...shelterPets];
    } else {
      combined = [...rehomePets, ...shelterPets];
    }

    if (statusFilter !== 'all') {
      combined = combined.filter(pet => pet.petAvailabilityStatus === statusFilter);
    }

    if (approvalFilter !== 'all') {
      combined = combined.filter(pet => pet.approvalStatus === approvalFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      combined = combined.filter(pet =>
        pet.petName.toLowerCase().includes(term) ||
        pet.petBreed.toLowerCase().includes(term) ||
        pet.petType.toLowerCase().includes(term)
      );
    }

    const sorted = sortListings(combined, order);
    setFilteredListings(sorted);
  };

  const handleDeleteListing = (petId: number) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        setRehomePets(prev => prev.filter(p => p.id !== petId));
        setShelterPets(prev => prev.filter(p => p.id !== petId));
        toast.success("Pet listing deleted successfully");
      } catch (error) {
        console.error("Error deleting pet listing:", error);
        toast.error("Failed to delete pet listing");
      }
    }
  };

  const handleMarkAsAdopted = (petId: number) => {
    void petId;
    toast.success("Pet has been marked as adopted!");
  };

  const getAvailabilityBadgeClass = (status: string) => {
    switch (status) {
      case 'available': return 'listing-availability-available';
      case 'adopted': return 'listing-availability-adopted';
      case 'pending': return 'listing-availability-pending';
      default: return '';
    }
  };

  const getApprovalBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'listing-approval-approved';
      case 'pending': return 'listing-approval-pending';
      case 'rejected': return 'listing-approval-rejected';
      default: return '';
    }
  };
  
  return (
    <div className="my-listings-section">
      <div className="listings-header">
        <h2>My Pet Listings</h2>
        <div className="header-actions">
          <div className="sort-controls">
            <button 
              className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`} 
              onClick={() => handleSortChange('newest')}
            >
              <FaSort /> Newest
            </button>
            <button 
              className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
              onClick={() => handleSortChange('oldest')}
            >
              <FaSort /> Oldest
            </button>
          </div>
        </div>
      </div>
      
      <div className="filter-search-bar">
        <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="status-filter" className="filter-label">Status</label>
            <select 
              id="status-filter"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="type-filter" className="filter-label">Type</label>
            <select 
              id="type-filter"
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="type-filter"
            >
              <option value="all">All Types</option>
              <option value="rehome">Rehoming</option>
              <option value="shelter">Shelter</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="approval-filter" className="filter-label">Approval</label>
            <select 
              id="approval-filter"
              value={approvalFilter} 
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="approval-filter"
            >
              <option value="all">All Approval</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text"
              placeholder="Search by name, breed, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search pet listings"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn"
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
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your listings...</p>
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="listings-grid">
          {filteredListings.map(pet => (
            <div 
              key={pet.id} 
              className={`listing-card ${
                pet.approvalStatus === 'rejected' ? 'listing-card-rejected' : 
                pet.approvalStatus === 'pending' ? 'listing-card-pending' : ''
              }`}
            >
              <div className="pet-image-container">
                <img 
                  src={pet.petImage} 
                  alt={pet.petName} 
                  className="pet-image" 
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-pet.jpg';
                  }}
                />
                {/* Approval status badge in top left */}
                <div className="badge-container">
                  <span className={`listing-badge ${getApprovalBadgeClass(pet.approvalStatus)}`}>
                    {pet.approvalStatus.charAt(0).toUpperCase() + pet.approvalStatus.slice(1)}
                  </span>
                </div>
                
                {/* Availability status badge in bottom right */}
                <span className={`listing-badge ${getAvailabilityBadgeClass(pet.petAvailabilityStatus)}`}>
                  {pet.petAvailabilityStatus.charAt(0).toUpperCase() + pet.petAvailabilityStatus.slice(1)}
                </span>
                
                {/* Type badge in top right */}
                <span className="listing-type-badge">
                  {pet.listingType === 'rehome' ? 'Rehoming' : 'Shelter'}
                </span>
              </div>
              
              <div className="listing-details">
                <h3 className="pet-name">{pet.petName}</h3>
                <p className="pet-info">
                  {pet.petBreed} • {pet.petAge} {pet.petAge === 1 ? 'yr' : 'yrs'} • {pet.petGender}
                </p>
                <p className="date-posted">Posted: {new Date(pet.datePosted).toLocaleDateString()}</p>
                
                {pet.approvalStatus === 'rejected' && (
                  <div className="rejection-warning">
                    <FaExclamationTriangle className="warning-icon" />
                    <span>This listing was rejected and needs attention</span>
                  </div>
                )}
                
                {pet.approvalStatus === 'pending' && (
                  <div className="pending-notice">
                    <FaExclamationTriangle className="notice-icon" />
                    <span>Pending admin approval</span>
                  </div>
                )}
                
                <div className="listing-actions">
                  {pet.petAvailabilityStatus !== 'adopted' && pet.approvalStatus === 'approved' && (
                    <button 
                      className="mark-adopted-btn"
                      onClick={() => handleMarkAsAdopted(pet.id)}
                      disabled={pet.approvalStatus !== 'approved'}
                    >
                      Mark Adopted
                    </button>
                  )}
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteListing(pet.id)}
                    title="Delete Listing"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🐾</div>
          <h3>No pet listings found</h3>
          {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || approvalFilter !== 'all' ? (
            <p>Try adjusting your filters or search criteria</p>
          ) : (
            <p>You haven't listed any pets for adoption yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyListings;