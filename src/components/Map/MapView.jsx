import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './MapView.css'

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map center updates
const RecenterAutomatically = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 14);
    }
  }, [location, map]);
  return null;
}

const MapView = ({ location, services = [], onServiceClick }) => {
  const defaultCenter = [28.6139, 77.2090]; // Default to New Delhi if no location
  const center = location ? [location.lat, location.lng] : defaultCenter;

  if (!location) {
    return (
      <div className="map-container map-no-location">
        <p>📍 Please enable location to view the map</p>
        <small>Click "Enable Location" above to see nearby services</small>
      </div>
    )
  }

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="map-view">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <strong>Your Location</strong>
          </Popup>
        </Marker>

        <RecenterAutomatically location={location} />

        {/* Service Markers */}
        {services.map(service => {
          if (service.lat && service.lng) {
            return (
              <Marker
                key={service.id}
                position={[service.lat, service.lng]}
                eventHandlers={{
                  click: () => {
                    if (onServiceClick) onServiceClick(service);
                  },
                }}
              >
                <Popup>
                  <div className="map-info-window">
                    <h3>{service.name}</h3>
                    <p>{service.address}</p>
                    <p>📞 {service.phone || 'N/A'}</p>
                    <p>📍 {service.distance || 'N/A'} away</p>
                  </div>
                </Popup>
              </Marker>
            )
          }
          return null;
        })}
      </MapContainer>
    </div>
  )
}

export default MapView
