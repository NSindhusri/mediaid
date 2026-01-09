import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import LocationPermission, { useLocation } from '../components/LocationService/LocationService'
import api from '../api/client'
import './Services.css'

const Services = () => {
  const { location, getCurrentLocation } = useLocation()
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [openNow, setOpenNow] = useState(false)
  const [sortBy, setSortBy] = useState('distance')



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
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [])

  // Update location when component mounts (or permission granted)
  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // 1. Map services to include distance if location is available
    let processedServices = services.map(service => {
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

    // 2. Filter list
    let filtered = [...processedServices];

    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((service) => service.type === selectedType)
    }

    if (openNow) {
      filtered = filtered.filter((service) => service.isOpen)
    }

    // 3. Sort list
    if (sortBy === 'distance') {
      // If sorting by distance, services with distance go first, closest first.
      // Services without distance (location off or invalid lat/lng) go to bottom.
      filtered.sort((a, b) => {
        const distA = a.distance ? parseFloat(a.distance) : Infinity;
        const distB = b.distance ? parseFloat(b.distance) : Infinity;
        return distA - distB;
      });
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredServices(filtered)
  }, [searchQuery, selectedType, openNow, sortBy, services, location])

  return (
    <div className="services-page">
      <Helmet>
        <title>Emergency Services Directory - MediAid</title>
        <meta name="description" content="Browse our complete directory of emergency medical services including hospitals, blood banks, pharmacies, and ambulance providers." />
      </Helmet>
      <div className="services-header">
        <h1>Emergency Services Directory</h1>
        <p>Find and contact emergency medical services near you</p>
      </div>

      <div className="services-filters">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="distance">Sort by Distance</option>
            <option value="name">Sort by Name</option>
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

        <LocationPermission onLocationGranted={getCurrentLocation} />
      </div>

      <div className="services-stats">
        <p>Showing {filteredServices.length} service(s)</p>
      </div>

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <div className="no-results">
            <p>No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
