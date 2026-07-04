'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

const FlowerIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    style={{ opacity: 0.25 }}
  >
    <circle cx="24" cy="24" r="5" fill="var(--color-bark)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse
        key={deg}
        cx="24"
        cy="12"
        rx="4"
        ry="7"
        fill="var(--color-bark)"
        transform={`rotate(${deg} 24 24)`}
      />
    ))}
  </svg>
);

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const reduced = useReducedMotion();

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  return (
    <motion.div
      className="relative bg-white group cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={reduced ? {} : { boxShadow: '0 12px 40px rgba(98,82,50,0.12)' }}
      transition={{ duration: 0.3 }}
    >
      {product.badge && (
        <span
          className="absolute top-3 left-3 z-10 label px-2 py-1"
          style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-bark)' }}
        >
          {product.badge}
        </span>
      )}

      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '1/1', backgroundColor: 'var(--color-chartreuse-light)' }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={reduced ? {} : { scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        >
          <FlowerIcon />
        </motion.div>

        {/* Add to Cart overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ y: reduced ? 0 : '100%', opacity: reduced ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduced ? 0 : '100%', opacity: reduced ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bottom-0 left-0 right-0 py-3 label text-center cursor-pointer"
              style={{ backgroundColor: 'var(--color-chartreuse)', color: 'var(--color-bark)' }}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="label mb-1" style={{ color: 'var(--color-bark-light)' }}>
          {product.category}
        </p>
        <h3 className="font-medium mb-1" style={{ fontFamily: 'var(--font-body)' }}>
          {product.name}
        </h3>
        <p className="label font-bold" style={{ color: 'var(--color-bark)' }}>
          {product.priceLabel}
        </p>
      </div>
    </motion.div>
  );
}
