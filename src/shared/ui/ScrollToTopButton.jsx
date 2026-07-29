import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-[5.5rem] z-[201] w-11 h-11 rounded-full bg-[var(--surface)] shadow-lg border border-[var(--primary)]/30 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[var(--bg)] text-[var(--primary)] text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-[var(--primary)]/30">
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
