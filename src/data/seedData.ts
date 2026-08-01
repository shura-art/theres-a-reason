import type { ReasonEvent, Friend, AppNotification } from '../types';

const now = Date.now();

export const seedEvents: ReasonEvent[] = [
  {
    id: '1',
    category: 'birthday',
    title: 'Sasha turns 29',
    date: 'Today',
    time: '19:30',
    place: 'Bar Kruzhka, Zybitskaya 6',
    location: { lat: 53.9023, lng: 27.5619, label: 'Bar Kruzhka' },
    creatorId: 'f1',
    going: 6, maybe: 2, cant: 0, status: 'yes', unread: 3,
    participants: [
      { id: 'me', name: 'Alex', avatar: 'happy', status: 'yes' },
      { id: 'f1', name: 'Sasha', avatar: 'party', status: 'yes' },
      { id: 'f2', name: 'Katya', avatar: 'wow', status: 'yes' },
      { id: 'f3', name: 'Dima', avatar: 'happy', status: 'maybe' },
    ],
    messages: [
      { id: 'm1', authorId: 'f1', authorName: 'Sasha', authorAvatar: 'party', text: 'Everyone invited! Let\'s celebrate 🎉', type: 'text', createdAt: now - 3600000 * 5 },
      { id: 'm2', authorId: 'f2', authorName: 'Katya', authorAvatar: 'wow', text: 'I\'ll be there! Bringing cake', type: 'text', createdAt: now - 3600000 * 4 },
      { id: 'm3', authorId: 'f3', authorName: 'Dima', authorAvatar: 'happy', text: 'Might be late from work 😅', type: 'text', createdAt: now - 3600000 * 3 },
    ],
    lastMessageAt: now - 3600000 * 3,
    createdAt: now - 3600000 * 24,
  },
  {
    id: '2',
    category: 'random',
    title: 'World Pizza Day, obviously',
    date: 'Tonight',
    time: '21:00',
    place: 'Napoli, Karla Marksa 21',
    location: { lat: 53.9049, lng: 27.5680, label: 'Napoli' },
    creatorId: 'f3',
    going: 5, maybe: 2, cant: 1, status: null, unread: 5,
    participants: [
      { id: 'f3', name: 'Dima', avatar: 'happy', status: 'yes' },
      { id: 'f1', name: 'Sasha', avatar: 'party', status: 'yes' },
    ],
    messages: [
      { id: 'm4', authorId: 'f3', authorName: 'Dima', authorAvatar: 'happy', text: 'It\'s World Pizza Day. We must.', type: 'text', createdAt: now - 3600000 * 2 },
      { id: 'm5', authorId: 'f3', authorName: 'Dima', authorAvatar: 'happy', text: 'Napoli at 9? They keep a big table till half past.', type: 'text', createdAt: now - 3600000 * 2 + 60000 },
      { id: 'm6', authorId: 'f2', authorName: 'Katya', authorAvatar: 'wow', text: 'in. i have been thinking about pizza since tuesday', type: 'text', createdAt: now - 3600000 },
    ],
    lastMessageAt: now - 3600000,
    createdAt: now - 3600000 * 12,
  },
  {
    id: '3',
    category: 'hiking',
    title: 'Morning walk round Loshitsa',
    date: 'Sat 1 Aug',
    time: '10:30',
    place: 'Loshitsky Park gate',
    location: { lat: 53.8380, lng: 27.5780, label: 'Loshitsky Park' },
    creatorId: 'f2',
    going: 2, maybe: 1, cant: 0, status: null, unread: 0,
    participants: [
      { id: 'f2', name: 'Katya', avatar: 'wow', status: 'yes' },
    ],
    messages: [],
    lastMessageAt: now - 3600000 * 48,
    createdAt: now - 3600000 * 72,
  },
  {
    id: '4',
    category: 'games',
    title: "Board games at Dima's",
    date: 'Sun 2 Aug',
    time: '18:00',
    place: "Dima's flat",
    creatorId: 'f3',
    going: 4, maybe: 0, cant: 1, status: 'maybe', unread: 1,
    participants: [
      { id: 'me', name: 'Alex', avatar: 'happy', status: 'maybe' },
      { id: 'f3', name: 'Dima', avatar: 'happy', status: 'yes' },
      { id: 'f1', name: 'Sasha', avatar: 'party', status: 'yes' },
    ],
    messages: [
      { id: 'm7', authorId: 'f3', authorName: 'Dima', authorAvatar: 'happy', text: 'Catan + Codenames. Bring snacks!', type: 'text', createdAt: now - 3600000 * 6 },
    ],
    lastMessageAt: now - 3600000 * 6,
    createdAt: now - 3600000 * 36,
  },
  {
    id: '5',
    category: 'movie',
    title: 'Dune Part Three, finally',
    date: 'Wed 5 Aug',
    time: '20:15',
    place: 'Silver Screen',
    location: { lat: 53.9076, lng: 27.5470, label: 'Silver Screen' },
    creatorId: 'f1',
    going: 3, maybe: 2, cant: 0, status: null, unread: 0,
    participants: [
      { id: 'f1', name: 'Sasha', avatar: 'party', status: 'yes' },
    ],
    messages: [],
    lastMessageAt: now - 3600000 * 96,
    createdAt: now - 3600000 * 100,
  },
];

export const seedFriends: Friend[] = [
  { id: 'f1', name: 'Sasha', nickname: 'sash', birthday: '14 March', avatar: 'party', joinedAt: now - 86400000 * 200 },
  { id: 'f2', name: 'Katya', nickname: '', birthday: '2 June', avatar: 'wow', joinedAt: now - 86400000 * 180 },
  { id: 'f3', name: 'Dima', nickname: 'dim', birthday: '27 November', avatar: 'happy', joinedAt: now - 86400000 * 150 },
  { id: 'f4', name: 'Masha', nickname: '', birthday: '8 September', avatar: 'happy', joinedAt: now - 86400000 * 120 },
  { id: 'f5', name: 'Petya', nickname: 'pet', birthday: '15 January', avatar: 'wow', joinedAt: now - 86400000 * 90 },
];

export const seedNotifications: AppNotification[] = [
  { id: 'n1', type: 'birthday', title: 'Birthday today!', body: 'Sasha turns 29 today. Someone start something.', icon: '🎂', read: false, createdAt: now - 3600000 * 3, eventId: '1' },
  { id: 'n2', type: 'random_reason', title: 'Random reason rolled', body: 'Dima rolled a random reason: World Pizza Day.', icon: '🎲', read: false, createdAt: now - 3600000 * 2, eventId: '2' },
  { id: 'n3', type: 'chat_message', title: '5 new messages', body: 'New messages in World Pizza Day, obviously.', icon: '💬', read: false, createdAt: now - 3600000, eventId: '2' },
  { id: 'n4', type: 'status_change', title: 'Katya is going', body: 'Katya is going to Sasha\'s birthday.', icon: '✅', read: false, createdAt: now - 3600000 * 0.5, eventId: '1' },
  { id: 'n5', type: 'friend_joined', title: 'New friend', body: 'Masha joined the group.', icon: '👋', read: true, createdAt: now - 86400000 },
];
