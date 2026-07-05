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
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden">

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

      {/* Logo — true center of hero, independent of nav */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src="/images/transparent-logo.png"
          alt="Pollen Floral Studio"
          width={500}
          height={500}
          priority
          style={{ width: 'min(88vw, 78vh)', height: 'auto', display: 'block' }}
        />
      </div>


    </section>
  );
}
