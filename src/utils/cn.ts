/**
 * Conditional class name builder.
 * Filters out falsy values and joins the rest with spaces.
 * Usage: cn('btn', isActive && 'btn-active', variant === 'big' && 'btn-lg')
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
