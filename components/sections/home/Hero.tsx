'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import PollenParticles from '@/components/ui/PollenParticles';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Subtle gradient — just enough at bottom for CTA legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,8,0.75) 0%, rgba(10,10,8,0.1) 35%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <PollenParticles count={50} />

      {/* CTA — bottom left, only element */}
      <div className="site-px relative z-10 max-w-7xl mx-auto pb-16 md:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-9 py-5 label transition-all duration-300 hover:gap-5"
            style={{
              backgroundColor: 'var(--color-chartreuse)',
              color: 'var(--color-void)',
              fontSize: '0.85rem',
              letterSpacing: '0.18em',
              fontWeight: 700,
            }}
          >
            Shop Now <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
