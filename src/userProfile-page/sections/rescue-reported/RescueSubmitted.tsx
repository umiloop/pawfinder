import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './RescueSubmitted.css';
import { getStrayAnimalReportRequestsByUserId } from '../../../service/UserProfileService';

interface RescueReport {
  id: number;
  animalType: string;
  location: string;
  description: string;
  image?: string;
  reportDate: string;
  status: 'reviewing' | 'accepted' | 'rejected' | 'resolved';
  emergencyLevel: 'low' | 'medium' | 'high';
  followUpNotes?: string;
  contactName: string;
  contactPhone: string;
}

const RescueSubmitted: React.FC = () => {
  const [rescueReports, setRescueReports] = useState<RescueReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<RescueReport[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<RescueReport | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch rescue reports from your API
    const fetchRescueReports = async () => {
      try {
        // Replace with actual API call
        // const response = await RescueService.getUserReports();
        // setRescueReports(response.data);

        // Get userId from localStorage
        const userDataRaw = localStorage.getItem("user");
        const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
        const userId = userData?.userId;

        if (!userId) throw new Error("User ID not found");

        const response = await getStrayAnimalReportRequestsByUserId(userId);

        const statusMap: { [key: string]: RescueReport['status'] } = {
          Pending: 'reviewing',
          Approved: 'resolved',
          Resolved: 'resolved',
          Rejected: 'rejected',
        };

        const mockReports: RescueReport[] = response.map((item: any) => ({
          id: item.id,
          animalType: item.animalType,
          location: item.locationText,
          description: item.description || 'No description provided.',
          image: item.photoUrls?.[0] || '/default-pet.svg',
          reportDate: item.createdAt,
          status: statusMap[item.reviewStatus] || 'reviewing', // Default to 'reviewing' if unknown
          emergencyLevel: "high",
          contactName: item.contactName,
          contactPhone: item.contactPhone,
          followUpNotes: ''
        }));
        
        setRescueReports(mockReports);
        setFilteredReports(mockReports);
        setTimeout(() => setIsLoading(false), 1000); // Simulate loading
      } catch (error) {
        console.error("Error fetching rescue reports:", error);
        toast.error("Failed to load rescue reports");
        setIsLoading(false);
      }
    };
    
    fetchRescueReports();
  }, []);
  
  useEffect(() => {
    filterReports();
  }, [statusFilter, searchTerm, rescueReports]);
  
  const filterReports = () => {
    let filtered = [...rescueReports];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.animalType.toLowerCase().includes(term) || 
        report.location.toLowerCase().includes(term) ||
        report.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredReports(filtered);
  };
  
  const handleViewDetails = (report: RescueReport) => {
    setSelectedReport(report);
    setIsDetailsModalOpen(true);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'reviewing': return 'badge-warning';
      case 'accepted': return 'badge-info';
      case 'resolved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return '';
    }
  };
  
  const getEmergencyLevelClass = (level: string) => {
    switch (level) {
      case 'low': return 'emergency-low';
      case 'medium': return 'emergency-medium';
      case 'high': return 'emergency-high';
      default: return '';
    }
  };
  
  return (
    <div className="rescue-reports-section">
      <div className="rescue-filter-search-bar">
        <div className="rescue-filter-container">
          <FaFilter className="filter-icon" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rescue-status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="reviewing">Reviewing</option>
            <option value="accepted">Accepted</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="rescue-search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search by type, location or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rescue-search-input"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="rescue-loading-container">
          <div className="rescue-loading-spinner"></div>
          <p>Loading your rescue reports...</p>
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="rescue-reports-table-container">
          <table className="rescue-reports-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Location</th>
                <th>Report Date</th>
                <th>Emergency</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id}>
                  <td>{report.animalType}</td>
                  <td>{report.location}</td>
                  <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`rescue-emergency-badge ${getEmergencyLevelClass(report.emergencyLevel)}`}>
                      {report.emergencyLevel.charAt(0).toUpperCase() + report.emergencyLevel.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`rescue-status-badge ${getStatusBadgeClass(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="rescue-view-btn" 
                      onClick={() => handleViewDetails(report)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rescue-no-results">
          <div className="rescue-no-results-icon">🔍</div>
          <h3>No rescue reports found</h3>
          {searchTerm || statusFilter !== 'all' ? (
            <p>Try adjusting your filters or search criteria</p>
          ) : (
            <p>You haven't submitted any rescue reports yet</p>
          )}
          <button className="rescue-btn-primary" onClick={() => window.location.href = '/rescue'}>
            Report a Rescue
          </button>
        </div>
      )}
      
      {/* Report Details Modal - Updated with unique classnames */}
      {isDetailsModalOpen && selectedReport && (
        <div className="rescue-modal-overlay" onClick={() => setIsDetailsModalOpen(false)}>
          <div className="rescue-modal-content rescue-details-modal" onClick={e => e.stopPropagation()}>
            <button className="rescue-close-modal-btn" onClick={() => setIsDetailsModalOpen(false)}>×</button>
            
            <h2>Rescue Report Details</h2>
            
            <div className="rescue-report-details">
              <div className="report-header">
                <div className="rescue-report-header-left">
                  <h3>{selectedReport.animalType} Rescue Report</h3>
                  <p className="rescue-report-date">Reported on {new Date(selectedReport.reportDate).toLocaleString()}</p>
                </div>
                <div className="rescue-report-status">
                  <span className={`rescue-status-badge ${getStatusBadgeClass(selectedReport.status)}`}>
                    {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                  </span>
                  <span className={`rescue-emergency-badge ${getEmergencyLevelClass(selectedReport.emergencyLevel)}`}>
                    {selectedReport.emergencyLevel.charAt(0).toUpperCase() + selectedReport.emergencyLevel.slice(1)} Priority
                  </span>
                </div>
              </div>
              
              <div className="rescue-report-content">
                <div className="rescue-report-fields">
                  <div className="rescue-report-field">
                    <label>Location</label>
                    <p>{selectedReport.location}</p>
                  </div>
                  
                  <div className="rescue-report-field">
                    <label>Description</label>
                    <p>{selectedReport.description}</p>
                  </div>
                  
                  <div className="rescue-report-field">
                    <label>Contact Information</label>
                    <p>{selectedReport.contactName} | {selectedReport.contactPhone}</p>
                  </div>
                  
                  {selectedReport.followUpNotes && (
                    <div className="rescue-report-field">
                      <label>Follow-up Notes</label>
                      <p>{selectedReport.followUpNotes}</p>
                    </div>
                  )}
                </div>
                
                {selectedReport.image && (
                  <div className="rescue-report-image">
                    <img src={selectedReport.image} alt="Rescue situation" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RescueSubmitted;