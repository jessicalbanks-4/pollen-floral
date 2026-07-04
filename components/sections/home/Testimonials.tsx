'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "I've never had flowers like this. People ask about them every single time.",
    name: 'Margot L.',
    context: 'Monthly subscriber',
  },
  {
    quote: "The Pollen Bar at our launch event was the most-photographed thing in the room — by far.",
    name: 'Kira S.',
    context: 'Brand activation client',
  },
  {
    quote: "My bouquet was exactly what I pictured but more alive, more real than I imagined.",
    name: 'Tessa W.',
    context: 'Bride, Fall 2024',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="section-gap px-6 md:px-10 border-y"
      style={{
        backgroundColor: 'var(--color-void)',
        borderColor: 'rgba(245,240,232,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="label mb-16 text-center" style={{ color: 'rgba(245,240,232,0.25)' }}>
          What People Say
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(245,240,232,0.06)' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-8 md:p-10"
              style={{ backgroundColor: 'var(--color-void)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p
                className="display-sm mb-6 leading-snug"
                style={{ color: 'var(--color-cream)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="label" style={{ color: 'var(--color-chartreuse)', fontSize: '0.6rem' }}>
                  {t.name}
                </p>
                <p className="body-sm mt-0.5" style={{ color: 'rgba(245,240,232,0.3)' }}>
                  {t.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
