import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function Layout() {
  const { theme, toggleTheme, notifications, events } = useApp();
  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const unreadChats = events.reduce((sum, e) => sum + e.unread, 0);

  return (
    <div className="phone">
      <div className="app-shell">
        <Outlet />
        <nav className="tabbar" aria-label="Main navigation">
          <NavLink to="/events" aria-label="Events">
            🎉<span>Events</span>
          </NavLink>
          <NavLink to="/map" aria-label="Map">
            🗺️<span>Map</span>
          </NavLink>
          <NavLink to="/chats" aria-label="Chats">
            💬<span>Chats</span>
            {unreadChats > 0 && <span className="badge">{unreadChats}</span>}
          </NavLink>
          <NavLink to="/notifications" aria-label="Notifications">
            🔔<span>Alerts</span>
            {unreadNotifs > 0 && <span className="badge">{unreadNotifs}</span>}
          </NavLink>
          <NavLink to="/profile" aria-label="Profile">
            👤<span>You</span>
          </NavLink>
        </nav>
        <button
          className="theme-toggle"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}
