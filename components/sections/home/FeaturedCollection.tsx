'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { visibleProducts } from '@/lib/products';

const featured = visibleProducts.filter((p) => p.category === 'arrangements').slice(0, 3);

// Pixels per second — slow enough to be ambient, fast enough to feel alive
const SPEED_PX_PER_S = 72;

const BotanicalSvg = () => (
  <svg viewBox="0 0 200 260" width="60" height="78" aria-hidden="true" opacity="0.08">
    <ellipse cx="100" cy="180" rx="40" ry="60" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
    <ellipse cx="70"  cy="160" rx="28" ry="45" fill="none" stroke="#efaa9b" strokeWidth="1" transform="rotate(-20 70 160)" />
    <ellipse cx="130" cy="150" rx="24" ry="40" fill="none" stroke="#d1ebeb" strokeWidth="1" transform="rotate(15 130 150)" />
    <line x1="100" y1="240" x2="100" y2="80" stroke="#d4da6c" strokeWidth="1.5" />
    <ellipse cx="100" cy="80" rx="18" ry="30" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
  </svg>
);

export default function FeaturedCollection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);

  // Build the tween once layout is ready
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // One full set = half the duplicated track width
    const raf = requestAnimationFrame(() => {
      const halfWidth = track.scrollWidth / 2;
      const duration  = halfWidth / SPEED_PX_PER_S;

      const tween = gsap.to(track, {
        x: -halfWidth,
        duration,
        ease: 'none',
        repeat: -1,
        // Seamless: when x reaches -halfWidth GSAP instantly resets to 0
        // The duplicated content makes this invisible
      });

      tweenRef.current = tween;
    });

    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
    };
  }, []);

  const pauseLoop  = useCallback(() => tweenRef.current?.pause(), []);
  const resumeLoop = useCallback(() => tweenRef.current?.resume(), []);

  const handleCardClick = useCallback((id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
      resumeLoop();
    } else {
      setSelectedId(id);
      pauseLoop();
    }
  }, [selectedId, pauseLoop, resumeLoop]);

  const handleDismiss = useCallback(() => {
    setSelectedId(null);
    resumeLoop();
  }, [resumeLoop]);

  // One "set" = 3 product cards + 1 Shop All card. Duplicated for seamless loop.
  const sets = [0, 1]; // render twice

  return (
    <section
      style={{ backgroundColor: 'var(--color-void)', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }}
    >
      {/* Dismiss overlay — clicking outside any card clears selection */}
      {selectedId && (
        <div
          onClick={handleDismiss}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            cursor: 'default',
          }}
          aria-hidden="true"
        />
      )}

      {/* Section header */}
      <div className="site-px mb-10 flex items-end justify-between max-w-7xl mx-auto">
        <div>
          <p className="label mb-2" style={{ color: 'rgba(212,218,108,0.55)', fontSize: '0.6rem', letterSpacing: '0.22em' }}>
            This Season
          </p>
          <h2 className="display-md" style={{ color: 'var(--color-cream)' }}>
            In Bloom, For You
          </h2>
        </div>
        <Link
          href="/shop"
          className="label inline-flex items-center gap-2 group"
          style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.6rem' }}
        >
          <span>See all</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Scrolling strip — mask left/right edges with fade so cards appear/disappear cleanly */}
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
          maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            paddingLeft: '4rem',
            paddingRight: '4rem',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {sets.map((setIdx) => (
            <div key={setIdx} style={{ display: 'flex', gap: '1.5rem' }}>
              {/* Product cards */}
              {featured.map((product) => {
                const activeId   = selectedId ?? hoveredId;
                const isSelected = activeId === product.id;
                const isBlurred  = activeId !== null && !isSelected;

                return (
                  <div
                    key={`${product.id}-${setIdx}`}
                    onClick={(e) => { e.stopPropagation(); handleCardClick(product.id); }}
                    onMouseEnter={() => { setHoveredId(product.id); pauseLoop(); }}
                    onMouseLeave={() => { setHoveredId(null); if (!selectedId) resumeLoop(); }}
                    style={{
                      position: 'relative',
                      width: 'clamp(260px, 28vw, 380px)',
                      flexShrink: 0,
                      cursor: 'pointer',
                      zIndex: isSelected ? 20 : 10,
                      // Blur non-selected cards, lift selected card
                      filter:    isBlurred  ? 'blur(6px) brightness(0.5)' : 'none',
                      opacity:   isBlurred  ? 0.3 : 1,
                      transform: isSelected ? 'scale(1.03) translateY(-6px)' : 'scale(1) translateY(0)',
                      transition: 'filter 0.45s ease, opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Card image */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(260px, 44vh, 440px)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(239,170,155,0.04)',
                      }}
                    >
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          style={{
                            transition: 'transform 0.6s ease',
                            transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                          }}
                          sizes="(max-width: 768px) 80vw, 30vw"
                          priority={setIdx === 0}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BotanicalSvg />
                        </div>
                      )}

                      {/* Selected: show shop/inquire pill */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            background: 'linear-gradient(to top, rgba(19,14,10,0.7) 0%, transparent 50%)',
                          }}
                        >
                          <Link
                            href={`/shop/${product.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="label"
                            style={{
                              backgroundColor: 'var(--color-chartreuse)',
                              color: 'var(--color-void)',
                              padding: '0.5rem 1.25rem',
                              fontSize: '0.6rem',
                              letterSpacing: '0.18em',
                              display: 'inline-block',
                            }}
                          >
                            {product.isInquiryOnly ? 'Inquire →' : 'Shop →'}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Caption */}
                    <div style={{ marginTop: '0.875rem' }}>
                      <p className="label mb-0.5" style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.55rem' }}>
                        {product.category}
                      </p>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="display-sm" style={{ color: 'var(--color-cream)', fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>
                          {product.title}
                        </h3>
                        <span className="label shrink-0" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.55rem' }}>
                          {product.price ? `$${product.price}` : 'Inquiry'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Shop All CTA card — at the end of each set */}
              <Link
                href="/shop"
                onMouseEnter={pauseLoop}
                onMouseLeave={() => { if (!selectedId) resumeLoop(); }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: 'clamp(180px, 18vw, 260px)',
                  flexShrink: 0,
                  height: 'clamp(260px, 44vh, 440px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(245,240,232,0.08)',
                  borderRadius: '2px',
                  gap: '0.75rem',
                  zIndex: 10,
                  filter:    (selectedId ?? hoveredId) ? 'blur(4px) brightness(0.5)' : 'none',
                  opacity:   (selectedId ?? hoveredId) ? 0.25 : 1,
                  transition: 'filter 0.45s ease, opacity 0.45s ease',
                  textDecoration: 'none',
                }}
              >
                <span
                  className="display-md"
                  style={{
                    color: 'rgba(245,240,232,0.2)',
                    transition: 'color 0.2s',
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
                <span className="label" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.58rem' }}>
                  Shop All
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
