'use client';

import { motion, useReducedMotion, type Transition } from 'framer-motion';
import Link from 'next/link';

type Variant = 'filled' | 'outlined' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
  filled:
    'bg-[var(--color-chartreuse)] text-[var(--color-bark)] hover:bg-[var(--color-chartreuse-light)]',
  outlined:
    'border border-white text-white hover:bg-white/10',
  ghost:
    'border border-[var(--color-bark)] text-[var(--color-bark)] hover:bg-[var(--color-bark)]/5',
};

export default function Button({
  children,
  variant = 'filled',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const base =
    'inline-flex items-center justify-center px-6 py-3 label rounded-none transition-colors duration-200 cursor-pointer select-none';
  const styles = `${base} ${variantStyles[variant]} ${className}`;

  const springTransition: Transition = { type: 'spring', stiffness: 400, damping: 25 };
  const motionProps = {
    whileHover: reduced ? {} : { scale: 1.02 },
    whileTap: reduced ? {} : { scale: 0.98 },
    transition: springTransition,
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={styles}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </motion.button>
  );
}
