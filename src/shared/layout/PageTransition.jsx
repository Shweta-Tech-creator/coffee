import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => {
  // We can use a 5-column wipe effect or a solid block wipe
  const anim = (variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants
  });

  const columns = 5;

  const expand = {
    initial: {
      top: 0
    },
    enter: (i) => ({
      top: '100%',
      transition: {
        duration: 0.5,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      }
    }),
    exit: (i) => ({
      top: 0,
      transition: {
        duration: 0.5,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      }
    })
  };

  const overlay = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.4, ease: 'linear', transitionEnd: { display: 'none' } }
    },
    exit: {
      display: 'block',
      opacity: 1,
      transition: { duration: 0.5, ease: 'linear' }
    }
  };

  useEffect(() => {
    // Force Lenis scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Cinematic Transition Curtains */}
      <div className="fixed inset-0 pointer-events-none z-[999] flex w-full h-screen">
        {[...Array(columns)].map((_, i) => {
          return (
            <motion.div
              key={i}
              custom={i}
              {...anim(expand)}
              className="relative w-full h-full bg-[#0E0C12] border-r border-[#C9A96E]/5"
            />
          );
        })}
      </div>
    </div>
  );
};
