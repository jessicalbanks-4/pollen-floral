'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';

const RUSH_FEE_2DAY = 35;
const RUSH_FEE_1DAY = 65;

// Returns the minimum selectable date string (YYYY-MM-DD) based on days offset
function dateString(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

function daysUntil(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function rushFeeFor(days: number): number {
  if (days === 1) return RUSH_FEE_1DAY;
  if (days === 2) return RUSH_FEE_2DAY;
  return 0;
}

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('product');
  const product = products.find((p) => p.id === productId);

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default first option values
  useEffect(() => {
    if (product?.options) {
      const defaults: Record<string, string> = {};
      product.options.forEach((opt) => { if (opt.values[0]) defaults[opt.name] = opt.values[0]; });
      setSelectedOptions(defaults);
    }
  }, [product]);

  if (!product || product.isInquiryOnly || !product.price) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-void)' }}>
        <div className="text-center">
          <p className="body-lg mb-6" style={{ color: 'rgba(245,240,232,0.5)' }}>Product not available for direct purchase.</p>
          <Link href="/contact" className="label" style={{ color: 'var(--color-chartreuse)' }}>Send an Inquiry →</Link>
        </div>
      </div>
    );
  }

  const days = deliveryDate ? daysUntil(deliveryDate) : null;
  const rushFee = days !== null ? rushFeeFor(days) : 0;
  const taxRate = 0.0975;
  const subtotal = product.price + rushFee;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDate) { setError('Please select a delivery date.'); return; }
    if (days !== null && days < 1) { setError('Same-day orders are not available.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, selectedOptions, deliveryDate, deliveryType }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(245,240,232,0.04)',
    border: '1px solid rgba(245,240,232,0.12)',
    color: 'var(--color-cream)',
    padding: '0.875rem 1rem',
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    color: 'rgba(245,240,232,0.4)',
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-body)',
    display: 'block',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>
      <div className="site-px max-w-5xl mx-auto pt-32 pb-24">

        {/* Back link */}
        <Link
          href={`/shop/${product.slug}`}
          className="label inline-flex items-center gap-2 mb-12 transition-opacity hover:opacity-60"
          style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem' }}
        >
          ← Back to {product.title}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.6rem' }}>
              Order Summary
            </p>
            <h1 className="display-sm mb-8" style={{ color: 'var(--color-cream)' }}>
              {product.title}
            </h1>

            {/* Options */}
            {product.options.length > 0 && (
              <div className="mb-8 flex flex-col gap-6">
                {product.options.map((opt) => (
                  <div key={opt.name}>
                    <p style={labelStyle}>{opt.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))}
                          className="label px-4 py-2 transition-all duration-200"
                          style={{
                            fontSize: '0.6rem',
                            border: '1px solid',
                            borderColor: selectedOptions[opt.name] === val
                              ? 'var(--color-chartreuse)'
                              : 'rgba(245,240,232,0.15)',
                            color: selectedOptions[opt.name] === val
                              ? 'var(--color-chartreuse)'
                              : 'rgba(245,240,232,0.45)',
                            background: 'transparent',
                            cursor: 'pointer',
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

            {/* Price breakdown */}
            <div
              className="flex flex-col gap-3 py-6 border-t border-b"
              style={{ borderColor: 'rgba(245,240,232,0.08)' }}
            >
              <div className="flex justify-between">
                <span className="body-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>{product.title}</span>
                <span className="body-sm" style={{ color: 'var(--color-cream)' }}>${product.price.toFixed(2)}</span>
              </div>
              {rushFee > 0 && (
                <div className="flex justify-between">
                  <span className="body-sm" style={{ color: 'var(--color-peach)' }}>
                    Rush Fee ({days === 1 ? 'Next-Day' : '2-Day'})
                  </span>
                  <span className="body-sm" style={{ color: 'var(--color-peach)' }}>+${rushFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="body-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>TN Sales Tax (9.75%)</span>
                <span className="body-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>${deliveryDate ? tax.toFixed(2) : '—'}</span>
              </div>
              <div className="flex justify-between pt-3 border-t" style={{ borderColor: 'rgba(245,240,232,0.08)' }}>
                <span className="label" style={{ color: 'var(--color-cream)' }}>Total</span>
                <span className="label" style={{ color: 'var(--color-cream)' }}>
                  {deliveryDate ? `$${total.toFixed(2)}` : '—'}
                </span>
              </div>
            </div>

            {/* Rush fee notice */}
            {days !== null && days <= 2 && days >= 1 && (
              <div
                className="mt-4 px-4 py-3"
                style={{ backgroundColor: 'rgba(239,170,155,0.08)', border: '1px solid rgba(239,170,155,0.2)' }}
              >
                <p className="body-sm" style={{ color: 'var(--color-peach)' }}>
                  <strong>Rush order:</strong> A ${rushFee} rush fee applies to{' '}
                  {days === 1 ? 'next-day' : '2-day'} delivery requests.
                  For best availability, we recommend ordering 3+ days in advance.
                </p>
              </div>
            )}
          </motion.div>

          {/* Right — delivery form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="label mb-4" style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.6rem' }}>
                Delivery Details
              </p>

              {/* Delivery vs pickup toggle */}
              <div className="flex gap-0 mb-6">
                {(['delivery', 'pickup'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDeliveryType(type)}
                    className="label flex-1 py-3 transition-all duration-200"
                    style={{
                      fontSize: '0.6rem',
                      backgroundColor: deliveryType === type ? 'var(--color-chartreuse)' : 'transparent',
                      color: deliveryType === type ? 'var(--color-void)' : 'rgba(245,240,232,0.4)',
                      border: '1px solid',
                      borderColor: deliveryType === type ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.12)',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                    }}
                  >
                    {type === 'delivery' ? 'Delivery' : 'Studio Pickup'}
                  </button>
                ))}
              </div>

              {/* Date picker */}
              <div className="mb-6">
                <label htmlFor="delivery-date" style={labelStyle}>
                  {deliveryType === 'delivery' ? 'Delivery Date' : 'Pickup Date'}
                </label>
                <input
                  id="delivery-date"
                  type="date"
                  required
                  value={deliveryDate}
                  min={dateString(1)}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
                {deliveryDate && days !== null && days >= 3 && (
                  <p className="mt-2 body-sm" style={{ color: 'rgba(212,218,108,0.6)' }}>
                    ✓ Standard lead time — no rush fee
                  </p>
                )}
                {deliveryDate && days !== null && days < 1 && (
                  <p className="mt-2 body-sm" style={{ color: 'var(--color-peach)' }}>
                    Same-day orders are not available. Please select a future date.
                  </p>
                )}
              </div>

              {deliveryType === 'pickup' && (
                <div
                  className="px-4 py-3 mb-2"
                  style={{ backgroundColor: 'rgba(212,218,108,0.06)', border: '1px solid rgba(212,218,108,0.15)' }}
                >
                  <p className="body-sm" style={{ color: 'rgba(245,240,232,0.55)' }}>
                    Pickup available at our East Nashville studio by appointment.
                    We'll confirm your pickup window by email after your order is placed.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <p className="body-sm" style={{ color: 'var(--color-peach)' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || (days !== null && days < 1)}
              className="label w-full py-5 transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{
                backgroundColor: 'var(--color-chartreuse)',
                color: 'var(--color-void)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Redirecting to payment…' : `Continue to Payment — $${deliveryDate ? total.toFixed(2) : product.price.toFixed(2)}`}
            </button>

            <p className="body-sm text-center" style={{ color: 'rgba(245,240,232,0.25)' }}>
              Secure checkout via Stripe. Your card details never touch our servers.
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}
