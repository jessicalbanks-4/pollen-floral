'use client';

export default function Marquee() {
  const words = [
    'Seasonal Blooms',
    '✦',
    'Editorial Design',
    '✦',
    'East Nashville',
    '✦',
    'Made By Hand',
    '✦',
    'Sculptural Movement',
    '✦',
    'No Filler. Ever.',
    '✦',
  ];

  const content = [...words, ...words];

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        backgroundColor: 'var(--color-chartreuse)',
        borderColor: 'var(--color-chartreuse)',
      }}
    >
      <div className="marquee-track flex whitespace-nowrap">
        {content.map((w, i) => (
          <span
            key={i}
            className="inline-block px-6 label"
            style={{
              color: 'var(--color-void)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
