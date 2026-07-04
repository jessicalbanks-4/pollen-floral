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
      className="section-gap site-px"
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

        {/* Three-column pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group relative overflow-hidden flex flex-col cursor-default"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(245,240,232,0.12)',
                padding: '2.5rem',
              }}
            >
              {/* Top accent line — always visible, grows on hover */}
              <div
                className="absolute top-0 left-0 h-0.5 transition-all duration-500 ease-out"
                style={{
                  width: '2.5rem',
                  backgroundColor: 'var(--color-chartreuse)',
                  transitionProperty: 'width',
                }}
              />
              <div
                className="absolute top-0 left-0 h-0.5 w-0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ backgroundColor: 'var(--color-chartreuse)', opacity: 0.4 }}
              />

              {/* Number */}
              <span
                className="label block mb-8"
                style={{ color: 'rgba(212,218,108,0.45)', fontSize: '0.6rem' }}
              >
                {p.num}
              </span>

              {/* Title */}
              <h3
                className="display-sm mb-6 transition-all duration-300 ease-out group-hover:-translate-y-1"
                style={{ color: 'var(--color-cream)' }}
              >
                {p.title}
              </h3>

              {/* Divider */}
              <div
                className="mb-6"
                style={{ height: '1px', backgroundColor: 'rgba(245,240,232,0.08)' }}
              />

              {/* Body */}
              <p
                className="body-sm leading-loose flex-1"
                style={{ color: 'rgba(245,240,232,0.55)' }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
