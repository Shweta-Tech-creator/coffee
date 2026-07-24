import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [10, 25, 45, 62, 78, 91, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, 280 + Math.random() * 180);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 900);
        }, 400);
      }
    };
    setTimeout(tick, 400);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[var(--bg)] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Animated radial */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 70%)'
            }}
          />

          {/* Logo wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16 relative z-10"
          >
            <p className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.5em] uppercase mb-4">Est. 2016</p>
            <h1 className="font-display text-6xl sm:text-8xl text-[var(--text)] font-light tracking-tight leading-none">
              Bean Haven
            </h1>
            <p className="font-mono-custom text-[var(--primary)]/60 text-xs tracking-[0.4em] uppercase mt-3">Café & Roastery</p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-64 sm:w-80">
            <div className="h-px w-full bg-[var(--surface)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--highlight)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="font-mono-custom text-[var(--muted)] text-[10px] tracking-widest uppercase">Loading</span>
              <motion.span
                className="font-mono-custom text-[var(--primary)] text-[10px] tracking-widest"
                key={progress}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 font-mono-custom text-[var(--muted)] text-[10px] tracking-[0.4em] uppercase"
          >
            Brewing your experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
