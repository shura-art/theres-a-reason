import { useCallback } from 'react';
import type { Friend } from '../types';

const MAX_MEMBERS = 20;

export function useFriendsManager(friends: Friend[], setFriends: (f: Friend[]) => void) {
  const addFriend = useCallback((friend: Omit<Friend, 'id' | 'joinedAt'>) => {
    if (friends.length >= MAX_MEMBERS) return false;
    const newFriend: Friend = {
      ...friend,
      id: crypto.randomUUID(),
      joinedAt: Date.now(),
    };
    setFriends([...friends, newFriend]);
    return true;
  }, [friends, setFriends]);

  const removeFriend = useCallback((id: string) => {
    setFriends(friends.filter((f) => f.id !== id));
  }, [friends, setFriends]);

  const getInviteLink = useCallback(() => {
    const code = btoa(crypto.randomUUID()).slice(0, 10).toLowerCase();
    return `${window.location.origin}/invite/${code}`;
  }, []);

  return { addFriend, removeFriend, getInviteLink, MAX_MEMBERS };
}
