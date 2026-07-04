'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Inquire' },
];

// Switch between inverse (white) logo on dark backgrounds and the brown logo on light ones.
// Drop /images/logo.png (brown version) in public/images/ to activate the light-mode swap.
function PollenLogo({ dark }: { dark: boolean }) {
  const src = dark ? '/images/transparent-logo.png' : '/images/brown-logo.png';
  return (
    <Link href="/" aria-label="Pollen Floral Studio" style={{ display: 'block', lineHeight: 0 }}>
      <Image
        src={src}
        alt="Pollen Floral Studio"
        width={80}
        height={80}
        priority
        style={{ width: 'clamp(64px, 8vw, 80px)', height: 'auto' }}
      />
    </Link>
  );
}

// Detect whether the element currently behind the navbar has a dark background.
// Samples the pixel at the top-center of the page using a hidden canvas.
// Falls back to true (dark) so the inverse logo is the safe default.
function useIsDarkBackground() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    function check() {
      // Walk up through elements at top-center to find a background-color
      const el = document.elementFromPoint(window.innerWidth / 2, 80);
      if (!el) return;
      let node: Element | null = el;
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [r, g, b] = [+match[1], +match[2], +match[3]];
          // Skip transparent/near-transparent
          if (r + g + b < 10 && bg.includes('0)')) { node = node.parentElement; continue; }
          // Relative luminance — dark if < 0.25
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          setIsDark(lum < 128);
          return;
        }
        node = node.parentElement;
      }
    }

    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return isDark;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const isDark = useIsDarkBackground();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled ? 'rgba(10,10,8,0.92)' : 'rgba(10,10,8,0.45)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
          borderBottomColor: scrolled ? 'rgba(245,240,232,0.06)' : 'transparent',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
      >
        <nav className="site-px max-w-7xl mx-auto h-16 flex items-center justify-between">
          <PollenLogo dark={isDark} />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label font-bold transition-opacity duration-200 hover:opacity-100"
                style={{ color: 'rgba(245,240,232,0.9)', letterSpacing: '0.18em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Instagram + hamburger */}
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/pollen_floral_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block label transition-opacity duration-200 hover:opacity-100"
              style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.6rem' }}
            >
              @pollen_floral_studio
            </a>

            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} style={{ color: 'var(--color-cream)' }} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: 'var(--color-void)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Chartreuse accent line */}
            <div style={{ height: '2px', backgroundColor: 'var(--color-chartreuse)', width: '100%' }} />

            <div className="flex items-center justify-between px-6 h-16">
              <PollenLogo dark={isDark} />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} style={{ color: 'var(--color-cream)' }} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[{ href: '/', label: 'Home' }, ...links].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduced ? { duration: 0 } : { delay: 0.15 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="display-md block py-3 border-b"
                    style={{
                      color: 'var(--color-cream)',
                      borderColor: 'rgba(245,240,232,0.08)',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <p className="label" style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.6rem' }}>
                @pollen_floral_studio · Nashville, TN
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
