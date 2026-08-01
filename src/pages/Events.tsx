import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/EventCard';
import { Droplet } from '../components/Droplet';
import { EmptyState } from '../components/EmptyState';

export function Events() {
  const { events, setStatus, profile } = useApp();
  const nav = useNavigate();

  const todayEvents = events.filter((e) => e.date === 'Today' || e.date === 'Tonight');
  const laterEvents = events.filter((e) => e.date !== 'Today' && e.date !== 'Tonight');

  return (
    <main className="page">
      <header className="blue-head">
        <div>
          <b>Привет, {profile.name}</b>
          <small>
            {events.length} reasons this week.{' '}
            {events.filter((e) => e.status === null).length} need an answer.
          </small>
        </div>
        <Droplet size={48} color="oklch(90% .03 255)" />
      </header>

      <section className="section-head">
        <span>HAPPENING TODAY</span>
        <b>{todayEvents.length} on</b>
      </section>

      {todayEvents.length === 0 ? (
        <EmptyState icon="☀️" title="Nothing today. Create a reason?" />
      ) : (
        todayEvents.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            onStatus={(s) => setStatus(e.id, s)}
            onOpen={() => nav('/chat/' + e.id)}
          />
        ))
      )}

      <section className="section-head">
        <span>LATER THIS WEEK</span>
      </section>

      {laterEvents.length === 0 ? (
        <EmptyState icon="📅" title="No upcoming reasons yet" />
      ) : (
        laterEvents.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            onStatus={(s) => setStatus(e.id, s)}
            onOpen={() => nav('/chat/' + e.id)}
          />
        ))
      )}

      <button className="fab" onClick={() => nav('/create')} aria-label="Create reason">
        ＋ Create reason
      </button>
    </main>
  );
}
