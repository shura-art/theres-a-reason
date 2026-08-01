import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/EmptyState';
import { useNavigate } from 'react-router-dom';
import { formatNotificationTime } from '../services/notifications';

export function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const nav = useNavigate();

  const sorted = [...notifications].sort((a, b) => b.createdAt - a.createdAt);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="page">
      <header className="simple-head">
        <span>KEEPING UP</span>
        <h1>Notifications</h1>
        {unreadCount > 0 && (
          <button
            className="primary"
            style={{ marginTop: 12, padding: '10px 16px', fontSize: '.85rem' }}
            onClick={markAllNotificationsRead}
          >
            Mark all as read
          </button>
        )}
      </header>

      {sorted.length === 0 ? (
        <EmptyState icon="🔔" title="No notifications" subtitle="You're all caught up!" />
      ) : (
        <div className="list">
          {sorted.map((n) => (
            <button
              className={`notice ${n.read ? '' : 'unread'}`}
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.eventId) nav('/chat/' + n.eventId);
              }}
              aria-label={n.title}
            >
              {n.icon}
              <p>
                <b>{n.title}</b>
                {n.body}
                <small>{formatNotificationTime(n.createdAt)}</small>
              </p>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
