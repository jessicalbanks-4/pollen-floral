'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export default function ScaleOnHover({ children, className, scale = 1.03 }: ScaleOnHoverProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={{ scale: reduced ? 1 : scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
