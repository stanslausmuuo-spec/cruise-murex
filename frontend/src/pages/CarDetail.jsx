import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../components/Icon';
import PaymentModal from '../components/PaymentModal';
import useAuth from '../hooks/useAuth';
import { useCar } from '../api/cars';
import { useCreateBooking, useProcessPayment } from '../api/bookings';
import './CarDetail.css';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const car = useCar(id);
  const createBooking = useCreateBooking();
  const processPayment = useProcessPayment();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState(null);
  const [paid, setPaid] = useState(false);

  if (!car) {
    return (
      <div className="container section" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <Icon name="car" size={64} />
        <h2>Vehicle not found</h2>
        <Link to="/fleet" className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Fleet
        </Link>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (days < 1) return;

    const bookingPayload = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      carId: car._id ?? String(car.id),
      carMake: car.make,
      carModel: car.model,
      carImage: car.image,
      startDate,
      endDate,
      days,
      total,
      dailyRate: car.dailyRate,
    };

    try {
      const booking = await createBooking(bookingPayload);
      setPaymentBooking(booking);
    } catch {
      // fallback handled by api/bookings
    }
  };

  const handlePaymentComplete = async () => {
    try {
      await processPayment(paymentBooking._id);
    } catch {
      // fallback handled by api/bookings
    }
    setPaid(true);
    setPaymentBooking(null);
    setBookingSuccess(true);
  };

  const handleClosePayment = () => {
    setPaid(false);
    setPaymentBooking(null);
    setBookingSuccess(true);
  };

  const days = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) : 0;
  const total = days * car.dailyRate;

  return (
    <main className="detail-page">
      <div className="container">
        <Link to="/fleet" className="detail-back">
          <Icon name="arrow-left" size={18} />
          Back to Fleet
        </Link>

        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-image">
              <img src={car.image} alt={`${car.make} ${car.model}`} />
            </div>
            <span className="car-card-category" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
              {car.category}
            </span>
            <div className="detail-specs-grid">
              <div className="detail-spec-item">
                <Icon name="speed" size={20} />
                <span className="detail-spec-label">Top Speed</span>
                <span className="detail-spec-value">{car.speed}</span>
              </div>
              <div className="detail-spec-item">
                <Icon name="fuel" size={20} />
                <span className="detail-spec-label">Fuel Type</span>
                <span className="detail-spec-value">{car.fuelType}</span>
              </div>
              <div className="detail-spec-item">
                <Icon name="seat" size={20} />
                <span className="detail-spec-label">Seats</span>
                <span className="detail-spec-value">{car.seats}</span>
              </div>
              <div className="detail-spec-item">
                <Icon name="calendar" size={20} />
                <span className="detail-spec-label">Year</span>
                <span className="detail-spec-value">{car.year}</span>
              </div>
            </div>
            <div className="detail-description">
              <h3>About this vehicle</h3>
              <p>{car.description}</p>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="detail-price-card">
              <div className="detail-price">
                <span className="detail-price-value">${car.dailyRate.toLocaleString()}</span>
                <span className="detail-price-label">/ day</span>
              </div>

              {bookingSuccess ? (
                <div className="booking-success">
                  <Icon name="check" size={32} />
                  <h3>Booking Confirmed!</h3>
                  <p>
                    Your reservation for the {car.make} {car.model} has been received.
                  </p>
                  {paid ? (
                    <p style={{ fontSize: '0.85rem', color: '#22C55E' }}>Payment completed successfully.</p>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Payment is pending. Complete payment from your dashboard.</p>
                  )}
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    {startDate} to {endDate} &mdash; ${total.toLocaleString()} total
                  </p>
                  <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>
                    View Dashboard
                  </button>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleBooking}>
                  <div className="booking-field">
                    <label htmlFor="start-date" className="field-label">Pick-up Date</label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      min={today}
                      required
                    />
                  </div>
                  <div className="booking-field">
                    <label htmlFor="end-date" className="field-label">Return Date</label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      min={startDate || today}
                      required
                    />
                  </div>

                  {days > 0 && (
                    <div className="booking-summary">
                      <div className="booking-summary-row">
                        <span>${car.dailyRate.toLocaleString()} x {days} day{days > 1 ? 's' : ''}</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                      <div className="booking-summary-row booking-total">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    {user ? 'Confirm Booking' : 'Sign In to Book'}
                    <Icon name="arrow-right" size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {paymentBooking && (
        <PaymentModal
          booking={paymentBooking}
          total={total}
          carName={`${car.make} ${car.model}`}
          onPaymentComplete={handlePaymentComplete}
          onClose={handleClosePayment}
        />
      )}
    </main>
  );
}
