'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface RevealTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** When true, animates on mount instead of on scroll entry (for hero/above-fold content) */
  onMount?: boolean;
}

const easing = [0.25, 0.46, 0.45, 0.94] as const;

export default function RevealText({
  children,
  className,
  duration = 0.9,
  delay = 0,
  onMount = false,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const lines = children.split('\n');

  return (
    <span className={className} aria-label={children}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: reduced ? 0 : '110%' }}
            {...(onMount
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, margin: '-5%' } })}
            transition={{ duration, delay: delay + i * 0.1, ease: easing }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
