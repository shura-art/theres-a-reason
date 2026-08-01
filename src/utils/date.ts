export function formatDate(dateStr: string): string {
  if (dateStr === 'Today' || dateStr === 'Tonight' || dateStr === 'TBD') return dateStr;
  return dateStr;
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDaysUntil(month: string, day: number): number {
  const now = new Date();
  const months: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };
  const m = months[month.toLowerCase()] ?? 0;
  const target = new Date(now.getFullYear(), m, day);
  if (target.getTime() < now.getTime()) {
    target.setFullYear(target.getFullYear() + 1);
  }
  return Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
}

export function getUpcomingBirthday(birthday: string): string {
  const parts = birthday.split(' ');
  if (parts.length < 2) return birthday;
  const day = parseInt(parts[0]);
  const month = parts[1];
  const days = getDaysUntil(month, day);
  if (days === 0) return 'Today! 🎂';
  if (days <= 7) return `In ${days} days`;
  return birthday;
}
