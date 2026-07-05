'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-chartreuse)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image
            src="/images/transparent-logo.png"
            alt="Pollen Floral Studio"
            width={500}
            height={500}
            priority
            style={{ width: 'min(88vw, 78vh)', height: 'auto', display: 'block' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
