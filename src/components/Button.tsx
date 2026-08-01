import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  children,
  onClick,
  disabled,
  variant = 'primary',
  className = '',
  type = 'button',
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}) {
  const variantClass =
    variant === 'primary' ? 'primary' : variant === 'secondary' ? '' : '';
  return (
    <motion.button
      type={type}
      className={`${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
