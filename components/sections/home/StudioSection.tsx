'use client';

import Link from 'next/link';

const pillars = [
  {
    num: '01',
    title: 'Seasonal Always',
    body: "We work with what's alive right now. No imported filler, no default grocery-store palette. Every piece reflects what's actually in season.",
  },
  {
    num: '02',
    title: 'Sculptural Movement',
    body: "Every arrangement is designed the way fashion is — silhouette first, then detail. Shape matters as much as the bloom.",
  },
  {
    num: '03',
    title: 'Intentional Color',
    body: 'Color is a story. We choose a palette for each piece the way a director picks a shot — nothing accidental.',
  },
];

export default function StudioSection() {
  return (
    <section
      className="section-gap px-6 md:px-10"
      style={{ backgroundColor: 'var(--color-void-soft)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.5)' }}>
            The Pollen Way
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="display-lg" style={{ color: 'var(--color-cream)' }}>
              100% unique.<br />
              <span style={{ color: 'var(--color-peach)' }}>100% of the time.</span>
            </h2>
            <Link
              href="/about"
              className="label inline-flex items-center gap-3 group self-start md:self-auto"
              style={{ color: 'var(--color-chartreuse)', fontSize: '0.65rem' }}
            >
              <span>Our story</span>
              <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>

        {/* Three-column hover panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8" style={{ backgroundColor: 'transparent' }}>
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group relative overflow-hidden px-8 py-12 cursor-default border"
              style={{ backgroundColor: 'var(--color-void-soft)', borderColor: 'rgba(245,240,232,0.06)' }}
            >
              {/* Number — fades out on hover */}
              <span
                className="label block mb-6 transition-opacity duration-300 group-hover:opacity-0"
                style={{ color: 'rgba(212,218,108,0.35)', fontSize: '0.6rem' }}
              >
                {p.num}
              </span>

              {/* Title — shifts up on hover */}
              <h3
                className="display-sm mb-6 transition-all duration-300 ease-out group-hover:-translate-y-2"
                style={{ color: 'var(--color-cream)' }}
              >
                {p.title}
              </h3>

              {/* Body — always visible, slides up slightly on hover */}
              <p
                className="body-sm leading-relaxed transition-all duration-300 ease-out group-hover:translate-y-[-4px]"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                {p.body}
              </p>

              {/* Chartreuse accent line — grows from left on hover */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ backgroundColor: 'var(--color-chartreuse)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
