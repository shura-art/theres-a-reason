export function EmptyState({
  icon = '🎉',
  title,
  subtitle,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <p>{title}</p>
      {subtitle && <small>{subtitle}</small>}
    </div>
  );
}
