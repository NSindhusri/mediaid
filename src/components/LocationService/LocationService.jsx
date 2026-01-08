import { useState, useEffect } from 'react'
import { MapPin, AlertCircle } from 'lucide-react'
import './LocationService.css'

export const useLocation = () => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCurrentLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLoading(false)
      },
      (err) => {
        setError('Unable to retrieve your location. Please enable location permissions.')
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  return { location, error, loading, getCurrentLocation }
}

const LocationPermission = ({ onLocationGranted }) => {
  const { location, error, loading, getCurrentLocation } = useLocation()

  useEffect(() => {
    if (location && onLocationGranted) {
      onLocationGranted(location)
    }
  }, [location, onLocationGranted])

  if (location) {
    return (
      <div className="location-status success">
        <MapPin size={20} />
        <span>Location enabled</span>
      </div>
    )
  }

  return (
    <div className="location-permission">
      {error && (
        <div className="location-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      <button
        className="location-btn"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        <MapPin size={20} />
        {loading ? 'Getting location...' : 'Enable Location'}
      </button>
    </div>
  )
}

export default LocationPermission
