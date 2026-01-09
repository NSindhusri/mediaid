import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Phone, MapPin, Clock, Droplet } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import './BloodRequests.css'

const BloodRequests = () => {
  const [requests, setRequests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    bloodGroup: '',
    hospital: '',
    urgency: 'normal',
    contact: '',
    location: '',
    additionalInfo: '',
  })
  const { user } = useAuth();

  const fetchRequests = async () => {
    try {
      const response = await api.get('/blood-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching blood requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/blood-requests', {
        ...formData,
        userId: user ? user.id : null
      });
      fetchRequests(); // Refresh list
      setFormData({
        bloodGroup: '',
        hospital: '',
        urgency: 'normal',
        contact: '',
        location: '',
        additionalInfo: '',
      })
      setShowForm(false)
      alert('Blood request posted successfully!')
    } catch (error) {
      console.error("Error posting request:", error);
      alert("Failed to post blood request.");
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'urgent-critical'
      case 'urgent':
        return 'urgent-high'
      default:
        return 'urgent-normal'
    }
  }

  return (
    <div className="blood-requests-page">
      <Helmet>
        <title>Blood Requests & Donation - MediAid</title>
        <meta name="description" content="Find urgent blood donation requests or post your own. Connect with donors and hospitals nearby to save lives." />
      </Helmet>
      <div className="page-header">
        <h1>Blood Requests</h1>
        <p>Post or find blood donation requests in your area</p>
      </div>

      <div className="blood-requests-actions">
        <button className="post-request-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          Post Blood Request
        </button>
      </div>

      {showForm && (
        <div className="blood-request-form-container">
          <form className="blood-request-form" onSubmit={handleSubmit}>
            <h2>New Blood Request</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Urgency Level *</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Hospital/Location *</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Enter hospital name or location"
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Number *</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+91-XXXXXXXXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional details..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Post Request
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blood-requests-list">
        <h2>Active Blood Requests</h2>
        {requests.length > 0 ? (
          <div className="requests-grid">
            {requests.map((request) => (
              <div key={request.id} className={`blood-request-card ${getUrgencyClass(request.urgency)}`}>
                <div className="request-header">
                  <div className="blood-group-badge">
                    <Droplet size={24} />
                    <span>{request.bloodGroup}</span>
                  </div>
                  <div className={`urgency-badge ${getUrgencyClass(request.urgency)}`}>
                    {request.urgency.toUpperCase()}
                  </div>
                </div>

                <div className="request-details">
                  <div className="detail-item">
                    <span className="detail-label">Hospital:</span>
                    <span className="detail-value">{request.hospital}</span>
                  </div>

                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{request.location}</span>
                  </div>

                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{new Date(request.created_at).toLocaleDateString()} at {new Date(request.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className="detail-item">
                    <Phone size={16} />
                    <a href={`tel:${request.contact}`}>{request.contact}</a>
                  </div>
                </div>

                <div className="request-actions">
                  <a href={`tel:${request.contact}`} className="contact-btn">
                    <Phone size={18} />
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-requests">
            <p>No active blood requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BloodRequests
