import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { User, Droplet, AlertTriangle, Phone, Save, Edit } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    bloodGroup: '',
    allergies: '',
    emergencyContact1: '',
    emergencyContact2: '',
    emergencyContact3: '',
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        bloodGroup: user.blood_group || user.bloodGroup || '',
        allergies: user.allergies || '',
        emergencyContact1: user.emergency_contact_1 || user.emergencyContact1 || '',
        emergencyContact2: user.emergency_contact_2 || user.emergencyContact2 || '',
        emergencyContact3: user.emergency_contact_3 || user.emergencyContact3 || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    const result = await updateProfile({
      name: profileData.name,
      bloodGroup: profileData.bloodGroup,
      allergies: profileData.allergies,
      emergencyContact1: profileData.emergencyContact1,
      emergencyContact2: profileData.emergencyContact2,
      emergencyContact3: profileData.emergencyContact3
    });
    if (result.success) {
      setIsEditing(false);
      alert('Profile saved successfully!');
    } else {
      alert(result.message);
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  if (!user && !isEditing) {
    return (
      <div className="profile-page">
        <Helmet>
          <title>User Profile - MediAid</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="profile-empty">
          <User size={64} />
          <h2>Please Login</h2>
          <p>You need to be logged in to view or create your emergency health card.</p>
          <a href="/login" className="create-profile-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} />
            Login
          </a>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <h1>Emergency Health Card</h1>
          <p>Your information is stored locally and only accessible by you.</p>
        </div>

        <div className="profile-form-container">
          <form className="profile-form">
            <div className="form-section">
              <h2>Personal Information</h2>

              <div className="form-group">
                <label htmlFor="name">
                  <User size={18} />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup">
                  <Droplet size={18} />
                  Blood Group *
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={profileData.bloodGroup}
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
                <label htmlFor="allergies">
                  <AlertTriangle size={18} />
                  Allergies / Medical Conditions
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={profileData.allergies}
                  onChange={handleChange}
                  placeholder="List any allergies or medical conditions..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Emergency Contacts</h2>
              <p className="section-description">
                Add up to 3 emergency contacts who can be notified during emergencies.
              </p>

              <div className="form-group">
                <label htmlFor="emergencyContact1">
                  <Phone size={18} />
                  Emergency Contact 1 *
                </label>
                <input
                  type="tel"
                  id="emergencyContact1"
                  name="emergencyContact1"
                  value={profileData.emergencyContact1}
                  onChange={handleChange}
                  required
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact2">
                  <Phone size={18} />
                  Emergency Contact 2
                </label>
                <input
                  type="tel"
                  id="emergencyContact2"
                  name="emergencyContact2"
                  value={profileData.emergencyContact2}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX (Optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact3">
                  <Phone size={18} />
                  Emergency Contact 3
                </label>
                <input
                  type="tel"
                  id="emergencyContact3"
                  name="emergencyContact3"
                  value={profileData.emergencyContact3}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX (Optional)"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="save-btn"
              >
                <Save size={20} />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }



  return (
    <div className="profile-page">
      <Helmet>
        <title>Emergency Health Card - MediAid</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="profile-header">
        <h1>Emergency Health Card</h1>
        <button className="edit-btn" onClick={handleEdit}>
          <Edit size={20} />
          Edit
        </button>
      </div>

      <div className="health-card">
        <div className="card-header">
          <div className="card-icon">
            <User size={32} />
          </div>
          <h2>{user.name || 'Your Name'}</h2>
        </div>

        <div className="card-section">
          <div className="card-item">
            <div className="card-item-label">
              <Droplet size={20} />
              Blood Group
            </div>
            <div className="card-item-value">{user.blood_group || user.bloodGroup || 'Not set'}</div>
          </div>

          {(user.allergies) && (
            <div className="card-item">
              <div className="card-item-label">
                <AlertTriangle size={20} />
                Allergies / Conditions
              </div>
              <div className="card-item-value">{user.allergies}</div>
            </div>
          )}

          <div className="card-item">
            <div className="card-item-label">
              <Phone size={20} />
              Emergency Contacts
            </div>
            <div className="card-item-value">
              {(user.emergency_contact_1 || user.emergencyContact1) && (
                <div>
                  <strong>Contact 1:</strong>{' '}
                  <a href={`tel:${user.emergency_contact_1 || user.emergencyContact1}`}>
                    {user.emergency_contact_1 || user.emergencyContact1}
                  </a>
                </div>
              )}
              {(user.emergency_contact_2 || user.emergencyContact2) && (
                <div>
                  <strong>Contact 2:</strong>{' '}
                  <a href={`tel:${user.emergency_contact_2 || user.emergencyContact2}`}>
                    {user.emergency_contact_2 || user.emergencyContact2}
                  </a>
                </div>
              )}
              {(user.emergency_contact_3 || user.emergencyContact3) && (
                <div>
                  <strong>Contact 3:</strong>{' '}
                  <a href={`tel:${user.emergency_contact_3 || user.emergencyContact3}`}>
                    {user.emergency_contact_3 || user.emergencyContact3}
                  </a>
                </div>
              )}
              {!(user.emergency_contact_1 || user.emergencyContact1) && (
                <div className="no-data">No contacts added</div>
              )}
            </div>
          </div>
        </div>

        <div className="card-footer">
          <p>Show this card to medical personnel in case of emergency</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
