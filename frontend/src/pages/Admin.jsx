import useAuth from '../hooks/useAuth';
import Icon from '../components/Icon';
import { useCars } from '../api/cars';
import { useAllBookings } from '../api/bookings';
import './Admin.css';

export default function Admin() {
  const { user } = useAuth();

  const bookings = useAllBookings();
  const carList = useCars();

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.paymentStatus === 'paid' ? b.total : 0),
    0,
  );

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-header">
          <Icon name="shield" size={28} />
          <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user?.name}</p>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <Icon name="car" size={24} />
            <div>
              <span className="admin-stat-value">{carList.length}</span>
              <span className="admin-stat-label">Total Vehicles</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <Icon name="calendar" size={24} />
            <div>
              <span className="admin-stat-value">{totalBookings}</span>
              <span className="admin-stat-label">Total Bookings</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <Icon name="star" size={24} />
            <div>
              <span className="admin-stat-value">
                ${totalRevenue.toLocaleString()}
              </span>
              <span className="admin-stat-label">Total Revenue</span>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h3>Fleet Management</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Daily Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carList.map((car) => (
                  <tr key={car._id}>
                    <td className="admin-vehicle-cell">
                      <img src={car.image} alt="" width="40" height="30" />
                      <span>
                        {car.make} {car.model}
                      </span>
                    </td>
                    <td>{car.category}</td>
                    <td>{car.year}</td>
                    <td>${car.dailyRate.toLocaleString()}</td>
                    <td>
                      <span
                        className={`admin-status ${car.available ? 'available' : 'rented'}`}
                      >
                        {car.available ? 'Available' : 'Rented'}
                      </span>
                    </td>
                    <td>
                      <button className="admin-action-btn" title="Edit">
                        <Icon name="filter" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section">
          <h3>All Bookings</h3>
          {bookings.length === 0 ? (
            <div className="admin-empty">
              <p>
                No bookings yet. Bookings will appear here once users start
                renting vehicles.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Dates</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Booked On</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong>{b.userName}</strong>
                        <br />
                        <small style={{ color: 'var(--text-tertiary)' }}>
                          {b.userEmail}
                        </small>
                      </td>
                      <td>
                        {b.carMake} {b.carModel}
                      </td>
                      <td>
                        {b.startDate} → {b.endDate}
                      </td>
                      <td>${b.total.toLocaleString()}</td>
                      <td>
                        <span
                          className={`admin-status ${b.paymentStatus === 'paid' ? 'available' : 'rented'}`}
                        >
                          {b.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-tertiary)',
                        }}
                      >
                        {new Date(b.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
