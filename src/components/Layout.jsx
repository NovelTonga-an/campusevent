import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const { pathname } = useLocation();

  const layoutContent = {
    '/': {
      eyebrow: 'Campus Events',
      title: 'Welcome to the ISPSC Tagudin Campus.',
      description: 'Explore upcoming activities, and stay updated with school events.',
    },
    '/events': {
      eyebrow: 'EventS',
      title: 'Upcoming programs and student activities.',
      description: 'Use the event board to scan what is happening now, what is next, and which details need your attention.',
    },
    '/dashboard': {
      eyebrow: 'Admin Dashboard',
      title: 'Manage event activity.',
      description: 'Review event status, adjust listings, and keep your campus programming organized without leaving the dashboard.',
    },
  };

  const currentContent = layoutContent[pathname];

  return (
    <div className="app-container">
      <Navbar />
      <main className="app-shell">
        {currentContent ? (
          <header className="app-shell__hero">
            <div className="app-shell__copy">
              <span className="app-shell__eyebrow">{currentContent.eyebrow}</span>
              <h1 className="app-shell__title">{currentContent.title}</h1>
              <p className="app-shell__description">{currentContent.description}</p>
            </div>
          </header>
        ) : null}

        <section className="app-shell__content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;