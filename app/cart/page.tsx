import Link from 'next/link';

export default function CartPage() {
  return (
    <div
      className="min-h-screen pt-32 px-6 md:px-10 flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: 'var(--color-void)' }}
    >
      <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.5)' }}>Cart</p>
      <h1 className="display-md mb-6" style={{ color: 'var(--color-cream)' }}>
        Your cart is empty.
      </h1>
      <p className="body-lg mb-10" style={{ color: 'rgba(245,240,232,0.4)' }}>
        Let&apos;s fix that.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-3 px-8 py-4 label"
        style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-void)', fontSize: '0.65rem', letterSpacing: '0.18em' }}
      >
        Browse the Shop →
      </Link>
    </div>
  );
}
