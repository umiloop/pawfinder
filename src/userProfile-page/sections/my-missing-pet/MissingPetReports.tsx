import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaMapMarkerAlt, FaTrash, FaEdit, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './MissingPetReports.css';
import { getMissingPetReportRequestsByUserId } from '../../../service/UserProfileService';




interface MissingPet {
  id: number;
  petName: string;
  petType: string;
  petBreed: string;
  petImage: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  status: 'missing' | 'found' | 'closed';
  reportDate: string;
  adminApproval: 'pending' | 'approved' | 'rejected';
  adminFeedback?: string;
  reward?: number;
}

const MissingPetReports: React.FC = () => {
  const [reports, setReports] = useState<MissingPet[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<MissingPet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApprovalInfoTooltip, setShowApprovalInfoTooltip] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchMissingPets = async () => {
      try {
        setIsLoading(true);

        // Get userId from localStorage
        const userDataRaw = localStorage.getItem("user");
        const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
        const userId = userData?.userId;

        if (!userId) throw new Error("User ID not found");

        // Fetch from backend
        const response = await getMissingPetReportRequestsByUserId(userId);

         // Transform data to match your interface
         const mockReports: MissingPet[] = response.map((item: any) => ({
          id: item.id,
          petName: item.petName,
          petType: item.petType,
          petBreed: item.breed,
          petImage: item.photoURLs?.[0] || "/default-pet.svg",
          lastSeenLocation: item.location_address || "Unknown",
          lastSeenDate: "N/A",
          contactName: item.ownerName,
          contactPhone: item.phoneNumber,
          contactEmail: item.email,
          description: item.description,
          status: "missing", 
          reportDate: "N/A", 
          adminApproval: item.reviewStatus?.toLowerCase() || "pending",
          adminFeedback: "",
          reward: item.offerReward ? item.rewardAmount : 0
        }));

        setReports(mockReports);
        setTimeout(() => setIsLoading(false), 800); // Simulated delay
      } catch (error) {
        console.error("Error fetching missing pet reports:", error);
        toast.error("Failed to load missing pet reports");
        setIsLoading(false);
      }
    };

    fetchMissingPets();
  }, []);

  const filteredReports = reports.filter((report) => {
    // Filter by status
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    // Filter by approval status
    const matchesApproval = approvalFilter === 'all' || report.adminApproval === approvalFilter;
    
    // Filter by search term
    const matchesSearch =
      searchTerm === '' ||
      report.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.lastSeenLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.petBreed.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesApproval && matchesSearch;
  });

  const handleDeleteReport = (id: number) => {
    // Check if the report is approved and publicly visible
    const reportToDelete = reports.find(r => r.id === id);
    
    if (reportToDelete && reportToDelete.adminApproval === 'approved') {
      if (!window.confirm('This report is approved and publicly visible. Are you sure you want to delete it?')) {
        return;
      }
    } else if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    // In a real app, make an API call to delete
    // await fetch(`/api/missing-pets/${id}`, { method: 'DELETE' });
    
    setReports((prev) => prev.filter((r) => r.id !== id));
    setSelectedReport(null);
    toast.success('Report deleted successfully');
  };

  const handleUpdateStatus = (id: number, newStatus: 'missing' | 'found' | 'closed') => {
    // Get the report to update
    const reportToUpdate = reports.find(r => r.id === id);
    
    // Check admin approval status for status changes
    if (reportToUpdate && reportToUpdate.adminApproval === 'rejected' && newStatus !== 'closed') {
      toast.error("You cannot update the status of a rejected report. Please resubmit with required corrections.");
      return;
    }
    
    if (reportToUpdate && reportToUpdate.adminApproval === 'pending' && newStatus !== 'closed') {
      toast.warning("This report is pending admin approval. Status changes will only be visible to you until approved.");
    }

    // In a real app, make an API call to update status
    // await fetch(`/api/missing-pets/${id}/status`, { 
    //   method: 'PATCH', 
    //   body: JSON.stringify({ status: newStatus }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    
    setReports((prev) => 
      prev.map((report) => 
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
    
    // Update the selected report if it's open in modal
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
    
    toast.success(`Pet status updated to ${newStatus}`);
  };

  const handleResubmitRejectedReport = (id: number) => {
    // In a real app, this would update the report and resubmit for approval
    // await fetch(`/api/missing-pets/${id}/resubmit`, { 
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // });
    
    setReports((prev) => 
      prev.map((report) => 
        report.id === id ? { ...report, adminApproval: 'pending', adminFeedback: undefined } : report
      )
    );
    
    // Update the selected report if it's open in modal
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport({ ...selectedReport, adminApproval: 'pending', adminFeedback: undefined });
    }
    
    toast.success("Report resubmitted for approval");
  };

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

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'missing': return 'missing-badge-danger';
      case 'found': return 'missing-badge-success';
      case 'closed': return 'missing-badge-secondary';
      default: return 'missing-badge-info';
    }
  };

  const getApprovalBadgeClass = (status: string) => {
    switch(status) {
      case 'pending': return 'missing-badge-warning';
      case 'approved': return 'missing-badge-success';
      case 'rejected': return 'missing-badge-danger';
      default: return 'missing-badge-info';
    }
  };

  const getApprovalStatusDescription = (status: string) => {
    switch(status) {
      case 'pending':
        return "Your report is under review. It's visible only to you until approved.";
      case 'approved':
        return "Your report is approved and publicly visible to all users.";
      case 'rejected':
        return "Your report has been rejected. Please review the feedback and resubmit with the required changes.";
      default:
        return "";
    }
  };

  // Check if a report can be updated based on approval status
  const canUpdateReportStatus = (report: MissingPet) => {
    return report.adminApproval !== 'rejected';
  };

  return (
    <div className="missing-reports-container">
      <div className="missing-reports-header">
        <h2>My Missing Pet Reports</h2>
        <button className="missing-add-btn">Report Missing Pet</button>
      </div>

      <div className="missing-approval-info-banner">
        <div className="missing-approval-info-icon" onMouseEnter={() => setShowApprovalInfoTooltip(true)} onMouseLeave={() => setShowApprovalInfoTooltip(false)}>
          <FaInfoCircle />
          {showApprovalInfoTooltip && (
            <div className="missing-approval-tooltip">
              <p><strong>Pending:</strong> Under review, visible only to you</p>
              <p><strong>Approved:</strong> Publicly visible to all users</p>
              <p><strong>Rejected:</strong> Not published, needs corrections</p>
            </div>
          )}
        </div>
        <span>Reports require admin approval before becoming publicly visible</span>
      </div>

      <div className="missing-controls">
        <div className="missing-search-bar">
          <FaSearch className="missing-search-icon" />
          <input
            type="text"
            placeholder="Search by name, breed or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="missing-search-input"
          />
        </div>

        <div className="missing-filters">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="missing-status-filter"
          >
            <option value="all">All Status</option>
            <option value="missing">Missing</option>
            <option value="found">Found</option>
            <option value="closed">Closed</option>
          </select>

          <select 
            value={approvalFilter} 
            onChange={(e) => setApprovalFilter(e.target.value)}
            className="missing-approval-filter"
          >
            <option value="all">All Approvals</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="missing-loading">
          <div className="missing-spinner"></div>
          <p>Loading missing pet reports...</p>
        </div>
      ) : (
        <>
          <div className="missing-report-list">
            {filteredReports.length === 0 ? (
              <div className="missing-empty-state">
                <div className="missing-empty-icon">🔍</div>
                <h3>No matching reports found.</h3>
                <p>
                  {searchTerm || statusFilter !== 'all' || approvalFilter !== 'all' 
                    ? "Try adjusting your filters or search terms."
                    : "You haven't reported any missing pets yet."}
                </p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div key={report.id} className={`missing-report-card ${report.adminApproval === 'rejected' ? 'missing-report-rejected' : ''}`}>
                  {report.adminApproval === 'rejected' && (
                    <div className="missing-rejected-banner">
                      <FaInfoCircle /> Report rejected - Not publicly visible
                    </div>
                  )}
                  {report.adminApproval === 'pending' && (
                    <div className="missing-pending-banner">
                      <FaInfoCircle /> Pending approval - Only visible to you
                    </div>
                  )}
                  <div className="missing-image-container">
                    <img src={report.petImage} alt={report.petName} className="missing-pet-img" />
                    <span className={`missing-status-indicator ${getStatusBadgeClass(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="missing-info">
                    <div className="missing-pet-header">
                      <h3>{report.petName}</h3>
                      <span className={`missing-approval-badge ${getApprovalBadgeClass(report.adminApproval)}`}>
                        {report.adminApproval.charAt(0).toUpperCase() + report.adminApproval.slice(1)}
                      </span>
                    </div>
                    
                    <p className="missing-pet-breed">{report.petType} - {report.petBreed}</p>
                    <p className="missing-location">
                      <FaMapMarkerAlt className="missing-location-icon" /> {report.lastSeenLocation}
                    </p>
                    <p className="missing-date">Last seen: {formatDate(report.lastSeenDate)}</p>
                    
                    <div className="missing-actions">
                      <button 
                        className="missing-view-btn" 
                        onClick={() => setSelectedReport(report)}
                        title="View Details"
                      >
                        <FaEye /> Details
                      </button>
                      
                      {report.adminApproval === 'rejected' ? (
                        <button 
                          className="missing-resubmit-btn" 
                          onClick={() => handleResubmitRejectedReport(report.id)}
                          title="Resubmit Report"
                        >
                          <FaEdit /> Resubmit
                        </button>
                      ) : (
                        <>
                          {report.status === 'missing' && canUpdateReportStatus(report) && (
                            <button 
                              className="missing-found-btn" 
                              onClick={() => handleUpdateStatus(report.id, 'found')}
                              title="Mark as Found"
                            >
                              <FaCheck /> Mark Found
                            </button>
                          )}
                          
                          {report.status !== 'closed' && (
                            <button 
                              className="missing-close-btn" 
                              onClick={() => handleUpdateStatus(report.id, 'closed')}
                              title="Close Report"
                            >
                              <FaTimes /> Close Report
                            </button>
                          )}
                        </>
                      )}
                      
                      <button 
                        className="missing-delete-btn" 
                        onClick={() => handleDeleteReport(report.id)}
                        title="Delete Report"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {selectedReport && (
        <div className="missing-modal-backdrop" onClick={() => setSelectedReport(null)}>
          <div className="missing-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="missing-modal-header">
              <h3>Missing Pet Report Details</h3>
              <button className="missing-modal-close" onClick={() => setSelectedReport(null)}>✖</button>
            </div>
            
            <div className="missing-modal-body">
              {selectedReport.adminApproval !== 'approved' && (
                <div className={`missing-approval-status-banner ${selectedReport.adminApproval === 'rejected' ? 'missing-rejected' : 'missing-pending'}`}>
                  <FaInfoCircle />
                  <p>{getApprovalStatusDescription(selectedReport.adminApproval)}</p>
                </div>
              )}
              
              {selectedReport.adminApproval === 'rejected' && selectedReport.adminFeedback && (
                <div className="missing-feedback-box">
                  <h4>Admin Feedback</h4>
                  <p>{selectedReport.adminFeedback}</p>
                </div>
              )}
                
              <div className="missing-modal-main">
                <div className="missing-modal-image">
                  <img src={selectedReport.petImage} alt={selectedReport.petName} />
                  <div className="missing-modal-badges">
                    <span className={`missing-status-badge ${getStatusBadgeClass(selectedReport.status)}`}>
                      {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                    </span>
                    <span className={`missing-approval-badge ${getApprovalBadgeClass(selectedReport.adminApproval)}`}>
                      {selectedReport.adminApproval.charAt(0).toUpperCase() + selectedReport.adminApproval.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="missing-modal-info">
                  <h4>{selectedReport.petName}</h4>
                  <div className="missing-modal-field">
                    <span>Type/Breed:</span>
                    <p>{selectedReport.petType} - {selectedReport.petBreed}</p>
                  </div>
                  <div className="missing-modal-field">
                    <span>Last Seen:</span>
                    <p>{formatDate(selectedReport.lastSeenDate)}</p>
                  </div>
                  <div className="missing-modal-field">
                    <span>Location:</span>
                    <p>{selectedReport.lastSeenLocation}</p>
                  </div>
                  <div className="missing-modal-field">
                    <span>Report Date:</span>
                    <p>{formatDate(selectedReport.reportDate)}</p>
                  </div>
                  {selectedReport.reward && (
                    <div className="missing-modal-field">
                      <span>Reward:</span>
                      <p className="missing-reward">${selectedReport.reward}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="missing-modal-description">
                <h4>Description</h4>
                <p>{selectedReport.description}</p>
              </div>
              
              <div className="missing-modal-contact">
                <h4>Contact Information</h4>
                <p><strong>Name:</strong> {selectedReport.contactName}</p>
                <p><strong>Phone:</strong> {selectedReport.contactPhone}</p>
                <p><strong>Email:</strong> {selectedReport.contactEmail}</p>
              </div>
              
              <div className="missing-modal-actions">
                {selectedReport.adminApproval === 'rejected' ? (
                  <button 
                    className="missing-resubmit-btn" 
                    onClick={() => {
                      handleResubmitRejectedReport(selectedReport.id);
                      setSelectedReport(null);
                    }}
                  >
                    <FaEdit /> Resubmit Report
                  </button>
                ) : (
                  <>
                    {selectedReport.status === 'missing' && canUpdateReportStatus(selectedReport) && (
                      <button 
                        className="missing-found-btn" 
                        onClick={() => {
                          handleUpdateStatus(selectedReport.id, 'found');
                        }}
                      >
                        <FaCheck /> Mark as Found
                      </button>
                    )}
                    
                    {selectedReport.status !== 'closed' && (
                      <button 
                        className="missing-close-btn" 
                        onClick={() => {
                          handleUpdateStatus(selectedReport.id, 'closed');
                        }}
                      >
                        <FaTimes /> Close Report
                      </button>
                    )}
                    
                    <button 
                      className="missing-edit-btn"
                      onClick={() => {
                        // Implementation for edit functionality
                        toast.info("Edit functionality to be implemented");
                        setSelectedReport(null);
                      }}
                    >
                      <FaEdit /> Edit Report
                    </button>
                  </>
                )}
                
                <button
                  className="missing-delete-btn"
                  onClick={() => {
                    handleDeleteReport(selectedReport.id);
                  }}
                >
                  <FaTrash /> Delete Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingPetReports;
