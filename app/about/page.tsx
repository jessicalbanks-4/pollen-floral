'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import PollenParticles from '@/components/ui/PollenParticles';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { num: '01', label: 'Seasonal', text: 'We use what the earth is doing right now. That\'s the whole design brief.' },
  { num: '02', label: 'Sculptural', text: 'Silhouette first. We design like fashion designers, not decorators.' },
  { num: '03', label: 'Intentional', text: 'Every stem earns its place. Nothing is filler.' },
  { num: '04', label: 'Personal', text: 'Each piece is made for a specific moment, not a generic aesthetic.' },
];

const processSteps = [
  { num: '01', title: 'Inquire', text: 'Tell us your vision, your date, your vibe.' },
  { num: '02', title: 'Design', text: 'We source seasonally and build your concept.' },
  { num: '03', title: 'Deliver', text: 'Your flowers arrive ready to stop traffic.' },
];

const stats = [
  { value: 4, suffix: '+ Years', label: 'In the Studio' },
  { value: 500, suffix: '+ Events', label: 'Flowers Delivered' },
  { value: 100, suffix: '% Seasonal', label: 'Every Time' },
];

function ScrollRevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : { y: '110%' }}
        transition={reduced ? { duration: 0 } : { duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setDisplay(target); return; }
    const duration = 1200;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, target, reduced]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t"
      style={{ borderColor: 'rgba(245,240,232,0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {stats.map((s, i) => (
        <div key={s.label}>
          <motion.div
            className="display-md mb-1"
            style={{ color: 'var(--color-chartreuse)', lineHeight: 1 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
          >
            <CountUp target={s.value} suffix={s.suffix} inView={inView} />
          </motion.div>
          <p className="label" style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.6rem' }}>
            {s.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default function AboutPage() {
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pinRef.current || !panelRef.current) return;
    const panels = panelRef.current.querySelectorAll('.about-panel');
    panels.forEach((panel, i) => {
      if (i === 0) return;
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
      });
    });
  }, { scope: pinRef });

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <PollenParticles count={40} />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(239,170,155,0.06) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24">
          <p className="label mb-6" style={{ color: 'rgba(212,218,108,0.5)' }}>About Pollen</p>
          <ScrollRevealLine>
            <h1 className="display-xl mb-0" style={{ color: 'var(--color-cream)' }}>
              We make flowers
            </h1>
          </ScrollRevealLine>
          <ScrollRevealLine delay={0.08}>
            <h1 className="display-xl" style={{ color: 'var(--color-chartreuse)' }}>
              that mean something.
            </h1>
          </ScrollRevealLine>

          <motion.p
            className="body-lg mt-10 max-w-xl"
            style={{ color: 'rgba(245,240,232,0.55)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Pollen is a boutique floral design studio based in East Nashville. We exist for the
            people who understand that flowers aren&apos;t decoration — they&apos;re the whole point.
          </motion.p>

          <StatRow />
        </div>
      </section>

      {/* Story panels */}
      <section
        ref={pinRef}
        className="px-6 md:px-10"
        style={{ backgroundColor: 'var(--color-void-soft)' }}
      >
        <div ref={panelRef} className="max-w-7xl mx-auto">

          {/* Born in East Nashville */}
          <div
            className="about-panel grid grid-cols-1 md:grid-cols-2 gap-16 py-24 border-b"
            style={{ borderColor: 'rgba(245,240,232,0.06)' }}
          >
            <div>
              <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.4)' }}>The Studio</p>
              <h2 className="display-md mb-6" style={{ color: 'var(--color-cream)' }}>
                Born in East Nashville.<br />Built to last.
              </h2>
              <p className="body-lg" style={{ color: 'rgba(245,240,232,0.5)' }}>
                Pollen started with a simple frustration: most flowers felt like an afterthought.
                Generic. Disposable. Forgettable. So we built something different — a studio where
                every arrangement is designed from a place of obsession. With color. With
                movement. With the weird, specific beauty of whatever is growing right now.
              </p>
            </div>

            {/* Quote block */}
            <div
              className="relative flex flex-col justify-center p-10 overflow-hidden"
              style={{ backgroundColor: 'rgba(212,218,108,0.03)', border: '1px solid rgba(212,218,108,0.08)' }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 24,
                  fontFamily: 'var(--font-display)',
                  fontSize: '8rem',
                  lineHeight: 1,
                  color: 'var(--color-chartreuse)',
                  opacity: 0.18,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                &ldquo;
              </span>
              <blockquote className="relative">
                <p
                  className="display-sm mb-6"
                  style={{ color: 'var(--color-cream)', lineHeight: 1.35, fontStyle: 'italic' }}
                >
                  Flowers should stop you in your tracks. If they don&apos;t, we didn&apos;t do our job.
                </p>
                <footer className="label" style={{ color: 'rgba(212,218,108,0.6)', fontSize: '0.6rem' }}>
                  — Founder, Pollen
                </footer>
              </blockquote>
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ backgroundColor: 'var(--color-chartreuse)', opacity: 0.3 }}
              />
            </div>
          </div>

          {/* Four principles */}
          <div
            className="about-panel grid grid-cols-1 md:grid-cols-2 gap-16 py-24 border-b"
            style={{ borderColor: 'rgba(245,240,232,0.06)' }}
          >
            <div
              className="aspect-[4/3] relative overflow-hidden order-2 md:order-1"
              style={{ backgroundColor: 'rgba(212,218,108,0.03)' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(212,218,108,0.04) 0%, transparent 60%)' }}
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.4)' }}>Our Approach</p>
              <h2 className="display-md mb-8" style={{ color: 'var(--color-cream)' }}>
                Four principles.<br />No compromises.
              </h2>
              <div className="flex flex-col">
                {principles.map((p, i) => (
                  <div key={p.num}>
                    <div className="flex gap-5 py-6">
                      <span
                        className="shrink-0 display-sm"
                        style={{ color: 'var(--color-chartreuse)', opacity: 0.5, lineHeight: 1, minWidth: '2.5rem' }}
                      >
                        {p.num}
                      </span>
                      <div>
                        <p className="label mb-2" style={{ color: 'var(--color-chartreuse)', fontSize: '0.65rem' }}>
                          {p.label.toUpperCase()}
                        </p>
                        <p className="body-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>{p.text}</p>
                      </div>
                    </div>
                    {i < principles.length - 1 && (
                      <hr style={{ borderColor: 'rgba(245,240,232,0.07)', borderTopWidth: 1 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process */}
          <div
            className="about-panel py-24 border-b"
            style={{ borderColor: 'rgba(245,240,232,0.06)' }}
          >
            <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.4)' }}>How It Works</p>
            <h2 className="display-md mb-14" style={{ color: 'var(--color-cream)' }}>
              The Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {processSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="flex flex-col gap-4 py-8 md:py-0 md:px-10"
                  style={{
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(245,240,232,0.07)',
                    paddingLeft: i === 0 ? 0 : undefined,
                  }}
                >
                  <span
                    className="display-lg"
                    style={{ color: 'var(--color-chartreuse)', opacity: 0.25, lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <h3 className="display-sm" style={{ color: 'var(--color-cream)' }}>
                    {step.title}
                  </h3>
                  <p className="body-lg" style={{ color: 'rgba(245,240,232,0.45)' }}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="about-panel py-24 text-center">
            <p className="label mb-6" style={{ color: 'rgba(212,218,108,0.4)' }}>Work With Us</p>
            <h2 className="display-lg mb-8" style={{ color: 'var(--color-cream)' }}>
              Ready to make<br />
              <span style={{ color: 'var(--color-peach)' }}>something real?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 label transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-chartreuse)',
                color: 'var(--color-void)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
              }}
            >
              Start an Inquiry →
            </Link>
            <div className="mt-6">
              <a
                href="https://instagram.com/pollen_floral_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="label transition-opacity hover:opacity-80"
                style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.6rem' }}
              >
                @pollen_floral_studio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
