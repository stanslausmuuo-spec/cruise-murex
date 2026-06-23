import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <Icon name="car" size={48} />
        <h2>404 — Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <Icon name="arrow-left" size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
