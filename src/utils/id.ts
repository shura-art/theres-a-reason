export function generateId(): string {
  return crypto.randomUUID();
}

export function generateInviteCode(): string {
  return btoa(crypto.randomUUID()).slice(0, 10).toLowerCase();
}
