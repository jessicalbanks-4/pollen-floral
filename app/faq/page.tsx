'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    label: 'Orders + Delivery',
    slug: 'orders',
    questions: [
      {
        q: 'How do I place an order?',
        a: "Choose your arrangement and pick a delivery date at checkout — that's really it. One thing to keep in mind: personal deliveries need at least 3 days' notice. If you're in a time crunch, we can still help, it just comes with a small rush fee.",
      },
      {
        q: 'What days do you deliver?',
        a: 'We deliver every day of the week, 8 AM to 5 PM, unless we note otherwise for a specific date.',
      },
      {
        q: 'Where do you deliver?',
        a: "We deliver throughout Nashville and the surrounding zip codes. If you're outside a 50-mile radius, just include your location on the inquiry form and we'll reach out to figure out the best next step.",
      },
      {
        q: 'Does someone need to be home for delivery?',
        a: "Yes, someone needs to be available to receive the arrangement. Flowers don't do well sitting on a porch in the Tennessee heat (or cold), so if no one's home, we won't be able to leave it. We'll do our best to coordinate a time that works — just let us know if there's a delivery window that's easier for the recipient.",
      },
    ],
  },
  {
    label: 'Personalization',
    slug: 'personalization',
    questions: [
      {
        q: 'Can I customize my order?',
        a: "Absolutely. If you have a color palette, favorite flower, or something you'd rather we leave out, just add it to the note section in your cart when you check out. We'll do our best to bring your vision to life within what's seasonally available.",
      },
    ],
  },
  {
    label: 'Events',
    slug: 'events',
    questions: [
      {
        q: 'Can we work together for my upcoming event?',
        a: "We'd love to! Fill out the inquiry form and tell us a bit about your vision. From there, we'll walk you through our process and get a call scheduled.",
      },
    ],
  },
  {
    label: 'Care & Handling',
    slug: 'care',
    questions: [
      {
        q: 'How do I keep my arrangement looking fresh?',
        a: 'Trim stems at a 45° angle every couple of days, keep the water clean and fresh, and place your arrangement away from direct sunlight, heat vents, and ripening fruit. Most of our arrangements last 5–10 days with proper care.',
      },
      {
        q: 'Do you include care instructions with orders?',
        a: "Yes — every order includes a card with care instructions specific to the blooms in your arrangement. Different flowers have different needs, and we'll tell you exactly what yours want.",
      },
      {
        q: 'Why are some of my flowers drooping after delivery?',
        a: "Some flowers experience travel stress and perk back up within a few hours once they're in fresh water and settled. If they haven't recovered after 24 hours, reach out and we'll troubleshoot with you.",
      },
    ],
  },
  {
    label: 'Payment, Changes & Cancellations',
    slug: 'payment',
    questions: [
      {
        q: 'Can I edit or cancel my order?',
        a: "Reach out as soon as possible if you need to make a change. We'll do our best to accommodate edits up to 48 hours before the delivery date. After that, we may have already sourced and begun preparing your arrangement.",
      },
      {
        q: 'What is your refund policy?',
        a: "Because flowers are perishable and arrangements are made to order, we don't offer refunds on completed work. If there's an issue with your order — damaged on delivery, wrong item, anything like that — reach out within 24 hours and we'll make it right.",
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards through our secure checkout. For larger event orders, we typically require a deposit to hold your date, with the remainder due before delivery.',
      },
      {
        q: 'Do you require a deposit for events?',
        a: 'Yes. Event bookings require a 30–50% deposit depending on the scope of work. This secures your date and lets us begin sourcing. Deposits are non-refundable but may be applied to a rescheduled date with sufficient notice.',
      },
    ],
  },
  {
    label: 'Wholesale & Corporate',
    slug: 'wholesale',
    questions: [
      {
        q: 'Do you work with businesses or offer repeat accounts?',
        a: "Yes — we work with offices, hotels, retail spaces, and other businesses that want recurring floral arrangements. If you're interested in a wholesale or corporate account, fill out the inquiry form and let us know the frequency and scale you're looking for.",
      },
    ],
  },
];

function QuestionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(245,240,232,0.08)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-8 py-7 text-left"
        aria-expanded={open}
      >
        <span
          style={{
            color: open ? 'var(--color-chartreuse)' : 'var(--color-cream)',
            transition: 'color 0.2s ease',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            lineHeight: 1.3,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: open ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.25)',
            fontSize: '1.4rem',
            flexShrink: 0,
            marginTop: '0.1rem',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease, color 0.2s ease',
            display: 'inline-block',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.85,
                fontSize: '1rem',
                paddingBottom: '2rem',
                maxWidth: '640px',
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ label, questions }: { label: string; questions: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="border-t"
      style={{ borderColor: 'rgba(245,240,232,0.12)', paddingTop: '3rem', marginBottom: '1rem' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 pb-6 text-left"
        aria-expanded={open}
      >
        <span
          className="label"
          style={{
            color: open ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.35)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            transition: 'color 0.2s ease',
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: open ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.2)',
            fontSize: '0.75rem',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease, color 0.2s ease',
            display: 'inline-block',
            letterSpacing: '0.1em',
          }}
          aria-hidden="true"
        >
          ▲
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="questions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '2rem' }}>
              {questions.map((item) => (
                <QuestionItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>

      {/* Hero heading */}
      <section
        className="site-px pb-24"
        style={{ borderBottom: '1px solid rgba(245,240,232,0.06)', paddingTop: '304px' }}
      >
        <div className="max-w-4xl">
          <motion.p
            className="label mb-4"
            style={{ color: 'rgba(212,218,108,0.5)', fontSize: '0.6rem' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.p>
          <motion.h1
            style={{
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Got<br />
            <span style={{ color: 'var(--color-chartreuse)' }}>Questions?</span>
          </motion.h1>
          <motion.p
            style={{
              color: 'rgba(245,240,232,0.38)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginTop: '2rem',
              maxWidth: '480px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Everything you need to know before you order, inquire, or just get curious about what we do.
          </motion.p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="site-px py-20 max-w-4xl">
        {categories.map((cat) => (
          <CategorySection key={cat.slug} label={cat.label} questions={cat.questions} />
        ))}
      </section>

      {/* Bottom CTA */}
      <section
        className="site-px py-24 border-t"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="label mb-3" style={{ color: 'rgba(212,218,108,0.45)', fontSize: '0.6rem' }}>
              Have another question?
            </p>
            <h2
              style={{
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textTransform: 'uppercase',
                lineHeight: 1.05,
              }}
            >
              We&apos;re happy<br />to help.
            </h2>
          </div>
          <a
            href="mailto:jessicalanebanks@gmail.com?subject=Question%20about%20Pollen%20Floral%20Studio"
            className="label inline-flex items-center gap-3 px-8 py-4 transition-opacity hover:opacity-80 shrink-0"
            style={{
              backgroundColor: 'var(--color-chartreuse)',
              color: 'var(--color-void)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
            }}
          >
            Send Us an Email →
          </a>
        </div>
      </section>
    </div>
  );
}
