'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

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
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-between overflow-hidden">

      {/* Video background — isolated layer, no logo composited into it */}
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

      {/* Gradient overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,8,0.8) 0%, rgba(10,10,8,0.15) 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Logo — separate from video, centered */}
      {/* Logo pinned to true viewport center — matches loading screen position exactly */}
      <div
        className="absolute z-10"
        style={{ top: '50vh', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Image
          src="/images/transparent-logo.png"
          alt="Pollen Floral Studio"
          width={500}
          height={500}
          priority
          style={{ width: 'min(72vw, 52vh)', height: 'auto', display: 'block' }}
        />
      </div>

      {/* CTA — pinned to bottom */}
      <div className="site-px relative z-10 max-w-7xl mx-auto pb-16 md:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
