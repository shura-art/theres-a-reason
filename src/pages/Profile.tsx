import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import { Toast, useToast } from '../components/Toast';
import { requestNotificationPermission } from '../services/notifications';
import { Droplet } from '../components/Droplet';

export function Profile() {
  const { profile, theme, toggleTheme, updateProfile, events, friends, getInviteLink, maxMembers } = useApp();
  const nav = useNavigate();
  const { message, show } = useToast();
  const [showAbout, setShowAbout] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(
    'Notification' in window && Notification.permission === 'granted'
  );
  const [inviteLink, setInviteLink] = useState('');

  const eventsCreated = events.filter((e) => e.creatorId === 'me').length;
  const eventsAttended = events.filter((e) => e.status === 'yes').length;
  const showRate = events.length > 0
    ? Math.round((eventsAttended / events.length) * 100)
    : 0;
  const spotsLeft = maxMembers - friends.length - 1;

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotifEnabled(granted);
    show(granted ? 'Notifications enabled!' : 'Notifications blocked');
  };

  const handleInvite = () => {
    const link = getInviteLink();
    setInviteLink(link);
    setShowInvite(true);
  };

  const copyInvite = () => {
    navigator.clipboard?.writeText(inviteLink);
    show('Link copied!');
  };

  const avatarMoods: Array<'happy' | 'party' | 'wow' | 'cool' | 'sad'> = ['happy', 'party', 'wow', 'cool', 'sad'];

  return (
    <main className="page">
      <Toast message={message} />
      <header className="profile-head">
        <div className="avatar-big">
          <Droplet mood={profile.avatar as 'happy'} size={70} color="var(--surface)" />
        </div>
        <h1>{profile.name}</h1>
        <p>
          @{profile.nickname || profile.name.toLowerCase()} · {profile.birthday} · here since{' '}
          {new Date(profile.joinedAt).toLocaleDateString('en-GB', {
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </header>

      <div className="stats">
        <div>
          <b>{eventsCreated}</b>
          <small>Created</small>
        </div>
        <div>
          <b>{eventsAttended}</b>
          <small>Turned up</small>
        </div>
        <div>
          <b>{showRate}%</b>
          <small>Show rate</small>
        </div>
      </div>

      <div className="list settings">
        <button onClick={() => setShowAvatar(true)}>
          🎭 <span>Avatar</span>
          <small>Tap to change</small>
        </button>
        <button onClick={() => setShowFriends(true)}>
          👥 <span>Friends</span>
          <small>{friends.length + 1} in group</small>
        </button>
        <button onClick={handleInvite}>
          🔗 <span>Invite a friend</span>
          <small>{spotsLeft} spots left</small>
        </button>
        <button onClick={handleEnableNotifications}>
          🔔 <span>Notifications</span>
          <small>{notifEnabled ? 'Enabled' : 'Tap to enable'}</small>
        </button>
        <button>
          🎂 <span>Birthday</span>
          <small>{profile.birthday}</small>
        </button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'} <span>Appearance</span>
          <small>{theme}</small>
        </button>
        <button onClick={() => setShowSettings(true)}>
          ⚙️ <span>Settings</span>
          <i>›</i>
        </button>
        <button onClick={() => setShowAbout(true)}>
          💙 <span>About</span>
          <i>›</i>
        </button>
      </div>

      {/* About modal */}
      <Modal open={showAbout} title="About" onClose={() => setShowAbout(false)}>
        <p>
          <b>Есть повод — There's a Reason</b>
        </p>
        <p>
          A tiny private app for a closed group of friends. Create reasons to meet,
          chat about them, and never lose track of the people who matter.
        </p>
        <p style={{ fontSize: '.8rem', marginTop: '10px' }}>
          Version 1.0.0 · Made with 💙 for friends.
        </p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowAbout(false)}>
            Close
          </button>
        </div>
      </Modal>

      {/* Invite modal */}
      <Modal open={showInvite} title="Invite a friend" onClose={() => setShowInvite(false)}>
        <p>
          Share this link with a friend. They'll join your private group.
        </p>
        <p style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '.85rem', wordBreak: 'break-all' }}>
          {inviteLink}
        </p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={copyInvite}>
            Copy link
          </button>
          <button className="btn-secondary" onClick={() => setShowInvite(false)}>
            Done
          </button>
        </div>
      </Modal>

      {/* Friends modal */}
      <Modal open={showFriends} title={`Friends (${friends.length + 1})`} onClose={() => setShowFriends(false)}>
        <div className="list">
          <div className="list-row">
            <Avatar avatar={profile.avatar} size={44} />
            <div>
              <b>{profile.name} (You)</b>
              <small>Birthday: {profile.birthday}</small>
            </div>
          </div>
          {friends.map((f) => (
            <div className="list-row" key={f.id}>
              <Avatar avatar={f.avatar} size={44} />
              <div>
                <b>{f.name}</b>
                <small>Birthday: {f.birthday}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowFriends(false)}>
            Close
          </button>
        </div>
      </Modal>

      {/* Settings modal */}
      <Modal open={showSettings} title="Settings" onClose={() => setShowSettings(false)}>
        <p>Manage your profile and preferences.</p>
        <div className="list settings" style={{ marginBottom: 12 }}>
          <button
            onClick={() => {
              setShowSettings(false);
              nav('/');
            }}
          >
            🔄 <span>Reset onboarding</span>
          </button>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowSettings(false)}>
            Close
          </button>
        </div>
      </Modal>

      {/* Avatar picker modal */}
      <Modal open={showAvatar} title="Pick your avatar" onClose={() => setShowAvatar(false)}>
        <div className="avatar-picks" style={{ justifyContent: 'center', marginTop: 12 }}>
          {avatarMoods.map((mood) => (
            <button
              key={mood}
              className={profile.avatar === mood ? 'picked' : ''}
              onClick={() => {
                updateProfile({ avatar: mood });
                show('Avatar updated!');
              }}
              aria-label={`Select ${mood} avatar`}
              aria-pressed={profile.avatar === mood}
            >
              <Droplet mood={mood} size={58} color="var(--blue)" />
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowAvatar(false)}>
            Done
          </button>
        </div>
      </Modal>
    </main>
  );
}
