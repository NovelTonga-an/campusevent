import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Event not found');
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="events-state">Loading event details...</p>;
  if (error) return <p className="events-state events-state--error">Error: {error}</p>;

  return (
    <article className="event-details">
      <button type="button" className="event-details__back" onClick={() => navigate('/events')}>
        Back to events
      </button>

      <div className="event-details__header">
        <span className="event-details__eyebrow">Event {event.id}</span>
        <h2 className="event-details__title">{event.title}</h2>
      </div>

      <div className="event-details__body">
        <section className="event-details__section">
          <h3>About this event</h3>
          <p>{event.body}</p>
        </section>
      </div>
    </article>
  );
};

export default EventDetails;