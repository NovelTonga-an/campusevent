import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="home-page__intro">
        <div>
          <span className="home-page__eyebrow">ISPSC Tagudin Campus</span>
          <h2 className="home-page__title">Come and discover the important events being held in the school</h2>
        </div>

        <div className="home-page__actions">
          <Link to="/events" className="home-page__primary-action">
            View Events
          </Link>
          <Link to="/login" className="home-page__secondary-action">
            Login to Dashboard
          </Link>
        </div>
      </section>

      <section className="home-page__grid">
        <article className="home-page__card">
          <h3>Foundation Anniversary</h3>
          <p>A day dedicated to honoring the history and growth of our school.</p>
        </article>

        <article className="home-page__card">
          <h3>School Intramurals</h3>
          <p>A week-long sports festival where students are divided into teams to compete in various games like basketball, volleyball, and track and field.</p>
        </article>

        <article className="home-page__card">
          <h3>Grand Alumni Homecoming</h3>
          <p>A special gathering for former students to reconnect with old friends and teachers.</p>
        </article>
      </section>
    </div>
  );
};

export default Home;