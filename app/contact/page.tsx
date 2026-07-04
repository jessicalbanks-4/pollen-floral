'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PollenParticles from '@/components/ui/PollenParticles';

const eventTypes = [
  'A-la-carte Arrangement',
  'Wedding Florals',
  'Event / Activation',
  'The Pollen Bar',
  'Custom Concept',
  'Other',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    budget: '',
    message: '',
  });

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: 'transparent',
    borderColor: 'rgba(245,240,232,0.12)',
    color: 'var(--color-cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
  };

  const labelStyle = {
    color: 'rgba(245,240,232,0.4)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
  };

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>
      {/* Header */}
      <section className="site-px relative pt-32 pb-20 overflow-hidden border-b" style={{ borderColor: 'rgba(245,240,232,0.06)' }}>
        <PollenParticles count={35} />
        <div className="relative max-w-7xl mx-auto">
          <p className="label mb-3" style={{ color: 'rgba(212,218,108,0.5)' }}>Let&apos;s Work Together</p>
          <h1 className="display-lg" style={{ color: 'var(--color-cream)' }}>
            Tell us about<br />
            <span style={{ color: 'var(--color-chartreuse)' }}>your moment.</span>
          </h1>
        </div>
      </section>

      {/* Form + info */}
      <section className="site-px py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info column */}
          <div>
            <p className="body-lg mb-8" style={{ color: 'rgba(245,240,232,0.5)' }}>
              Whether you&apos;re planning a wedding, a brand moment, or just want flowers that feel like
              you — we&apos;d love to hear about it. Fill out the form and we&apos;ll be in touch within 48 hours.
            </p>

            <div className="flex flex-col gap-8">
              {[
                { label: 'Email', value: 'hello@pollenfloral.studio' },
                { label: 'Location', value: 'East Nashville, TN' },
                { label: 'Instagram', value: '@pollen_floral_studio' },
                { label: 'Availability', value: 'Typically 2–4 weeks out for arrangements. 3–6 months for weddings.' },
              ].map((item) => (
                <div key={item.label} className="border-b pb-8" style={{ borderColor: 'rgba(245,240,232,0.06)' }}>
                  <p className="label mb-1" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem' }}>
                    {item.label}
                  </p>
                  <p className="body-lg" style={{ color: 'rgba(245,240,232,0.65)' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-24">
                <div
                  className="w-16 h-px mb-8 mx-auto"
                  style={{ backgroundColor: 'var(--color-chartreuse)' }}
                />
                <h2 className="display-md mb-4" style={{ color: 'var(--color-cream)' }}>
                  We got it.
                </h2>
                <p className="body-lg" style={{ color: 'rgba(245,240,232,0.45)' }}>
                  We&apos;ll be in touch within 48 hours to talk through your vision.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={onChange}
                      required
                      className="border px-4 py-3 outline-none w-full"
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      className="border px-4 py-3 outline-none w-full"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Event type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventType" style={labelStyle}>What are you planning?</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={form.eventType}
                    onChange={onChange}
                    required
                    className="border px-4 py-3 outline-none w-full appearance-none"
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="" disabled style={{ backgroundColor: '#0a0a08' }}>Select one...</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t} style={{ backgroundColor: '#0a0a08' }}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Date + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" style={labelStyle}>Event Date (if known)</label>
                    <input
                      id="date"
                      name="date"
                      type="text"
                      placeholder="e.g. October 2025"
                      value={form.date}
                      onChange={onChange}
                      className="border px-4 py-3 outline-none w-full"
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" style={labelStyle}>Approximate Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={onChange}
                      className="border px-4 py-3 outline-none w-full appearance-none"
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0a0a08' }}>Select range...</option>
                      {['Under $100', '$100–$300', '$300–$750', '$750–$2,000', '$2,000–$5,000', '$5,000+', 'Not sure yet'].map((r) => (
                        <option key={r} value={r} style={{ backgroundColor: '#0a0a08' }}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" style={labelStyle}>Tell us about your vision</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    required
                    placeholder="Describe the vibe, the colors, the feeling you&apos;re going for..."
                    className="border px-4 py-3 outline-none w-full resize-none"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 label transition-opacity hover:opacity-80 mt-2"
                  style={{
                    backgroundColor: 'var(--color-chartreuse)',
                    color: 'var(--color-void)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Send Inquiry →
                </button>

                <p className="body-sm text-center" style={{ color: 'rgba(245,240,232,0.25)' }}>
                  We respond within 48 hours. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
