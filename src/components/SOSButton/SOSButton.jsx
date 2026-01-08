import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import './SOSButton.css'

const SOSButton = ({ onSOSClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emergencyType, setEmergencyType] = useState('')

  const handleSOSClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    if (emergencyType) {
      onSOSClick(emergencyType)
      setIsModalOpen(false)
      setEmergencyType('')
    }
  }

  const emergencyTypes = [
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'accident', label: 'Accident' },
    { value: 'blood', label: 'Blood Needed' },
    { value: 'other', label: 'Other Emergency' },
  ]

  return (
    <>
      <button className="sos-button" onClick={handleSOSClick} aria-label="SOS Emergency">
        <AlertTriangle size={32} />
        <span>SOS</span>
      </button>

      {isModalOpen && (
        <div className="sos-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
            <button className="sos-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>
            <h2>Emergency Type</h2>
            <p className="sos-modal-subtitle">Select the type of emergency:</p>
            <div className="emergency-type-list">
              {emergencyTypes.map((type) => (
                <button
                  key={type.value}
                  className={`emergency-type-btn ${emergencyType === type.value ? 'active' : ''}`}
                  onClick={() => setEmergencyType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <button
              className="sos-confirm-btn"
              onClick={handleConfirm}
              disabled={!emergencyType}
            >
              Send SOS Alert
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SOSButton
