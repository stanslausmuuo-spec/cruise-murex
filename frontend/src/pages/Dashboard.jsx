import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Icon from '../components/Icon';
import PaymentModal from '../components/PaymentModal';
import { useUserBookings, useProcessPayment } from '../api/bookings';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const bookings = useUserBookings(user?.id);
  const processPayment = useProcessPayment();

  const [paymentBooking, setPaymentBooking] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePayLater = (booking) => {
    setPaymentBooking(booking);
  };

  const handlePaymentComplete = async () => {
    try {
      await processPayment(paymentBooking._id);
    } catch {
      // fallback handled by api/bookings
    }
    setPaymentBooking(null);
  };

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-avatar">
            <Icon name="user" size={32} />
          </div>
          <div>
            <h2>Welcome, {user?.name}</h2>
            <p className="dashboard-email">{user?.email}</p>
          </div>
          <button className="dashboard-logout" onClick={handleLogout}>
            <Icon name="logout" size={16} />
            Sign Out
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <Icon name="calendar" size={24} />
            <h3>My Bookings</h3>
            {bookings.length === 0 ? (
              <>
                <p>You have no active bookings. Start by browsing our fleet.</p>
                <button className="btn-primary" onClick={() => navigate('/fleet')}>
                  Browse Fleet
                  <Icon name="arrow-right" size={16} />
                </button>
              </>
            ) : (
              <div className="dashboard-booking-list">
                {bookings.map(b => (
                  <div key={b._id ?? b.id} className="dashboard-booking-item">
                    <div className="dashboard-booking-top">
                      <img src={b.carImage} alt="" className="dashboard-booking-img" />
                      <div className="dashboard-booking-info">
                        <strong>{b.carMake} {b.carModel}</strong>
                        <span>{b.startDate} → {b.endDate}</span>
                        <span className="dashboard-booking-total">${b.total.toLocaleString()}</span>
                      </div>
                      <span className={`dashboard-booking-badge ${b.paymentStatus}`}>
                        {b.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    {b.paymentStatus === 'pending' && (
                      <button className="dashboard-pay-btn" onClick={() => handlePayLater(b)}>
                        <Icon name="star" size={14} />
                        Pay Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <Icon name="user" size={24} />
            <h3>Profile</h3>
            <div className="dashboard-info">
              <span><strong>Name:</strong> {user?.name}</span>
              <span><strong>Email:</strong> {user?.email}</span>
              <span><strong>Role:</strong> {user?.role}</span>
            </div>
          </div>

          <div className="dashboard-card">
            <Icon name="shield" size={24} />
            <h3>Membership</h3>
            <p>Premium member since {new Date().getFullYear()}. Enjoy priority booking and exclusive access.</p>
          </div>

          <div className="dashboard-card dashboard-card-wide">
            <Icon name="star" size={24} />
            <h3>Recent Activity</h3>
            {bookings.length === 0 ? (
              <div className="dashboard-empty-state">
                <p>No recent activity. Your booking history will appear here.</p>
              </div>
            ) : (
              <div className="dashboard-activity-list">
                {bookings.slice(0, 5).map(b => (
                  <div key={b._id ?? b.id} className="dashboard-activity-item">
                    <Icon name={b.paymentStatus === 'paid' ? 'check' : 'calendar'} size={16} />
                    <span>
                      {b.paymentStatus === 'paid' ? 'Paid for ' : 'Booked '}
                      {b.carMake} {b.carModel} &mdash; ${b.total.toLocaleString()}
                    </span>
                    <small>{new Date(b.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {paymentBooking && (
        <PaymentModal
          booking={paymentBooking}
          total={paymentBooking.total}
          carName={`${paymentBooking.carMake} ${paymentBooking.carModel}`}
          onPaymentComplete={handlePaymentComplete}
          onClose={() => setPaymentBooking(null)}
        />
      )}
    </main>
  );
}
