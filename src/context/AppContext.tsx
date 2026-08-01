import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { ReasonEvent, Profile, Status, ChatMessage, Theme, Friend, AppNotification, EventCategory } from '../types';
import { seedEvents, seedFriends, seedNotifications } from '../data/seedData';
import { load, save } from '../services/storage';
import { useFriendsManager } from '../hooks/useFriends';

type NewEventInput = Pick<ReasonEvent, 'title' | 'category' | 'date' | 'time' | 'place'> & {
  location?: { lat: number; lng: number; label: string };
};

type AppContextType = {
  // Profile & onboarding
  profile: Profile;
  onboarded: boolean;
  completeOnboarding: (p: Profile) => void;
  updateProfile: (p: Partial<Profile>) => void;

  // Theme
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  // Events
  events: ReasonEvent[];
  createEvent: (e: NewEventInput) => string;
  setStatus: (id: string, status: Status) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => ReasonEvent | undefined;

  // Chat
  sendMessage: (eventId: string, msg: Omit<ChatMessage, 'id' | 'createdAt'>) => void;
  markEventRead: (eventId: string) => void;

  // Friends
  friends: Friend[];
  addFriend: (f: Omit<Friend, 'id' | 'joinedAt'>) => boolean;
  removeFriend: (id: string) => void;
  getInviteLink: () => string;
  maxMembers: number;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Profile & onboarding
  const [profile, setProfile] = useState<Profile>(() =>
    load('profile', {
      id: 'me',
      name: 'Alex',
      nickname: '',
      birthday: '14 March',
      avatar: 'happy',
      joinedAt: Date.now(),
    })
  );
  const [onboarded, setOnboarded] = useState(() => load('onboarded', false));

  // Theme
  const [theme, setThemeState] = useState<Theme>(() => load('theme', 'light'));

  // Events
  const [events, setEvents] = useState<ReasonEvent[]>(() => load('events', seedEvents));

  // Friends
  const [friends, setFriends] = useState<Friend[]>(() => load('friends', seedFriends));

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    load('notifications', seedNotifications)
  );

  // Persist state
  useEffect(() => { save('profile', profile); }, [profile]);
  useEffect(() => { save('onboarded', onboarded); }, [onboarded]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save('theme', theme);
  }, [theme]);
  useEffect(() => { save('events', events); }, [events]);
  useEffect(() => { save('friends', friends); }, [friends]);
  useEffect(() => { save('notifications', notifications); }, [notifications]);

  // Profile
  const completeOnboarding = useCallback((p: Profile) => {
    setProfile({ ...p, id: 'me', joinedAt: Date.now() });
    setOnboarded(true);
    save('onboarded', true);
  }, []);

  const updateProfile = useCallback((p: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...p }));
  }, []);

  // Theme
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'light' ? 'dark' : 'light')), []);

  // Events
  const createEvent = useCallback((e: NewEventInput): string => {
    const id = crypto.randomUUID();
    const now = Date.now();
    const newEvent: ReasonEvent = {
      ...e,
      id,
      creatorId: 'me',
      going: 1,
      maybe: 0,
      cant: 0,
      status: 'yes',
      unread: 0,
      participants: [
        { id: 'me', name: profile.name, avatar: profile.avatar, status: 'yes' },
      ],
      messages: [],
      lastMessageAt: now,
      createdAt: now,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return id;
  }, [profile]);

  const setStatus = useCallback((id: string, status: Status) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const prevStatus = e.status;
        let { going, maybe, cant } = e;

        // Remove previous status count
        if (prevStatus === 'yes') going = Math.max(0, going - 1);
        if (prevStatus === 'maybe') maybe = Math.max(0, maybe - 1);
        if (prevStatus === 'no') cant = Math.max(0, cant - 1);

        // Add new status count
        if (status === 'yes') going += 1;
        if (status === 'maybe') maybe += 1;
        if (status === 'no') cant += 1;

        // Update participants
        const participants = e.participants.filter((p) => p.id !== 'me');
        if (status !== null) {
          participants.push({ id: 'me', name: profile.name, avatar: profile.avatar, status });
        }

        return { ...e, status, going, maybe, cant, participants };
      })
    );
  }, [profile]);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEvent = useCallback((id: string) => events.find((e) => e.id === id), [events]);

  // Chat
  const sendMessage = useCallback((eventId: string, msg: Omit<ChatMessage, 'id' | 'createdAt'>) => {
    const now = Date.now();
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        const message: ChatMessage = { ...msg, id: crypto.randomUUID(), createdAt: now };
        return {
          ...e,
          messages: [...e.messages, message],
          lastMessageAt: now,
        };
      })
    );
  }, []);

  const markEventRead = useCallback((eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, unread: 0 } : e))
    );
  }, []);

  // Friends
  const friendsManager = useFriendsManager(friends, setFriends);

  // Notifications
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const pushNotification = useCallback((n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => {
    const notif: AppNotification = {
      ...n,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const value = useMemo<AppContextType>(
    () => ({
      profile,
      onboarded,
      completeOnboarding,
      updateProfile,
      theme,
      setTheme,
      toggleTheme,
      events,
      createEvent,
      setStatus,
      deleteEvent,
      getEvent,
      sendMessage,
      markEventRead,
      friends,
      addFriend: friendsManager.addFriend,
      removeFriend: friendsManager.removeFriend,
      getInviteLink: friendsManager.getInviteLink,
      maxMembers: friendsManager.MAX_MEMBERS,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      pushNotification,
    }),
    [profile, onboarded, completeOnboarding, updateProfile, theme, setTheme, toggleTheme, events, createEvent, setStatus, deleteEvent, getEvent, sendMessage, markEventRead, friends, friendsManager, notifications, markNotificationRead, markAllNotificationsRead, pushNotification]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
