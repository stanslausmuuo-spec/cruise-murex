import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ScrollSnapSection from '../components/ScrollSnapSection';
import CarCard from '../components/CarCard';
import Icon from '../components/Icon';
import { useFeaturedCars } from '../api/cars';
import '../styles/snap.css';
import './Home.css';

export default function Home() {
  const featured = useFeaturedCars();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="snap-container">
      <ScrollSnapSection className="hero-section" id="hero">
        <div className="hero-content">
          <span className="hero-badge animate-fade-in">Premium Fleet</span>
          <h1 className="hero-title animate-fade-in-up">
            Drive the <span className="gold-text">Extraordinary</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up stagger-2">
            Experience the world's finest automobiles. From roaring supercars to whisper-quiet luxury,
            Cruise brings you an curated fleet of automotive masterpieces.
          </p>
          <div className="hero-actions animate-fade-in-up stagger-3">
            <button className="btn-primary" onClick={() => navigate('/fleet')}>
              Browse Fleet
              <Icon name="arrow-right" size={18} />
            </button>
            {!user && (
              <button className="btn-secondary" onClick={() => navigate('/signup')}>
                Join Cruise
              </button>
            )}
          </div>
          <div className="hero-stats animate-fade-in-up stagger-4">
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Luxury Vehicles</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">99%</span>
              <span className="hero-stat-label">Satisfaction Rate</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Concierge Support</span>
            </div>
          </div>
        </div>
        <div className="hero-bg-glow" />
      </ScrollSnapSection>

      <ScrollSnapSection className="featured-section" id="featured">
        <div className="featured-header">
          <span className="section-badge">Curated Collection</span>
          <h2>Featured Fleet</h2>
          <p>Hand-picked selection of our most extraordinary vehicles</p>
        </div>
        <div className="featured-grid">
          {featured.map((car, i) => (
            <CarCard key={car._id ?? car.id} car={car} index={i} />
          ))}
        </div>
        <div className="featured-cta">
          <button className="btn-primary" onClick={() => navigate('/fleet')}>
            View All Vehicles
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </ScrollSnapSection>

      <ScrollSnapSection className="why-section" id="why">
        <div className="why-header">
          <span className="section-badge">Why Cruise</span>
          <h2>The Luxury Advantage</h2>
        </div>
        <div className="why-grid">
          <div className="why-card animate-fade-in-up stagger-1">
            <div className="why-icon">
              <Icon name="shield" size={28} />
            </div>
            <h3>Curated Excellence</h3>
            <p>Every vehicle in our fleet is meticulously inspected and maintained to the highest standards.</p>
          </div>
          <div className="why-card animate-fade-in-up stagger-2">
            <div className="why-icon">
              <Icon name="star" size={28} />
            </div>
            <h3>White-Glove Service</h3>
            <p>Personalized delivery, 24/7 roadside assistance, and a dedicated concierge for every booking.</p>
          </div>
          <div className="why-card animate-fade-in-up stagger-3">
            <div className="why-icon">
              <Icon name="check" size={28} />
            </div>
            <h3>Hassle-Free Booking</h3>
            <p>Transparent pricing, instant confirmation, and free cancellation up to 48 hours before pick-up.</p>
          </div>
        </div>
      </ScrollSnapSection>
    </div>
  );
}
