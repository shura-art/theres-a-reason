import { motion } from 'framer-motion';
import type { ReasonEvent, Status } from '../types';
import { categoryMeta } from '../data/events';

export function EventCard({
  event,
  onStatus,
  onOpen,
}: {
  event: ReasonEvent;
  onStatus: (s: Status) => void;
  onOpen: () => void;
}) {
  const m = categoryMeta[event.category];
  const rsvpButtons: ReadonlyArray<readonly ['yes' | 'maybe' | 'no', string, string]> = [
    ['yes', '✓', "I'm going"],
    ['maybe', '?', 'Maybe'],
    ['no', '×', "Can't come"],
  ] as const;

  return (
    <motion.article
      className="event-card"
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button className="event-top" onClick={onOpen} aria-label={`Open ${event.title}`}>
        <span className="event-emoji">{m.emoji}</span>
        <span className="event-title">
          <b>{event.title}</b>
          <small>
            {event.date} · {event.time}
          </small>
        </span>
        {event.unread > 0 && <em>{event.unread} new</em>}
      </button>
      <div className="event-meta">
        📍 <span>{event.place}</span>
        <span className="people">
          👩🏻 👨🏼 👩🏽 <b>+{event.going}</b>
        </span>
      </div>
      <div className="rsvp">
        {rsvpButtons.map(([v, i, l]) => (
          <button
            key={v}
            className={event.status === v ? `selected ${v}` : ''}
            onClick={() => onStatus(v)}
            aria-label={l}
            aria-pressed={event.status === v}
          >
            <strong>{i}</strong>
            {l}
          </button>
        ))}
      </div>
    </motion.article>
  );
}
