import type { Sticker } from '../types';

export const dropletStickers: Sticker[] = [
  { id: 'd1', name: 'Happy', emoji: '💧', category: 'droplet' },
  { id: 'd2', name: 'Party', emoji: '🎉', category: 'droplet' },
  { id: 'd3', name: 'Love', emoji: '💙', category: 'droplet' },
  { id: 'd4', name: 'Wow', emoji: '😲', category: 'droplet' },
  { id: 'd5', name: 'Cool', emoji: '😎', category: 'droplet' },
  { id: 'd6', name: 'Sad', emoji: '😢', category: 'droplet' },
  { id: 'd7', name: 'Fire', emoji: '🔥', category: 'droplet' },
  { id: 'd8', name: 'Star', emoji: '⭐', category: 'droplet' },
  { id: 'd9', name: 'Pizza', emoji: '🍕', category: 'droplet' },
  { id: 'd10', name: 'Coffee', emoji: '☕', category: 'droplet' },
  { id: 'd11', name: 'Cake', emoji: '🎂', category: 'droplet' },
  { id: 'd12', name: 'Cheers', emoji: '🥂', category: 'droplet' },
];

export const chatStickers: Sticker[] = [
  { id: 'c1', name: 'Yes', emoji: '✅', category: 'chat' },
  { id: 'c2', name: 'Maybe', emoji: '🤔', category: 'chat' },
  { id: 'c3', name: 'No', emoji: '❌', category: 'chat' },
  { id: 'c4', name: 'Coming', emoji: '🏃', category: 'chat' },
  { id: 'c5', name: 'Late', emoji: '🐌', category: 'chat' },
  { id: 'c6', name: 'Soon', emoji: '⏰', category: 'chat' },
  { id: 'c7', name: 'Where', emoji: '📍', category: 'chat' },
  { id: 'c8', name: 'Done', emoji: '✨', category: 'chat' },
];

export const allStickers = [...dropletStickers, ...chatStickers];
