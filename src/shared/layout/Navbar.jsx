import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../features/checkout/CartContext';

const navLinks = [
  { label: 'Our Story', path: '/story' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reserve', path: '/reservation' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCart();
  const { pathname } = useLocation();
  const cartCount = items.reduce((a, b) => a + b.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--primary)]/20 shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Enhanced Logo */}
          <Link to="/" className="group flex items-center gap-3">
            {/* Custom Bean Haven Logo Mark */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="19" fill="var(--primary)" stroke="var(--accent)" strokeWidth="1"/>
                <ellipse cx="20" cy="20" rx="9" ry="13" fill="#7C3F00" opacity="0.9" transform="rotate(-20 20 20)"/>
                <path d="M20 10 Q24 20 20 30" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              </svg>
            </div>
            
            {/* Brand Text */}
            <div className="leading-none">
              <span className="font-display text-xl font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-300 block">
                Bean Haven
              </span>
              <span className="font-mono-custom text-[9px] text-[var(--primary)]/80 tracking-[0.25em] uppercase font-semibold mt-0.5 block">
                Café & Roastery
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`font-mono-custom text-xs font-semibold tracking-wider uppercase transition-colors duration-200 pb-0.5 border-b-2 ${
                  pathname === path
                    ? 'text-[var(--primary)] border-[var(--primary)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)] border-transparent'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Enlarged Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors rounded-2xl hover:bg-[var(--surface)] group"
              aria-label="Open cart"
            >
              <ShoppingCart size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-[var(--primary)] text-white text-[11px] font-bold font-mono-custom rounded-full flex items-center justify-center px-1 shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2.5 text-[var(--muted)] hover:text-[var(--text)] transition-colors rounded-xl hover:bg-[var(--surface)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[var(--surface)] flex flex-col justify-center items-center gap-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-[var(--muted)] hover:text-[var(--text)] p-2"
            >
              <X size={24} />
            </button>
            
            {/* Logo inside mobile menu */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <circle cx="20" cy="20" r="19" fill="var(--primary)" />
                <ellipse cx="20" cy="20" rx="9" ry="13" fill="#7C3F00" opacity="0.9" transform="rotate(-20 20 20)"/>
                <path d="M20 10 Q24 20 20 30" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              </svg>
              <span className="font-display text-lg font-semibold text-[var(--text)]">Bean Haven</span>
            </div>
            
            {navLinks.map(({ label, path }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={path}
                  className={`font-display text-3xl font-light transition-colors ${
                    pathname === path ? 'text-[var(--primary)]' : 'text-[var(--text)] hover:text-[var(--primary)]'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
