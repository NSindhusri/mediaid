import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Heart } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MediAid</h3>
          <p>Your trusted emergency health information platform</p>
          <p className="footer-tagline">
            Made with <Heart size={14} /> for emergencies
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/services">Emergency Services</Link>
          <Link to="/blood-requests">Blood Requests</Link>
          <Link to="/first-aid">First Aid Guide</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-section">
          <h4>Emergency Contacts</h4>
          <a href="tel:108" className="footer-contact">
            <Phone size={16} /> 108 - Ambulance
          </a>
          <a href="tel:102" className="footer-contact">
            <Phone size={16} /> 102 - Emergency
          </a>
          <a href="mailto:info@mediaid.com" className="footer-contact">
            <Mail size={16} /> info@mediaid.com
          </a>
        </div>

        <div className="footer-section">
          <h4>Important</h4>
          <p>In case of emergency, always call local emergency services first.</p>
          <p className="footer-disclaimer">
            This platform provides information only. Not a substitute for professional medical care.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MediAid. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
