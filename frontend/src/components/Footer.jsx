import Icon from './Icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <Icon name="car" size={20} />
            <span>Cruise</span>
          </div>
          <p className="footer-desc">
            High-performance luxury vehicle rentals for the discerning driver.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Fleet</h4>
            <a href="/fleet">Supercars</a>
            <a href="/fleet">Luxury Sedans</a>
            <a href="/fleet">SUVs</a>
            <a href="/fleet">Hypercars</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="/">About Us</a>
            <a href="/">Careers</a>
            <a href="/">Press</a>
            <a href="/">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="/">Help Center</a>
            <a href="/">Terms</a>
            <a href="/">Privacy</a>
            <a href="/">Insurance</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cruise. All rights reserved.</p>
          <div className="footer-social">
            <a href="/" aria-label="Instagram">
              <Icon name="instagram" size={20} />
            </a>
            <a href="/" aria-label="Twitter/X">
              <Icon name="twitter" size={20} />
            </a>
            <a href="/" aria-label="LinkedIn">
              <Icon name="linkedin" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
