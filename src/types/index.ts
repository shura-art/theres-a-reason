export type Status = 'yes' | 'maybe' | 'no' | null;

export type EventCategory =
  | 'birthday'
  | 'important'
  | 'random'
  | 'bbq'
  | 'games'
  | 'hiking'
  | 'coffee'
  | 'movie'
  | 'sports'
  | 'dinner'
  | 'music'
  | 'photo'
  | 'learning';

export type Participant = {
  id: string;
  name: string;
  avatar: string;
  status: Exclude<Status, null>;
};

export type ChatMessage = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  type: 'text' | 'sticker' | 'image' | 'system';
  stickerId?: string;
  imageData?: string;
  createdAt: number;
};

export type ReasonEvent = {
  id: string;
  category: EventCategory;
  title: string;
  date: string;
  time: string;
  place: string;
  location?: { lat: number; lng: number; label: string };
  creatorId: string;
  going: number;
  maybe: number;
  cant: number;
  status: Status;
  unread: number;
  participants: Participant[];
  messages: ChatMessage[];
  lastMessageAt: number;
  createdAt: number;
};

export type Profile = {
  id: string;
  name: string;
  nickname: string;
  birthday: string;
  avatar: string;
  joinedAt: number;
};

export type Friend = {
  id: string;
  name: string;
  nickname: string;
  birthday: string;
  avatar: string;
  joinedAt: number;
};

export type AppNotification = {
  id: string;
  type: 'birthday' | 'new_event' | 'random_reason' | 'friend_joined' | 'status_change' | 'chat_message';
  title: string;
  body: string;
  icon: string;
  read: boolean;
  createdAt: number;
  eventId?: string;
};

export type Sticker = {
  id: string;
  name: string;
  emoji: string;
  category: 'droplet' | 'chat';
};

export type Theme = 'light' | 'dark';
