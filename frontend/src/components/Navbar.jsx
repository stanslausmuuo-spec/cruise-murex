import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import Icon from './Icon';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const themeToggle = (extraClass = '') => (
    <button
      className={`navbar-theme-toggle ${extraClass}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
    </button>
  );

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Icon name="car" size={28} />
          <span className="navbar-logo-text">Cruise</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>

        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/fleet" className="navbar-link">Fleet</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              {isAdmin && <Link to="/admin" className="navbar-link">Admin</Link>}
              <button className="navbar-link navbar-link-btn" onClick={logout}>
                <Icon name="logout" size={16} />
                Logout
              </button>
              <span className="navbar-user">
                <Icon name="user" size={16} />
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link navbar-cta">Sign Up</Link>
            </>
          )}

          {themeToggle()}
        </div>

        {themeToggle('desktop-only')}
      </div>

      {menuOpen && <div className="navbar-overlay" onClick={closeMenu} />}
    </nav>
  );
}
