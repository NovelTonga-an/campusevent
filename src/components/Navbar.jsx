import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/events', label: 'Events' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <nav className="campus-navbar" aria-label="Primary navigation">
        <Link to="/" className="campus-navbar__brand">
          <span className="campus-navbar__crest">CE</span>
          <span className="campus-navbar__brand-copy">
            <span className="campus-navbar__eyebrow">ISPSC Tagudin Campus</span>
          </span>
        </Link>

        <div className="campus-navbar__links">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `campus-navbar__link${isActive ? ' campus-navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="campus-navbar__actions">
          {user ? (
            <>
              <span className="campus-navbar__status">{user.name}</span>
              <button
                type="button"
                className="campus-navbar__cta campus-navbar__logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `campus-navbar__cta${isActive ? ' campus-navbar__cta--active' : ''}`
              }
            >
              Log In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;