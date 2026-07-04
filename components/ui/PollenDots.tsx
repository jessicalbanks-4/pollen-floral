'use client';

import { useMemo } from 'react';

interface PollenDotsProps {
  count?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export default function PollenDots({
  count = 12,
  color = 'var(--color-bark)',
  opacity = 0.08,
  className = '',
}: PollenDotsProps) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 37 + 11) % 97,
      y: (i * 53 + 7) % 93,
      r: 2 + ((i * 17) % 3),
    }));
  }, [count]);

  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {dots.map((dot) => (
        <circle
          key={dot.id}
          cx={`${dot.x}%`}
          cy={`${dot.y}%`}
          r={dot.r}
          fill={color}
        />
      ))}
    </svg>
  );
}
