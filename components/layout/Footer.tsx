import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t px-6 md:px-10 py-16"
      style={{
        backgroundColor: 'var(--color-void)',
        borderColor: 'rgba(245,240,232,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Pollen
            </p>
            <p className="body-sm" style={{ color: 'rgba(245,240,232,0.4)', maxWidth: '24ch' }}>
              Boutique floral studio. East Nashville, TN. Making flowers the whole point since day one.
            </p>
          </div>

          <div>
            <p className="label mb-5" style={{ color: 'rgba(245,240,232,0.3)' }}>Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Inquire' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="body-sm transition-opacity duration-200 hover:opacity-100"
                  style={{ color: 'rgba(245,240,232,0.5)' }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label mb-5" style={{ color: 'rgba(245,240,232,0.3)' }}>Find Us</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/pollen_floral_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="body-sm transition-opacity hover:opacity-100"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                @pollen_floral_studio
              </a>
              <span className="body-sm" style={{ color: 'rgba(245,240,232,0.3)' }}>East Nashville, TN</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t"
          style={{ borderColor: 'rgba(245,240,232,0.06)' }}
        >
          <p className="label" style={{ color: 'rgba(245,240,232,0.2)', fontSize: '0.6rem' }}>
            © {new Date().getFullYear()} Pollen Floral Studio. All rights reserved.
          </p>
          <p className="label" style={{ color: 'rgba(212,218,108,0.35)', fontSize: '0.6rem' }}>
            Nashville&apos;s Studio Florist
          </p>
        </div>
      </div>
    </footer>
  );
}
