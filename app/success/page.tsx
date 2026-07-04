'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center site-px text-center"
      style={{ backgroundColor: 'var(--color-void)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-lg"
      >
        <div
          className="w-12 h-px mx-auto mb-10"
          style={{ backgroundColor: 'var(--color-chartreuse)' }}
        />
        <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.6)' }}>
          Order Confirmed
        </p>
        <h1 className="display-md mb-6" style={{ color: 'var(--color-cream)' }}>
          You're all set.
        </h1>
        <p className="body-lg mb-10" style={{ color: 'rgba(245,240,232,0.45)' }}>
          We received your order and we're already thinking about your blooms.
          You'll get a confirmation email shortly — reach out if you have any questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="label inline-flex items-center justify-center gap-3 px-8 py-4 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-chartreuse)',
              color: 'var(--color-void)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
            }}
          >
            Keep Shopping →
          </Link>
          <Link
            href="/"
            className="label inline-flex items-center justify-center gap-3 px-8 py-4 transition-opacity hover:opacity-60"
            style={{
              color: 'rgba(245,240,232,0.4)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              border: '1px solid rgba(245,240,232,0.1)',
            }}
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
