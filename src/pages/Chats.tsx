import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { categoryMeta } from '../data/events';
import { EmptyState } from '../components/EmptyState';

export function Chats() {
  const { events } = useApp();
  const nav = useNavigate();
  const chatsWithMessages = events.filter((e) => e.messages.length > 0);
  const allChats = events;

  return (
    <main className="page">
      <header className="simple-head">
        <span>DISCUSSIONS</span>
        <h1>Chats</h1>
        <p>Each one dies seven days after the last message. No archive, no guilt.</p>
      </header>

      {allChats.length === 0 ? (
        <EmptyState icon="💬" title="No chats yet" subtitle="Create a reason to start a discussion" />
      ) : (
        <>
          {chatsWithMessages.length > 0 && (
            <section className="section-head">
              <span>ACTIVE</span>
              <b>{chatsWithMessages.length} chats</b>
            </section>
          )}
          <div className="list">
            {allChats.map((e) => (
              <button
                className="list-row"
                key={e.id}
                onClick={() => nav('/chat/' + e.id)}
                aria-label={`Open chat for ${e.title}`}
              >
                <span>{categoryMeta[e.category].emoji}</span>
                <div>
                  <b>{e.title}</b>
                  <small>
                    {e.going} going
                    {e.unread > 0 ? ` · ${e.unread} new` : ''}
                    {e.messages.length > 0
                      ? ` · ${e.messages.length} msgs`
                      : ''}
                  </small>
                </div>
                <i>›</i>
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
