import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEvents = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch events.');
        return response.json();
      })
      .then((json) => {
        setData(json.slice(0, 10));
        setLoading(false);

        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p className="events-state">Loading events...</p>;
  if (error) return <p className="events-state events-state--error">Error: {error}</p>;

  const filteredEvents = data.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="events-page">
      <div className="events-toolbar">
        <div>
          <h2 className="events-toolbar__title">Campus events</h2>
          <p className="events-toolbar__meta">
            {filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'} available
            {lastUpdated ? ` • Updated at ${lastUpdated}` : ''}
          </p>
        </div>

        <label className="events-search" htmlFor="event-search">
          <span>Search events</span>
          <input
            id="event-search"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <article key={event.id} className="event-card event-card--enhanced">
            <span className="event-card__label">Event {event.id}</span>
            <h3 className="event-card__title">{event.title}</h3>
            <p className="event-card__description">{event.body}</p>
            <Link to={`/events/${event.id}`} className="event-card__link">
              View details
            </Link>
          </article>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="events-state">No events matched your search.</p>
      ) : null}
    </section>
  );
};

export default Events;