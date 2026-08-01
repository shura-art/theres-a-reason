export function Droplet({
  mood = 'happy',
  size = 80,
  color,
}: {
  mood?: 'happy' | 'party' | 'wow' | 'cool' | 'sad';
  size?: number;
  color?: string;
}) {
  const fillColor = color || 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 5C50 5 87 47 87 66A37 37 0 1 1 13 66C13 47 50 5 50 5Z"
        fill={fillColor}
      />
      {mood === 'happy' && (
        <>
          <circle cx="38" cy="63" r="5.5" fill="var(--ink)" />
          <circle cx="62" cy="63" r="5.5" fill="var(--ink)" />
          <path d="M39 77q11 9 22 0" stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'party' && (
        <>
          <circle cx="38" cy="63" r="5.5" fill="var(--ink)" />
          <circle cx="62" cy="63" r="5.5" fill="var(--ink)" />
          <path d="M38 74a12 12 0 0 0 24 0Z" fill="var(--ink)" />
          <path d="M50 8L53 2L47 2Z" fill="var(--sun)" />
        </>
      )}
      {mood === 'wow' && (
        <>
          <circle cx="38" cy="61" r="6" fill="var(--ink)" />
          <circle cx="62" cy="61" r="6" fill="var(--ink)" />
          <ellipse cx="50" cy="80" rx="8" ry="10" fill="var(--ink)" />
        </>
      )}
      {mood === 'cool' && (
        <>
          <rect x="28" y="58" width="18" height="10" rx="3" fill="var(--ink)" />
          <rect x="54" y="58" width="18" height="10" rx="3" fill="var(--ink)" />
          <line x1="46" y1="63" x2="54" y2="63" stroke="var(--ink)" strokeWidth="2" />
          <path d="M39 80q11 5 22 0" stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'sad' && (
        <>
          <circle cx="38" cy="63" r="5.5" fill="var(--ink)" />
          <circle cx="62" cy="63" r="5.5" fill="var(--ink)" />
          <path d="M39 82q11 -9 22 0" stroke="var(--ink)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="72" r="2" fill="var(--blue)" opacity="0.6" />
          <circle cx="62" cy="72" r="2" fill="var(--blue)" opacity="0.6" />
        </>
      )}
    </svg>
  );
}
