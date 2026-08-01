import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categoryMeta, categoryList } from '../data/events';
import type { EventCategory } from '../types';
import { getRandomReason, getHolidayCount } from '../services/randomReason';
import { Toast } from '../components/Toast';
import { useToast } from '../components/Toast';

export function Create() {
  const { createEvent, pushNotification } = useApp();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('random');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [place, setPlace] = useState('');
  const { message, show } = useToast();

  const random = () => {
    const r = getRandomReason();
    setTitle(r.name);
    setCategory(r.category);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    const dateStr = date
      ? new Date(date + 'T00:00').toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      : 'TBD';

    const id = createEvent({
      title: title.trim(),
      category,
      date: dateStr,
      time,
      place: place.trim() || 'No place yet',
    });

    pushNotification({
      type: 'new_event',
      title: 'New reason created!',
      body: `${title.trim()} — ${dateStr} at ${time}`,
      icon: categoryMeta[category].emoji,
      eventId: id,
    });

    nav('/events');
  };

  return (
    <main className="page create">
      <Toast message={message} />
      <header className="page-top">
        <button onClick={() => nav(-1)} aria-label="Go back">
          ‹
        </button>
        <h1>What's the reason?</h1>
      </header>

      <button
        className="random"
        onClick={() => {
          random();
          show('Rolled a random reason!');
        }}
        aria-label="Roll a random reason"
      >
        🎲{' '}
        <span>
          <b>Roll a random reason</b>
          <small>{getHolidayCount()} daft holidays, one tap</small>
        </span>
      </button>

      <label>
        TITLE
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pizza, obviously"
          autoFocus
          aria-label="Event title"
        />
      </label>

      <label>
        CATEGORY
        <div className="category-grid">
          {categoryList.map((k) => {
            const m = categoryMeta[k];
            return (
              <button
                className={category === k ? 'picked' : ''}
                key={k}
                onClick={() => setCategory(k)}
                aria-pressed={category === k}
                aria-label={m.label}
              >
                {m.emoji}
                <small>{m.label}</small>
              </button>
            );
          })}
        </div>
      </label>

      <div className="two-fields">
        <label>
          DATE
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Event date"
          />
        </label>
        <label>
          TIME
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="Event time"
          />
        </label>
      </div>

      <label>
        LOCATION (OPTIONAL)
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Bar Kruzhka, Zybitskaya 6"
          aria-label="Event location"
        />
      </label>

      <button
        className="primary"
        disabled={!title.trim()}
        onClick={handleSubmit}
      >
        Give everyone a reason
      </button>
    </main>
  );
}
