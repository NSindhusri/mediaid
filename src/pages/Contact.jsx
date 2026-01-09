import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your feedback! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact MediAid - Emergency Support</title>
        <meta name="description" content="Get in touch with MediAid. We are here to help with your emergency health information needs." />
      </Helmet>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Have questions, feedback, or need assistance? We're here to help!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Reach out to us through any of the following channels:</p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div className="contact-details">
                <h3>Emergency Helpline</h3>
                <a href="tel:108">108</a>
                <a href="tel:102">102</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <a href="mailto:info@mediaid.com">info@mediaid.com</a>
                <a href="mailto:support@mediaid.com">support@mediaid.com</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-details">
                <h3>Address</h3>
                <p>MediAid Platform<br />Available Nationwide</p>
              </div>
            </div>
          </div>

          <div className="emergency-notice">
            <h3>🚨 For Medical Emergencies</h3>
            <p>
              If you are experiencing a medical emergency, please call your local
              emergency services (108) immediately. Do not use this contact form
              for urgent medical situations.
            </p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Type your message here..."
              />
            </div>

            <button type="submit" className="submit-btn">
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
