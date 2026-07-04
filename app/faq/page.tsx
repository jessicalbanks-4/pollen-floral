'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PollenParticles from '@/components/ui/PollenParticles';

const categories = [
  {
    label: 'Ordering & Arrangements',
    slug: 'ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'You can shop directly through our website for a-la-carte arrangements, or reach out via our inquiry form for weddings, events, and custom work. For in-stock items, just add to cart and check out. For everything else, we\'ll get back to you within 24–48 hours to talk through details.',
      },
      {
        q: 'How far in advance do I need to order?',
        a: 'For standard arrangements, we recommend at least 48–72 hours notice. For weddings and large events, 3–6 months is ideal — the earlier, the better for sourcing exactly what we envision. Rush orders may be possible depending on availability, so don\'t hesitate to reach out.',
      },
      {
        q: 'Can I customize an arrangement?',
        a: 'Absolutely. All of our work is made to order, so there\'s always room for customization — color palette, size, vibe, specific blooms. Use the inquiry form and tell us what you\'re going for. The more context you give us, the better.',
      },
      {
        q: 'Do you offer subscriptions?',
        a: 'Yes — our monthly bouquet subscription puts fresh, seasonal arrangements on your calendar without you having to think about it. Each month is different, always in season, always Pollen. Reach out through the inquiry form to get on the list.',
      },
    ],
  },
  {
    label: 'Delivery & Pickup',
    slug: 'delivery',
    questions: [
      {
        q: 'Do you offer delivery?',
        a: 'Yes, we deliver within the Nashville metro area. Delivery fees vary by distance and will be calculated at checkout or quoted during the inquiry process for larger orders. We take care with every piece to make sure it arrives exactly as designed.',
      },
      {
        q: 'Can I pick up my order?',
        a: 'Yes — local pickup is available by appointment at our East Nashville studio. You\'ll receive a confirmation with the address and pickup window once your order is confirmed.',
      },
      {
        q: 'What if no one is home for delivery?',
        a: 'We\'ll leave arrangements in a safe, shaded spot if possible and send you a photo confirmation. For high-value orders or perishable pieces, we may attempt to reschedule rather than leave unattended — we\'ll always communicate before making that call.',
      },
    ],
  },
  {
    label: 'Pricing & Payment',
    slug: 'pricing',
    questions: [
      {
        q: 'How is pricing determined for custom work?',
        a: 'Custom work is priced based on bloom selection, scale, complexity, and labor. After your inquiry, we\'ll send a detailed quote before any commitment. We\'re transparent about costs upfront — no surprises.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards through our secure checkout. For larger orders and events, we typically require a deposit to hold your date, with the remainder due before delivery or installation.',
      },
      {
        q: 'Do you require a deposit for events?',
        a: 'Yes. Event bookings require a 30–50% deposit depending on the scope of work. This secures your date and lets us begin sourcing. Deposits are non-refundable but may be applied to a rescheduled date with sufficient notice.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Because flowers are perishable and arrangements are made to order, we don\'t offer refunds on completed work. If there\'s an issue with your order — damaged on delivery, wrong item, anything like that — reach out within 24 hours and we\'ll make it right.',
      },
    ],
  },
  {
    label: 'Weddings & Events',
    slug: 'events',
    questions: [
      {
        q: 'Do you do full wedding floral packages?',
        a: 'Yes — from bridal bouquets to ceremony installations to reception centerpieces. We approach weddings the same way we approach everything: with a clear aesthetic point of view and zero filler. Reach out early, as our wedding calendar fills quickly.',
      },
      {
        q: 'What is The Pollen Bar?',
        a: 'The Pollen Bar is our interactive floral experience — guests choose their stems and our team assembles custom bouquets on the spot, wrapped in signature Pollen paper. It\'s a statement piece for weddings, brand activations, and any event that deserves more than a basic setup. Starting at $1,000.',
      },
      {
        q: 'Can you work within a tight event budget?',
        a: 'We can be creative with constraints. Tell us your number and we\'ll tell you what\'s possible. We\'d rather have that conversation upfront than have you guess. Our job is to make the most of what you\'ve got.',
      },
      {
        q: 'Do you travel for destination events?',
        a: 'For the right project, yes. Travel and logistics fees apply, and we\'d need to plan further in advance. Get in touch and let\'s talk about it.',
      },
    ],
  },
  {
    label: 'Care & Longevity',
    slug: 'care',
    questions: [
      {
        q: 'How do I keep my arrangement looking fresh?',
        a: 'Trim stems at a 45° angle every couple of days, keep water clean and fresh, and place your arrangement away from direct sunlight, heat vents, and ripening fruit. Most of our arrangements last 5–10 days with proper care.',
      },
      {
        q: 'Do you include care instructions with orders?',
        a: 'Yes — every order includes a card with care instructions specific to the blooms in your arrangement. Different flowers have different needs, and we\'ll tell you exactly what yours want.',
      },
      {
        q: 'Why are some of my flowers drooping after delivery?',
        a: 'Some flowers experience "travel stress" — they perk back up within a few hours once they\'re in fresh water and settled. If they haven\'t recovered after 24 hours, reach out and we\'ll troubleshoot with you.',
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(245,240,232,0.07)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span
          className="display-sm"
          style={{
            color: open ? 'var(--color-chartreuse)' : 'var(--color-cream)',
            transition: 'color 0.2s ease',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            lineHeight: 1.2,
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: open ? 'var(--color-chartreuse)' : 'rgba(245,240,232,0.3)',
            fontSize: '1.2rem',
            lineHeight: 1,
            flexShrink: 0,
            marginTop: '0.15rem',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease, color 0.2s ease',
            display: 'inline-block',
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
              className="body-lg pb-6 max-w-2xl"
              style={{ color: 'rgba(245,240,232,0.55)', lineHeight: 1.75 }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);
  const current = categories.find((c) => c.slug === activeCategory)!;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-void)', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        className="relative pt-72 pb-20 px-6 md:px-10 overflow-hidden border-b"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <PollenParticles count={25} />
        <div className="relative max-w-7xl mx-auto">
          <motion.p
            className="label mb-3"
            style={{ color: 'rgba(212,218,108,0.55)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Got Questions
          </motion.p>
          <motion.h1
            className="display-lg mb-6"
            style={{ color: 'var(--color-cream)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            We've Got Answers.
          </motion.h1>
          <motion.p
            className="body-lg max-w-lg"
            style={{ color: 'rgba(245,240,232,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Everything you need to know before you order, inquire, or just get curious about what we do.
          </motion.p>
        </div>
      </section>

      {/* Category nav + content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">

          {/* Sticky category sidebar */}
          <aside className="md:w-56 shrink-0">
            <div className="md:sticky md:top-28 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className="shrink-0 text-left px-3 py-2 label transition-all duration-200"
                  style={{
                    fontSize: '0.62rem',
                    color: activeCategory === cat.slug
                      ? 'var(--color-chartreuse)'
                      : 'rgba(245,240,232,0.3)',
                    borderLeft: '2px solid',
                    borderColor: activeCategory === cat.slug
                      ? 'var(--color-chartreuse)'
                      : 'transparent',
                    background: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Questions */}
          <div ref={contentRef} className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p className="label mb-8" style={{ color: 'rgba(212,218,108,0.45)', fontSize: '0.6rem' }}>
                  {current.label}
                </p>
                <div>
                  {current.questions.map((item) => (
                    <AccordionItem key={item.q} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section
        className="px-6 md:px-10 py-24 border-t"
        style={{ borderColor: 'rgba(245,240,232,0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="label mb-3" style={{ color: 'rgba(212,218,108,0.45)' }}>
              Still have questions?
            </p>
            <h2 className="display-md" style={{ color: 'var(--color-cream)' }}>
              Just ask us directly.
            </h2>
          </div>
          <Link
            href="/contact"
            className="label inline-flex items-center gap-3 px-8 py-4 transition-opacity hover:opacity-80 shrink-0"
            style={{
              backgroundColor: 'var(--color-chartreuse)',
              color: 'var(--color-void)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
            }}
          >
            Send an Inquiry →
          </Link>
        </div>
      </section>
    </div>
  );
}
