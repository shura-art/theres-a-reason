import type { AppNotification } from '../types';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function showNotification(title: string, body: string, icon?: string): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    new Notification(title, {
      body,
      icon: icon || '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'povod-notification',
    });
  } catch {
    // notification creation failed
  }
}

export async function subscribeToPush(): Promise<void> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    // In production, this would use a VAPID public key from the server
    // For now, we skip actual push subscription as there's no push server
    void reg;
  } catch {
    // push subscription failed
  }
}

export function formatNotificationTime(ts: number): string {
  const diff = Date.now() - ts;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function notificationIcon(type: AppNotification['type']): string {
  const icons: Record<AppNotification['type'], string> = {
    birthday: '🎂',
    new_event: '🎉',
    random_reason: '🎲',
    friend_joined: '👋',
    status_change: '✅',
    chat_message: '💬',
  };
  return icons[type];
}
