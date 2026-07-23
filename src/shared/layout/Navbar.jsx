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
          scrolled ? 'bg-[#08060A]/90 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl text-[#EDE4D6] font-light tracking-tight group-hover:text-[#C9A96E] transition-colors duration-300">
              Bean Haven
            </span>
            <span className="font-mono-custom text-[9px] text-[#C9A96E]/60 tracking-[0.35em] uppercase mt-0.5">
              Café & Roastery
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`underline-slide font-mono-custom text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                  pathname === path ? 'text-[#C9A96E]' : 'text-[#7A6F65] hover:text-[#EDE4D6]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#7A6F65] hover:text-[#C9A96E] transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C9A96E] text-[#08060A] text-[9px] font-bold font-mono-custom rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 text-[#7A6F65] hover:text-[#EDE4D6] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[99] bg-[#08060A] flex flex-col justify-center items-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-[#7A6F65] hover:text-[#EDE4D6]"
            >
              <X size={24} />
            </button>
            {navLinks.map(({ label, path }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={path}
                  className={`font-display text-4xl font-light transition-colors ${
                    pathname === path ? 'text-[#C9A96E]' : 'text-[#EDE4D6] hover:text-[#C9A96E]'
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
