import { useState } from 'react';
import { useEvents } from '../context/eventcontext';

const Dashboard = () => {
  const { events, loading, error, addEvent, deleteEvent, toggleStatus } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending');

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setStatus('Pending');
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    await addEvent({ title: title.trim(), status });
    closeModal();
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-toolbar">
        <div>
          <h2 className="dashboard-toolbar__title">Admin dashboard</h2>
          <p className="dashboard-toolbar__meta">
            {loading ? 'Loading…' : `${events.length} total event${events.length === 1 ? '' : 's'}`}
          </p>
          {error ? <p className="events-state">{error}</p> : null}
        </div>
        <button type="button" className="dashboard-toolbar__add" onClick={openModal}>
          Add new event
        </button>
      </div>

      <div className="dashboard-grid">
        {events.map((event) => (
          <article key={event.firestoreId} className="dashboard-card">
            <div className="dashboard-card__top">
              <span className="dashboard-card__id">{event.title.slice(0, 2).toUpperCase()}</span>
              <span
                className={`dashboard-card__status${
                  event.status === 'Completed' ? ' dashboard-card__status--complete' : ''
                }`}
              >
                {event.status}
              </span>
            </div>

            <h3 className="dashboard-card__title">{event.title}</h3>

            <div className="dashboard-card__actions">
              <button
                type="button"
                className="dashboard-card__btn"
                onClick={() => toggleStatus(event.firestoreId, event.status)}
              >
                Toggle status
              </button>
              <button
                type="button"
                className="dashboard-card__btn dashboard-card__btn--danger"
                onClick={() => deleteEvent(event.firestoreId)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="events-state">No events yet. Add one to get started.</p>
      ) : null}

      {isModalOpen ? (
        <div className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="new-event-title">
          <div className="dashboard-modal__backdrop" onClick={closeModal} />
          <form className="dashboard-modal__panel" onSubmit={handleAddEvent}>
            <h3 id="new-event-title" className="dashboard-modal__title">Add new event</h3>

            <label className="dashboard-modal__field" htmlFor="event-title">
              <span>Event title</span>
              <input
                id="event-title"
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </label>

            <label className="dashboard-modal__field" htmlFor="event-status">
              <span>Status</span>
              <select
                id="event-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <div className="dashboard-modal__actions">
              <button type="button" className="dashboard-modal__btn dashboard-modal__btn--ghost" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="dashboard-modal__btn">
                Save event
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
};

export default Dashboard;