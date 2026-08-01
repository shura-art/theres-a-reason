import { Droplet } from './Droplet';

export function Avatar({
  avatar,
  size = 44,
}: {
  avatar: string;
  size?: number;
}) {
  const moodMap: Record<string, 'happy' | 'party' | 'wow' | 'cool' | 'sad'> = {
    happy: 'happy',
    party: 'party',
    wow: 'wow',
    cool: 'cool',
    sad: 'sad',
  };
  const mood = moodMap[avatar] || 'happy';

  return (
    <div
      className="friend-avatar"
      style={{ width: size, height: size, fontSize: size * 0.035 }}
      aria-hidden="true"
    >
      <Droplet mood={mood} size={size - 10} color="var(--blue)" />
    </div>
  );
}
