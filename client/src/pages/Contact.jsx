import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>Have questions or want to get in touch? We'd love to hear from you.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Email</h3>
              <p>
                <a href="mailto:info@malibucrewnews.com">info@malibucrewnews.com</a>
              </p>
            </div>

            <div className="info-card">
              <h3>Phone</h3>
              <p>
                <a href="tel:+1234567890">(123) 456-7890</a>
              </p>
            </div>

            <div className="info-card">
              <h3>Location</h3>
              <p>Malibu, California</p>
            </div>

            <div className="info-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="6"
              />
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
            {submitted && <div className="success-message">Message sent successfully!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
