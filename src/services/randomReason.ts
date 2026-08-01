import holidays from '../data/holidays.json';
import type { EventCategory } from '../types';

interface Holiday {
  name: string;
  category: string;
}

export function getRandomReason(): { name: string; category: EventCategory } {
  const list = holidays as Holiday[];
  const entry = list[Math.floor(Math.random() * list.length)];
  return {
    name: entry.name,
    category: entry.category as EventCategory,
  };
}

export function getRandomReasons(count: number): { name: string; category: EventCategory }[] {
  const list = holidays as Holiday[];
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((h) => ({ name: h.name, category: h.category as EventCategory }));
}

export function getHolidayCount(): number {
  return (holidays as Holiday[]).length;
}
