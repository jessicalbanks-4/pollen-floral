'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import PollenParticles from '@/components/ui/PollenParticles';

export default function PhilosophyQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const reduced = useReducedMotion();

  const words = ['Flowers', 'are', 'not', 'decoration.', "They're", 'the', 'whole', 'point.'];

  return (
    <section
      ref={ref}
      className="relative section-gap px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-void-soft)' }}
    >
      <PollenParticles count={30} />

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="label mb-8" style={{ color: 'rgba(212,218,108,0.55)' }}>
          Our Ethos
        </p>

        <blockquote>
          <p
            className="display-xl leading-none"
            style={{ color: 'var(--color-cream)' }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: 0.75,
                          delay: i * 0.07,
                          ease: [0.76, 0, 0.24, 1],
                        }
                  }
                  style={{
                    color: word === 'whole' || word === 'point.' ? 'var(--color-chartreuse)' : undefined,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.footer
            className="mt-8 label"
            style={{ color: 'rgba(245,240,232,0.3)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            — Pollen Floral Studio, Nashville TN
          </motion.footer>
        </blockquote>
      </div>
    </section>
  );
}
