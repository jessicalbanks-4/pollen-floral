'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--color-void)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Chartreuse accent bar top */}
          <motion.div
            className="absolute top-0 left-0 h-0.5 w-full"
            style={{ backgroundColor: 'var(--color-chartreuse)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo reveal */}
          <div className="overflow-hidden">
            <motion.p
              className="display-lg"
              style={{ color: 'var(--color-cream)', letterSpacing: '-0.02em' }}
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              Pollen
            </motion.p>
          </div>

          <motion.p
            className="label mt-2"
            style={{ color: 'rgba(245,240,232,0.35)', letterSpacing: '0.22em', fontSize: '0.6rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Floral Studio · Nashville
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-px w-32"
            style={{ backgroundColor: 'rgba(245,240,232,0.1)' }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: 'var(--color-chartreuse)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
