import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const WORDS = ['Artisanal', 'Refined', 'Single-Origin', 'Sensory'];

export const Hero = () => {
  const heroRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const handleMouse = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };
  
  const springX = useSpring(mousePos.x, { stiffness: 40, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 40, damping: 20 });

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{ y: yImg, scale: scaleImg }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85')` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,14,20,0.92) 0%, rgba(10,14,20,0.75) 40%, rgba(10,14,20,0.95) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,14,20,0.85) 0%, transparent 50%, rgba(10,14,20,0.60) 100%)' }} />
      </motion.div>

      {/* Warm Amber Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.15) 0%, transparent 70%)',
          x: springX,
          y: springY
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center min-h-screen max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 w-full pt-12"
        style={{ y: yText, opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <span className="h-px w-10 bg-[var(--primary)]" />
          <span className="font-mono-custom text-[var(--primary)] text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold min-w-0 break-words">
            Est. 2016 · Bean Haven Café
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-display text-[clamp(2.75rem,9vw,7.5rem)] text-[var(--text)] font-light leading-[0.95] tracking-tight"
          >
            Coffee.
          </motion.h1>
        </div>

        <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-[clamp(2.75rem,9vw,7.5rem)] text-[var(--text)] font-light leading-[0.95] tracking-tight"
          >
            Made
          </motion.span>
          
          <div className="flex-1 min-w-[200px] sm:min-w-[400px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIdx}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-block font-display text-[clamp(2.75rem,9vw,7.5rem)] font-light leading-[0.95] tracking-tight italic"
                style={{ color: 'var(--primary)' }}
              >
                {WORDS[wordIdx]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtitle & Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6"
        >
          <p className="text-[var(--muted)] font-light text-sm sm:text-base leading-relaxed max-w-sm">
            Single-origin roasts, handcrafted pastries, and a minimalist space designed for presence.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--primary)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs font-bold hover:bg-[var(--accent)] transition-all shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 hover:-translate-y-0.5"
            >
              Explore Menu <ArrowRight size={14} />
            </a>
            <a
              href="/reservation"
              className="px-6 py-3.5 bg-[var(--surface)] border border-[var(--primary)]/30 text-[var(--text)] rounded-2xl font-mono-custom text-xs font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md transition-all"
            >
              Reserve a Table
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center gap-10 sm:gap-16 lg:gap-20 mt-14 pt-10 border-t border-[var(--primary)]/20"
        >
          {[['89+', 'SCA Score'], ['100%', 'Arabica'], ['12', 'Origins'], ['5.0★', 'Rating']].map(([val, label]) => (
            <div key={label}>
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--primary)] font-semibold">{val}</p>
              <p className="font-mono-custom text-[11px] sm:text-xs text-[var(--muted)] tracking-[0.2em] uppercase mt-1.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 right-10 z-10 flex-col items-center gap-2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[var(--primary)]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};
