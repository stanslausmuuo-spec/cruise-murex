import { Link } from 'react-router-dom';
import Icon from './Icon';
import './CarCard.css';

export default function CarCard({ car, index = 0 }) {
  return (
    <article className={`car-card animate-fade-in-up stagger-${(index % 5) + 1}`}>
      <div className="car-card-image">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          loading="lazy"
          width="400"
          height="250"
        />
        <span className="car-card-category">{car.category}</span>
      </div>
      <div className="car-card-body">
        <h3 className="car-card-title">
          {car.make} <span className="gold-text">{car.model}</span>
        </h3>
        <p className="car-card-year">{car.year}</p>
        <div className="car-card-specs">
          <span className="car-card-spec">
            <Icon name="speed" size={14} />
            {car.speed}
          </span>
          <span className="car-card-spec">
            <Icon name="fuel" size={14} />
            {car.fuelType}
          </span>
          <span className="car-card-spec">
            <Icon name="seat" size={14} />
            {car.seats} seats
          </span>
        </div>
        <div className="car-card-footer">
          <div className="car-card-price">
            <span className="car-card-price-value">${car.dailyRate.toLocaleString()}</span>
            <span className="car-card-price-label">/ day</span>
          </div>
          <Link to={`/cars/${car._id ?? car.id}`} className="car-card-btn">
            Rent Now
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
