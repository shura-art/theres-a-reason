import type { EventCategory } from '../types';

export const categoryMeta: Record<EventCategory, { label: string; emoji: string }> = {
  birthday: { label: 'Birthday', emoji: '🎂' },
  important: { label: 'Important', emoji: '⭐' },
  random: { label: 'Random', emoji: '🎲' },
  bbq: { label: 'BBQ', emoji: '🔥' },
  games: { label: 'Games', emoji: '🎲' },
  hiking: { label: 'Hiking', emoji: '🥾' },
  coffee: { label: 'Coffee', emoji: '☕' },
  movie: { label: 'Movie', emoji: '🎬' },
  sports: { label: 'Sports', emoji: '🚲' },
  dinner: { label: 'Dinner', emoji: '🍽️' },
  music: { label: 'Music', emoji: '🎵' },
  photo: { label: 'Photo walk', emoji: '📷' },
  learning: { label: 'Learning', emoji: '📚' },
};

export const categoryList: EventCategory[] = [
  'birthday', 'important', 'random', 'bbq', 'games', 'hiking',
  'coffee', 'movie', 'sports', 'dinner', 'music', 'photo', 'learning',
];
