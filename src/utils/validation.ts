/**
 * Validation helpers for registration and forms.
 */

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 40;
}

export function isValidNickname(nick: string): boolean {
  return nick.trim().length === 0 || (/^[a-zA-Z0-9_]{2,20}$/.test(nick.trim()));
}

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

export function isValidBirthday(birthday: string): boolean {
  const parts = birthday.trim().split(' ');
  if (parts.length !== 2) return false;
  const day = parseInt(parts[0], 10);
  const month = parts[1].toLowerCase();
  if (isNaN(day) || day < 1 || day > 31) return false;
  if (!MONTHS.includes(month)) return false;
  return true;
}

export function isValidTime(time: string): boolean {
  return /^\d{1,2}:\d{2}$/.test(time);
}

export function isValidDate(date: string): boolean {
  if (date === 'TBD') return true;
  return /^\d{1,2}\s+\w+$/.test(date);
}
