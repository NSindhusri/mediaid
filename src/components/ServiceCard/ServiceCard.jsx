import { Phone, Navigation, MapPin, Clock } from 'lucide-react'
import './ServiceCard.css'

const ServiceCard = ({ service }) => {
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="service-card">
      <div className="service-card-header">
        <div className="service-type-badge">{service.type}</div>
        <div className={`service-status ${service.isOpen ? 'open' : 'closed'}`}>
          <Clock size={14} />
          {service.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>

      <h3 className="service-name">{service.name}</h3>
      
      {service.address && (
        <div className="service-address">
          <MapPin size={16} />
          <span>{service.address}</span>
        </div>
      )}

      {service.distance && (
        <div className="service-distance">
          📍 {service.distance} away
        </div>
      )}

      <div className="service-card-actions">
        {service.phone && (
          <button
            className="service-action-btn call-btn"
            onClick={() => handleCall(service.phone)}
          >
            <Phone size={18} />
            Call Now
          </button>
        )}
        {service.lat && service.lng && (
          <button
            className="service-action-btn directions-btn"
            onClick={() => handleDirections(service.lat, service.lng)}
          >
            <Navigation size={18} />
            Get Directions
          </button>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
