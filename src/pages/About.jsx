import { Helmet } from 'react-helmet-async'
import { Shield, Heart, Zap, Users } from 'lucide-react'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About Us - MediAid Mission</title>
        <meta name="description" content="Learn about MediAid's mission to provide immediate access to emergency health services and connect communities for better healthcare." />
      </Helmet>
      <div className="about-hero">
        <h1>About MediAid</h1>
        <p className="about-tagline">Your Trusted Emergency Health Information Platform</p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          MediAid is dedicated to providing immediate access to emergency health services
          when every second counts. We believe that in critical situations, quick access
          to medical information and services can save lives.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Zap size={32} />
          </div>
          <h3>Fast Response</h3>
          <p>Quick access to emergency services and information when you need it most.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Shield size={32} />
          </div>
          <h3>Reliable Information</h3>
          <p>Verified and up-to-date information about medical facilities and services.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Heart size={32} />
          </div>
          <h3>Community Support</h3>
          <p>Connect with blood donors and emergency responders in your area.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Users size={32} />
          </div>
          <h3>Accessible to All</h3>
          <p>Designed to be easy to use for everyone, especially during stressful situations.</p>
        </div>
      </div>

      <div className="about-section">
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>📍 Location-based search for nearby hospitals, pharmacies, and blood banks</li>
          <li>🗺️ Interactive map view with real-time locations</li>
          <li>🚨 SOS emergency button for instant alerts</li>
          <li>🩸 Blood request platform for urgent needs</li>
          <li>⚕️ Emergency first aid guides</li>
          <li>📱 Mobile-first design for on-the-go access</li>
          <li>🌙 Dark mode support for comfortable viewing</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>How It Works</h2>
        <div className="how-it-works">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enable Location</h3>
            <p>Allow location access to find services nearest to you.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Search Services</h3>
            <p>Find hospitals, pharmacies, blood banks, or ambulance services.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Help</h3>
            <p>Call directly, get directions, or send an SOS alert.</p>
          </div>
        </div>
      </div>

      <div className="about-section disclaimer">
        <h2>Important Disclaimer</h2>
        <p>
          MediAid is an information platform designed to assist users in finding emergency
          health services. This platform does not provide medical advice, diagnosis, or
          treatment. In case of a medical emergency, always call your local emergency
          services (108 in India) immediately.
        </p>
        <p>
          The information provided on this platform is for general informational purposes
          only and should not be used as a substitute for professional medical care.
          Always seek the advice of qualified health providers with any questions you
          may have regarding a medical condition.
        </p>
      </div>
    </div>
  )
}

export default About
