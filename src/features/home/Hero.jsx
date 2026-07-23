import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const WORDS = ['Perfect', 'Transcendent', 'Obsessive', 'Artisanal'];

export const Hero = () => {
  const heroRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  // Parallax scale for the background
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

  // Animation variants for staggered text
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const letterVars = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)', rotateX: -40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
    }
  };

  const titleText = "Coffee.";

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#08060A] perspective-1000"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: yImg, scale: scaleImg }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08060A]/85 via-[#08060A]/70 to-[#08060A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08060A]/60 via-transparent to-[#08060A]/40" />
      </motion.div>

      {/* Gold grain overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full animate-pulse-glow pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 70%)',
          x: springX,
          y: springY
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center min-h-screen max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20 w-full"
        style={{ y: yText, opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8 sm:mb-12"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '3.5rem' }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            className="h-px bg-[#C9A96E]" 
          />
          <span className="font-mono-custom text-[#C9A96E] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase">
            Est. 2016 · Bean Haven Café
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-2 sm:mb-4 perspective-1000">
          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(3rem,12vw,9rem)] text-[#EDE4D6] font-light leading-[0.9] tracking-tight flex"
          >
            {titleText.split('').map((char, i) => (
              <motion.span key={i} variants={letterVars} className="origin-bottom">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-2 sm:mb-4 perspective-1000">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="font-display text-[clamp(3rem,12vw,9rem)] text-[#EDE4D6] font-light leading-[0.9] tracking-tight"
          >
            Made 
          </motion.div>
          
          <div className="flex-1 min-w-[200px] sm:min-w-[400px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIdx}
                initial={{ y: 50, opacity: 0, filter: 'blur(12px)', rotateX: -60, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, scale: 1 }}
                exit={{ y: -50, opacity: 0, filter: 'blur(12px)', rotateX: 60, scale: 0.9 }}
                transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="inline-block font-display text-[clamp(3rem,12vw,9rem)] font-light leading-[0.9] tracking-tight italic text-gold-gradient origin-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {WORDS[wordIdx]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Sub row */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8 sm:mt-12"
        >
          <p className="text-[#7A6F65] font-light text-sm sm:text-base leading-relaxed max-w-xs">
            Single-origin beans. Nordic-inspired pastries. A space designed for presence.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#menu"
              className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Menu
                <motion.span 
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >→</motion.span>
              </span>
            </a>
            <a
              href="/reservation"
              className="font-mono-custom text-[10px] tracking-[0.25em] uppercase text-[#7A6F65] hover:text-[#C9A96E] transition-colors duration-300 underline-slide"
            >
              Reserve a Table
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-wrap items-center gap-6 sm:gap-10 mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-[#C9A96E]/10"
        >
          {[['89+', 'SCA Score'], ['100%', 'Arabica'], ['12', 'Origins'], ['5.0★', 'Rating']].map(([val, label], idx) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 + (idx * 0.1) }}
            >
              <p className="font-display text-xl sm:text-2xl text-[#C9A96E] font-light">{val}</p>
              <p className="font-mono-custom text-[9px] text-[#4A4030] tracking-widest uppercase mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 right-10 z-10 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[#C9A96E]/50" />
        </motion.div>
        <div className="h-12 w-px bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
      </motion.div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
    </section>
  );
};
