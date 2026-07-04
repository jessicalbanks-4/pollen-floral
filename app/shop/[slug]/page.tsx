'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { products, categoryLabels } from '@/lib/products';
import type { Product } from '@/lib/products';

const catLabels: Record<string, string> = {
  All: 'All',
  arrangements: 'Arrangements',
  events: 'Events',
  weddings: 'Weddings',
};

function BotanicalPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 300 380" width="120" height="152" aria-hidden="true" opacity="0.12">
        <ellipse cx="150" cy="240" rx="55" ry="85" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
        <ellipse cx="105" cy="215" rx="38" ry="62" fill="none" stroke="#efaa9b" strokeWidth="1" transform="rotate(-22 105 215)" />
        <ellipse cx="195" cy="200" rx="32" ry="55" fill="none" stroke="#d1ebeb" strokeWidth="1" transform="rotate(18 195 200)" />
        <line x1="150" y1="325" x2="150" y2="100" stroke="#d4da6c" strokeWidth="1.5" />
        <ellipse cx="150" cy="100" rx="22" ry="38" fill="none" stroke="#d4da6c" strokeWidth="1.5" />
        <ellipse cx="110" cy="340" rx="30" ry="14" fill="none" stroke="#d1ebeb" strokeWidth="0.8" transform="rotate(-15 110 340)" />
        <ellipse cx="185" cy="355" rx="26" ry="12" fill="none" stroke="#efaa9b" strokeWidth="0.8" transform="rotate(10 185 355)" />
      </svg>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className="w-full aspect-[4/5] mb-4 relative overflow-hidden"
        style={{ backgroundColor: 'rgba(239,170,155,0.05)' }}
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
          <BotanicalPlaceholder />
        )}
        {product.isInquiryOnly && (
          <div
            className="absolute top-3 left-3 px-2 py-1 label"
            style={{ backgroundColor: 'var(--color-peach)', color: 'var(--color-void)', fontSize: '0.55rem' }}
          >
            Inquiry Only
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
          style={{ background: 'linear-gradient(to top, rgba(10,10,8,0.7) 0%, transparent 60%)' }}
        >
          <span className="label" style={{ color: 'var(--color-cream)', fontSize: '0.6rem' }}>
            {product.isInquiryOnly ? 'Inquire →' : 'View →'}
          </span>
        </div>
      </div>
      <p className="label mb-1" style={{ color: 'rgba(212,218,108,0.55)', fontSize: '0.6rem' }}>
        {catLabels[product.category] ?? product.category}
      </p>
      <h3 className="display-sm mb-1" style={{ color: 'var(--color-cream)' }}>
        {product.title}
      </h3>
      <p className="body-sm mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>
        {product.subtitle}
      </p>
      <p className="label" style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.65rem' }}>
        {product.price ? `From $${product.price}` : 'Pricing on inquiry'}
      </p>
    </Link>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug && p.visible);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
        style={{ backgroundColor: 'var(--color-void)' }}
      >
        <p className="label" style={{ color: 'rgba(212,218,108,0.5)' }}>404</p>
        <h1 className="display-md" style={{ color: 'var(--color-cream)' }}>Product not found</h1>
        <p className="body-lg" style={{ color: 'rgba(245,240,232,0.4)' }}>
          This one might be out of season.
        </p>
        <Link
          href="/shop"
          className="label px-6 py-3 transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-void)', fontSize: '0.65rem' }}
        >
          Back to Shop →
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.visible && p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  const fallback = products
    .filter((p) => p.visible && p.slug !== product.slug)
    .slice(0, 3 - related.length);

  const alsoLike = [...related, ...fallback].slice(0, 3);

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div
        className="site-px pt-24 pb-6 border-b"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex gap-2 items-center">
          <Link
            href="/shop"
            className="label transition-opacity hover:opacity-80"
            style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.6rem' }}
          >
            Shop
          </Link>
          <span style={{ color: 'rgba(245,240,232,0.2)', fontSize: '0.6rem' }}>/</span>
          <span className="label" style={{ color: 'rgba(212,218,108,0.6)', fontSize: '0.6rem' }}>
            {product.title}
          </span>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="site-px max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Image gallery */}
          <FadeUp>
            <div>
              {/* Main image */}
              <div
                className="w-full aspect-[4/5] relative overflow-hidden mb-3"
                style={{ backgroundColor: 'rgba(239,170,155,0.05)' }}
              >
                {product.images[selectedImage] ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <BotanicalPlaceholder />
                )}
                {product.isInquiryOnly && (
                  <div
                    className="absolute top-4 left-4 px-2 py-1 label"
                    style={{ backgroundColor: 'var(--color-peach)', color: 'var(--color-void)', fontSize: '0.55rem' }}
                  >
                    Inquiry Only
                  </div>
                )}
                {product.onSale && (
                  <div
                    className="absolute top-4 right-4 px-2 py-1 label"
                    style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-void)', fontSize: '0.55rem' }}
                  >
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {product.images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setSelectedImage(i)}
                      className="relative overflow-hidden transition-opacity"
                      style={{
                        width: 72,
                        height: 90,
                        opacity: selectedImage === i ? 1 : 0.45,
                        outline: selectedImage === i ? '2px solid var(--color-chartreuse)' : '2px solid transparent',
                        outlineOffset: 2,
                      }}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${product.title} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>

          {/* Right — Product info */}
          <FadeUp delay={0.12}>
            <div className="flex flex-col gap-6">
              {/* Category */}
              <p className="label" style={{ color: 'var(--color-chartreuse)', fontSize: '0.6rem' }}>
                {categoryLabels[product.category] ?? product.category}
              </p>

              {/* Title + subtitle */}
              <div>
                <h1 className="display-lg mb-3" style={{ color: 'var(--color-cream)' }}>
                  {product.title}
                </h1>
                <p className="body-lg" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  {product.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                {product.price !== null ? (
                  <>
                    {product.onSale && product.salePrice !== null ? (
                      <>
                        <span className="display-sm" style={{ color: 'var(--color-chartreuse)' }}>
                          ${product.salePrice}
                        </span>
                        <span
                          className="body-lg line-through"
                          style={{ color: 'rgba(245,240,232,0.3)' }}
                        >
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="display-sm" style={{ color: 'var(--color-cream)' }}>
                        ${product.price}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="body-lg" style={{ color: 'rgba(245,240,232,0.45)' }}>
                    Pricing on inquiry
                  </span>
                )}
              </div>

              {/* Divider */}
              <hr style={{ borderColor: 'rgba(245,240,232,0.08)', borderTopWidth: 1 }} />

              {/* Description */}
              <p className="body-lg" style={{ color: 'rgba(245,240,232,0.65)', lineHeight: 1.75 }}>
                {product.description}
              </p>

              {/* Best for */}
              {product.bestFor && (
                <div className="flex gap-3 items-start">
                  <span className="label shrink-0 mt-0.5" style={{ color: 'var(--color-chartreuse)', fontSize: '0.6rem' }}>
                    Best for:
                  </span>
                  <p className="body-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
                    {product.bestFor}
                  </p>
                </div>
              )}

              {/* Options */}
              {product.options.length > 0 && (
                <div className="flex flex-col gap-4">
                  {product.options.map((opt) => (
                    <div key={opt.name}>
                      <p className="label mb-2" style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.6rem' }}>
                        {opt.name.toUpperCase()}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {opt.values.map((val) => (
                          <button
                            key={val}
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))}
                            className="px-4 py-2 label transition-all duration-200"
                            style={{
                              fontSize: '0.6rem',
                              border: `1px solid ${selectedOptions[opt.name] === val ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.15)'}`,
                              color: selectedOptions[opt.name] === val ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.45)',
                              backgroundColor: 'transparent',
                            }}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {product.isInquiryOnly ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 label transition-opacity hover:opacity-80 mt-2"
                  style={{
                    backgroundColor: 'var(--color-chartreuse)',
                    color: 'var(--color-void)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                  }}
                >
                  Start an Inquiry →
                </Link>
              ) : (
                <button
                  onClick={() => console.log('Add to cart:', product.id, selectedOptions)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 label transition-all duration-200 hover:opacity-90 mt-2"
                  style={{
                    backgroundColor: 'var(--color-cream)',
                    color: 'var(--color-void)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </FadeUp>
        </div>

        {/* You may also like */}
        {alsoLike.length > 0 && (
          <FadeUp delay={0.1} className="mt-24 pt-16 border-t" style={{ borderColor: 'rgba(245,240,232,0.06)' } as React.CSSProperties}>
            <p className="label mb-2" style={{ color: 'rgba(212,218,108,0.4)', fontSize: '0.6rem' }}>
              You May Also Like
            </p>
            <h2 className="display-sm mb-10" style={{ color: 'var(--color-cream)' }}>
              More from the Studio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {alsoLike.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  );
}
