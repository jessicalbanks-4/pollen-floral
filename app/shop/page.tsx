'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { visibleProducts } from '@/lib/products';
import PollenParticles from '@/components/ui/PollenParticles';

const ALL = 'All';
const cats = [ALL, 'arrangements', 'events', 'weddings'];
const catLabels: Record<string, string> = {
  All: 'All',
  arrangements: 'Arrangements',
  events: 'Events & Activations',
  weddings: 'Weddings',
};

const BotanicalSvg = () => (
  <svg viewBox="0 0 200 260" width="60" height="78" aria-hidden="true" opacity="0.1">
    <ellipse cx="100" cy="180" rx="40" ry="60" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
    <ellipse cx="70" cy="160" rx="28" ry="45" fill="none" stroke="#efaa9b" strokeWidth="1" transform="rotate(-20 70 160)" />
    <ellipse cx="130" cy="150" rx="24" ry="40" fill="none" stroke="#d1ebeb" strokeWidth="1" transform="rotate(15 130 150)" />
    <line x1="100" y1="240" x2="100" y2="80" stroke="#d4da6c" strokeWidth="1.5" />
    <ellipse cx="100" cy="80" rx="18" ry="30" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
  </svg>
);

export default function ShopPage() {
  const [active, setActive] = useState(ALL);
  const filtered = active === ALL ? visibleProducts : visibleProducts.filter((p) => p.category === active);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>

      {/* Hero header */}
      <section
        ref={headerRef}
        className="relative pt-32 pb-20 px-6 md:px-10 overflow-hidden border-b"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <PollenParticles count={30} />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              className="label mb-3"
              style={{ color: 'rgba(212,218,108,0.55)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              The Collection
            </motion.p>
            <motion.h1
              className="display-lg"
              style={{ color: 'var(--color-cream)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Shop
            </motion.h1>
          </div>
          <motion.p
            className="body-sm max-w-xs"
            style={{ color: 'rgba(245,240,232,0.4)' }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every piece is seasonal, one-of-a-kind, and made with intention. No filler.
          </motion.p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div
        className="sticky top-16 z-40 px-6 md:px-10 py-3 border-b"
        style={{
          backgroundColor: 'rgba(19,14,10,0.94)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(245,240,232,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="label shrink-0 py-1 border-b-2 transition-all duration-200"
              style={{
                color: active === c ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.35)',
                borderColor: active === c ? 'var(--color-chartreuse)' : 'transparent',
                fontSize: '0.62rem',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {catLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 && (
              <div className="col-span-3 py-24 text-center">
                <p className="body-lg" style={{ color: 'rgba(245,240,232,0.3)' }}>
                  Nothing here yet — check back soon.
                </p>
              </div>
            )}

            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/shop/${product.slug}`} className="group block">
                  {/* Image */}
                  <div
                    className="w-full aspect-[4/5] mb-5 relative overflow-hidden"
                    style={{ backgroundColor: 'rgba(239,170,155,0.04)' }}
                  >
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BotanicalSvg />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.isInquiryOnly && (
                        <span
                          className="label px-2 py-1"
                          style={{ backgroundColor: 'var(--color-peach)', color: 'var(--color-void)', fontSize: '0.5rem' }}
                        >
                          Inquiry Only
                        </span>
                      )}
                      {product.onSale && (
                        <span
                          className="label px-2 py-1"
                          style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-void)', fontSize: '0.5rem' }}
                        >
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                      style={{ background: 'linear-gradient(to top, rgba(19,14,10,0.82) 0%, transparent 55%)' }}
                    >
                      <span className="label" style={{ color: 'var(--color-cream)', fontSize: '0.58rem' }}>
                        {product.isInquiryOnly ? 'Inquire →' : 'View →'}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <p className="label mb-1" style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.58rem' }}>
                    {catLabels[product.category] ?? product.category}
                  </p>
                  <h2 className="display-sm mb-1" style={{ color: 'var(--color-cream)' }}>
                    {product.title}
                  </h2>
                  <p className="body-sm mb-3" style={{ color: 'rgba(245,240,232,0.4)', lineHeight: 1.5 }}>
                    {product.subtitle}
                  </p>
                  <div className="flex items-center gap-3">
                    {product.onSale && product.salePrice ? (
                      <>
                        <span className="label" style={{ color: 'var(--color-chartreuse)', fontSize: '0.65rem' }}>
                          From ${product.salePrice}
                        </span>
                        <span className="label line-through" style={{ color: 'rgba(245,240,232,0.25)', fontSize: '0.65rem' }}>
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="label" style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.65rem' }}>
                        {product.price ? `From $${product.price}` : 'Pricing on inquiry'}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <section
        className="px-6 md:px-10 py-24 border-t text-center"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.45)' }}>
          Something custom in mind?
        </p>
        <h2 className="display-md mb-8" style={{ color: 'var(--color-cream)' }}>
          Let&apos;s build it together.
        </h2>
        <Link
          href="/contact"
          className="label inline-flex items-center gap-3 px-8 py-4 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-chartreuse)',
            color: 'var(--color-void)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
          }}
        >
          Start an Inquiry →
        </Link>
      </section>
    </div>
  );
}
