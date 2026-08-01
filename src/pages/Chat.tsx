import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { categoryMeta } from '../data/events';
import { useChatExpiry } from '../hooks/useChatExpiry';
import { StickerPicker } from '../components/StickerPicker';
import { Avatar } from '../components/Avatar';
import type { Status, Sticker as StickerType } from '../types';

export function Chat() {
  const { id } = useParams();
  const { events, sendMessage, markEventRead, setStatus, profile } = useApp();
  const e = events.find((x) => x.id === id);

  const nav = useNavigate();
  const [text, setText] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formatRemaining } = useChatExpiry(e?.lastMessageAt ?? Date.now());

  useEffect(() => {
    if (id) markEventRead(id);
  }, [id, markEventRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [e?.messages.length]);

  if (!e) {
    return (
      <main className="page">
        <header className="page-top">
          <button onClick={() => nav(-1)} aria-label="Go back">‹</button>
          <h1>Chat not found</h1>
        </header>
        <p>This chat may have expired.</p>
        <button className="primary" onClick={() => nav('/chats')}>
          Back to chats
        </button>
      </main>
    );
  }

  const m = categoryMeta[e.category];

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(e.id, {
      authorId: 'me',
      authorName: profile.name,
      authorAvatar: profile.avatar,
      text: text.trim(),
      type: 'text',
    });
    setText('');
  };

  const handleSticker = (sticker: StickerType) => {
    sendMessage(e.id, {
      authorId: 'me',
      authorName: profile.name,
      authorAvatar: profile.avatar,
      text: sticker.emoji,
      type: 'sticker',
      stickerId: sticker.id,
    });
  };

  const handleImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      sendMessage(e.id, {
        authorId: 'me',
        authorName: profile.name,
        authorAvatar: profile.avatar,
        text: '',
        type: 'image',
        imageData: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const rsvpButtons: ReadonlyArray<readonly ['yes' | 'maybe' | 'no', string]> = [
    ['yes', "✓ I'm going"],
    ['maybe', '? Maybe'],
    ['no', "× Can't"],
  ] as const;

  return (
    <main className="chat-page">
      <header className="chat-head">
        <button onClick={() => nav(-1)} aria-label="Go back">‹</button>
        <span>{m.emoji}</span>
        <div>
          <b>{e.title}</b>
          <small>
            {e.date} {e.time} · {e.going} going · {e.maybe} maybe
          </small>
        </div>
        <button
          onClick={() => setShowParticipants(true)}
          aria-label="Show participants"
          style={{ fontSize: '1.3rem' }}
        >
          👥
        </button>
      </header>

      <div className="expiry">
        ⌛ This chat clears itself in {formatRemaining()}
      </div>

      <div className="messages">
        {e.messages.length === 0 && (
          <p className="msg-system">No messages yet. Start the conversation!</p>
        )}
        <AnimatePresence>
          {e.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={
                msg.type === 'system'
                  ? 'msg-system'
                  : `msg-bubble ${msg.authorId === 'me' ? 'mine' : ''}`
              }
            >
              {msg.type === 'sticker' && (
                <div className="msg-sticker">{msg.text}</div>
              )}
              {msg.type === 'image' && msg.imageData && (
                <div className="msg-image">
                  <img src={msg.imageData} alt="Shared" />
                </div>
              )}
              {msg.type === 'text' && <p>{msg.text}</p>}
              {msg.type !== 'system' && (
                <>
                  {msg.authorId !== 'me' && (
                    <div className="msg-author">{msg.authorName}</div>
                  )}
                  <div className="msg-time">
                    {new Date(msg.createdAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {showStickers && (
        <StickerPicker
          onSelect={handleSticker}
          onClose={() => setShowStickers(false)}
        />
      )}

      <div className="composer">
        <div className="chat-rsvp">
          {rsvpButtons.map(([v, label]) => (
            <button
              key={v}
              className={e.status === v ? `active ${v}` : ''}
              onClick={() => setStatus(e.id, v as Status)}
              aria-pressed={e.status === v}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="image-input"
          accept="image/*"
          onChange={handleImage}
          aria-label="Send image"
        />
        <div className="send-row">
          <button
            className="sticker-btn"
            onClick={() => setShowStickers((s) => !s)}
            aria-label="Stickers"
          >
            😊
          </button>
          <button
            className="sticker-btn"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Send image"
          >
            📷
          </button>
          <input
            value={text}
            onChange={(e2) => setText(e2.target.value)}
            onKeyDown={(e2) => {
              if (e2.key === 'Enter') handleSend();
            }}
            placeholder="Say something"
            aria-label="Type a message"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
      </div>

      {showParticipants && (
        <div className="modal-overlay" onClick={() => setShowParticipants(false)}>
          <div className="modal" onClick={(e3) => e3.stopPropagation()}>
            <h2>Participants ({e.participants.length})</h2>
            <div className="list">
              {e.participants.map((p) => (
                <div className="participant-row" key={p.id}>
                  <Avatar avatar={p.avatar} size={36} />
                  <div>
                    <b>{p.name}</b>
                    {p.id === 'me' && <small>You</small>}
                  </div>
                  <span className={`status-badge ${p.status}`}>
                    {p.status === 'yes' ? 'Going' : p.status === 'maybe' ? 'Maybe' : "Can't"}
                  </span>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowParticipants(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
