'use client';

import { motion } from 'framer-motion';

interface VideoBlockProps {
  src?: string;
  poster?: string;
  className?: string;
  aspectRatio?: string;
  placeholderColor?: string;
}

export default function VideoBlock({
  src,
  poster,
  className = '',
  aspectRatio = '16/9',
  placeholderColor = 'var(--color-chartreuse-light)',
}: VideoBlockProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio, backgroundColor: placeholderColor }}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {src ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Placeholder: replace with actual video at /videos/ */
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            style={{ opacity: 0.3 }}
          >
            <circle cx="32" cy="32" r="28" stroke="var(--color-bark)" strokeWidth="2" />
            <circle cx="32" cy="32" r="8" fill="var(--color-bark)" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="32"
                y1="8"
                x2="32"
                y2="18"
                stroke="var(--color-bark)"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${deg} 32 32)`}
              />
            ))}
          </svg>
        </div>
      )}
    </motion.div>
  );
}
