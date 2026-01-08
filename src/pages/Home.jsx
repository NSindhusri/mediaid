import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import SOSButton from '../components/SOSButton/SOSButton'
import LocationPermission from '../components/LocationService/LocationService'
import MapView from '../components/Map/MapView'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import api from '../api/client'
import './Home.css'

const Home = () => {
  const [location, setLocation] = useState(null)
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [openNow, setOpenNow] = useState(false)
  const [showMap, setShowMap] = useState(true)

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(1) + ' km';
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        const dataWithDistance = response.data.map(service => {
          let distance = null;
          if (location && service.lat && service.lng) {
            distance = calculateDistance(location.lat, location.lng, parseFloat(service.lat), parseFloat(service.lng));
          }
          return {
            ...service,
            distance,
            isOpen: service.is_open === 1 || service.is_open === true
          };
        });
        setServices(dataWithDistance);
        setFilteredServices(dataWithDistance);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [location]); // Re-fetch or re-calc when location changes

  useEffect(() => {
    let filtered = services.map(service => {
      let distance = service.distance;
      // Recalculate distance if location is available and distance wasn't set or needs update
      if (location && service.lat && service.lng && !distance) {
        distance = calculateDistance(location.lat, location.lng, parseFloat(service.lat), parseFloat(service.lng));
      }
      return { ...service, distance };
    });

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((service) => service.type === selectedType)
    }

    // Filter by open now
    if (openNow) {
      filtered = filtered.filter((service) => service.isOpen)
    }

    // Sort by distance if location is available
    if (location) {
      filtered.sort((a, b) => {
        const distA = parseFloat(a.distance) || Infinity // Use Infinity for services without distance
        const distB = parseFloat(b.distance) || Infinity
        return distA - distB
      })
    }

    setFilteredServices(filtered)
  }, [searchQuery, selectedType, openNow, services, location])

  const handleSOSClick = async (emergencyType) => {
    try {
      const response = await api.post('/sos', {
        emergencyType,
        location,
        timestamp: new Date().toISOString()
      });
      alert(`SOS Alert sent! Help for ${emergencyType} is on the way.`);
    } catch (error) {
      console.error("SOS Error", error);
      alert("Failed to send SOS alert to server. Calling local emergency services...");
    }
  }

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Emergency Health Services</h1>
        <p>Find nearby hospitals, pharmacies, blood banks, and ambulance services instantly</p>
      </div>

      <div className="home-search-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search for hospitals, pharmacies, blood banks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="hospital">Hospitals</option>
            <option value="pharmacy">Pharmacies</option>
            <option value="blood-bank">Blood Banks</option>
            <option value="ambulance">Ambulance</option>
          </select>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={openNow}
              onChange={(e) => setOpenNow(e.target.checked)}
            />
            <span>Open Now</span>
          </label>
        </div>

        <div className="location-section">
          <LocationPermission onLocationGranted={setLocation} />
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${showMap ? 'active' : ''}`}
          onClick={() => setShowMap(true)}
        >
          Map View
        </button>
        <button
          className={`toggle-btn ${!showMap ? 'active' : ''}`}
          onClick={() => setShowMap(false)}
        >
          List View
        </button>
      </div>

      {showMap && (
        <div className="map-section">
          <MapView location={location} services={filteredServices} />
        </div>
      )}

      {!showMap && (
        <div className="services-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="no-results">
              <p>No services found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      )}

      <SOSButton onSOSClick={handleSOSClick} />
    </div>
  )
}

export default Home
