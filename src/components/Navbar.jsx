import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current + 10) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current - 10) {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/events', label: 'Events' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Show navbar when at top or scrolling up, hide when scrolling down (mobile only)
  const isNavVisible = scrollDirection === 'up' || scrollY < 100;

  return (
    <header className={`site-header${isNavVisible ? '' : ' site-header--hidden'}`}>
      <nav className="campus-navbar" aria-label="Primary navigation">
        <Link to="/" className="campus-navbar__brand">
          <span className="campus-navbar__crest">CE</span>
          <span className="campus-navbar__brand-copy">
            <span className="campus-navbar__eyebrow">ISPSC Tagudin Campus</span>
          </span>
        </Link>

        <div className={`campus-navbar__menu${mobileMenuOpen ? ' campus-navbar__menu--open' : ''}`}>
          <div className="campus-navbar__links">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `campus-navbar__link${isActive ? ' campus-navbar__link--active' : ''}`
                }
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
              >
                Log In
              </NavLink>
            )}
          </div>
        </div>

        <button
          type="button"
          className={`campus-navbar__toggle${mobileMenuOpen ? ' campus-navbar__toggle--active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;