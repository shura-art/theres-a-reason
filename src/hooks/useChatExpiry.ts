import { useState, useEffect, useCallback } from 'react';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function useChatExpiry(lastMessageAt: number) {
  const [remaining, setRemaining] = useState(() => SEVEN_DAYS - (Date.now() - lastMessageAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(SEVEN_DAYS - (Date.now() - lastMessageAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [lastMessageAt]);

  const isExpired = useCallback(() => remaining <= 0, [remaining]);

  const formatRemaining = useCallback(() => {
    if (remaining <= 0) return 'expired';
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }, [remaining]);

  return { remaining, isExpired, formatRemaining };
}
