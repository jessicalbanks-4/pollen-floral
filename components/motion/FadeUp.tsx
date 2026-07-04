'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onMount?: boolean;
}

const easing = [0.25, 0.46, 0.45, 0.94] as const;

export default function FadeUp({ children, delay = 0, className, onMount = false }: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      {...(onMount
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-10%' } })}
      transition={{ duration: 0.6, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
