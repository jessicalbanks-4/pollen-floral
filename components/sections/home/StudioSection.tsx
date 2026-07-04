'use client';

import { useState } from 'react';
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
          {pillars.map((p, i) => {
            const hovered = hoveredIdx === i;
            return (
              <div
                key={p.num}
                className="group relative overflow-hidden flex flex-col cursor-default"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: hovered ? 'var(--color-blue-pollen)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hovered ? 'transparent' : 'rgba(245,240,232,0.12)'}`,
                  padding: '2.5rem',
                  transition: 'background-color 0.4s ease, border-color 0.4s ease',
                }}
              >
                {/* Top accent line — full width on hover */}
                <div
                  className="absolute top-0 left-0 h-0.5 transition-all duration-500 ease-out"
                  style={{
                    width: hovered ? '100%' : '2.5rem',
                    backgroundColor: 'var(--color-chartreuse)',
                  }}
                />

                {/* Number */}
                <span
                  className="label block mb-8"
                  style={{
                    color: hovered ? 'rgba(212,218,108,0.7)' : 'rgba(212,218,108,0.45)',
                    fontSize: '0.6rem',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {p.num}
                </span>

                {/* Title */}
                <h3
                  className="display-sm mb-6"
                  style={{
                    color: 'var(--color-cream)',
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {p.title}
                </h3>

                {/* Divider */}
                <div
                  className="mb-6"
                  style={{
                    height: '1px',
                    backgroundColor: hovered ? 'rgba(245,240,232,0.2)' : 'rgba(245,240,232,0.08)',
                    transition: 'background-color 0.4s ease',
                  }}
                />

                {/* Body */}
                <p
                  className="body-sm leading-loose flex-1"
                  style={{
                    color: hovered ? 'rgba(245,240,232,0.8)' : 'rgba(245,240,232,0.55)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
