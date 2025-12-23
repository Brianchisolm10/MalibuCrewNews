import { useState } from 'react';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Malibu Crew News</h4>
          <p>Your source for live updates on Pepperdine basketball players and team news. Join our community to discuss the latest games, stats, and player performances.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#players">Players</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#" onClick={() => setShowPrivacy(!showPrivacy)}>Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social">
            <a href="#" className="footer-social-link">Twitter</a>
            <a href="#" className="footer-social-link">Facebook</a>
            <a href="#" className="footer-social-link">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: <a href="mailto:info@malibucrewnews.com">info@malibucrewnews.com</a></p>
          <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
          <p>Location: Malibu, California</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-credentials">
          <p>&copy; 2025 Malibu Crew News. All rights reserved.</p>
          <p>Affiliated with Pepperdine University Athletics</p>
          <p>Built with React | Powered by Node.js</p>
        </div>
      </div>

      {showPrivacy && (
        <div className="privacy-modal">
          <div className="privacy-content">
            <button className="close-btn" onClick={() => setShowPrivacy(false)}>×</button>
            <h2>Privacy Policy</h2>
            
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, post comments, or contact us. This may include your name, email address, and any messages you send.</p>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, including displaying your comments and personalizing your experience on our platform.</p>

            <h3>3. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h3>4. Third-Party Services</h3>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any personal information.</p>

            <h3>5. Cookies</h3>
            <p>We use cookies to enhance your browsing experience and remember your preferences. You can control cookie settings through your browser.</p>

            <h3>6. User Rights</h3>
            <p>You have the right to access, update, or delete your personal information at any time. Contact us at info@malibucrewnews.com to exercise these rights.</p>

            <h3>7. Changes to This Policy</h3>
            <p>We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website.</p>

            <h3>8. Contact Us</h3>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at info@malibucrewnews.com or call (123) 456-7890.</p>

            <p className="last-updated">Last updated: December 2025</p>
          </div>
        </div>
      )}
    </footer>
  );
}
