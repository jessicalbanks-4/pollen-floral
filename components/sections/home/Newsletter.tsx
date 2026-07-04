'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="section-gap px-6 md:px-10"
      style={{ backgroundColor: 'var(--color-void-soft)' }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.5)' }}>
          The Bloom Report
        </p>
        <h2 className="display-md mb-4" style={{ color: 'var(--color-cream)' }}>
          Stay in the loop.
        </h2>
        <p className="body-lg mb-10" style={{ color: 'rgba(245,240,232,0.4)' }}>
          What&apos;s in season, what we&apos;re obsessing over, and when you can get it.
          No spam. Just flowers.
        </p>

        {submitted ? (
          <p className="label" style={{ color: 'var(--color-chartreuse)' }}>
            You&apos;re in. Watch your inbox.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 bg-transparent border text-sm outline-none placeholder-opacity-30"
              style={{
                borderColor: 'rgba(245,240,232,0.15)',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
              }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-8 py-4 label transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-chartreuse)',
                color: 'var(--color-void)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-body)',
              }}
            >
              Join
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
