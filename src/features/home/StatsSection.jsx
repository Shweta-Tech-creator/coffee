import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 2400, label: 'Cups Served Daily', suffix: '+' },
  { value: 12, label: 'Origins Sourced', suffix: '' },
  { value: 89, label: 'SCA Score', suffix: '+' },
  { value: 8, label: 'Years of Craft', suffix: '' },
];

const Counter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = duration / value;
    let current = 0;
    const timer = setInterval(() => {
      current += Math.ceil(value / 80);
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="ticker font-display text-6xl lg:text-7xl xl:text-8xl text-[var(--primary)] font-light">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-32 bg-[var(--bg)] overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-[var(--primary)]/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--primary)]/8"
        >
          {STATS.map(({ value, label, suffix }, i) => (
            <motion.div
              key={i}
              className="bg-[var(--bg)] px-10 py-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Counter value={value} suffix={suffix} inView={isInView} />
              <p className="font-mono-custom text-[10px] text-[var(--muted)] tracking-[0.35em] uppercase mt-4">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
