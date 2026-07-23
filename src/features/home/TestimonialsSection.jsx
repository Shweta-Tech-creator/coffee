import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The most transcendent flat white I've had outside of Melbourne. The attention to extraction and milk texture is unparalleled.",
    author: "Marcus Webb",
    role: "Coffee Critic, The Brew Review",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
  },
  {
    quote: "Bean Haven isn't a café — it's a ritual. The moment you walk in, you understand that this is coffee taken seriously without taking itself too seriously.",
    author: "Léa Morel",
    role: "Founder, Nordic Food Magazine",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=120&q=80"
  },
  {
    quote: "I've visited over 200 speciality coffee shops worldwide. Bean Haven's pour over program is in the top five — globally. The Ethiopian Yirgacheffe is extraordinary.",
    author: "David Okafor",
    role: "SCA Judge & Sensory Analyst",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80"
  },
  {
    quote: "Every element is considered — the ceramics, the light, the music, the pacing of service. It's the kind of place that makes you want to slow down.",
    author: "Sophie Andersen",
    role: "Interior & Café Culture Blogger",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80"
  },
];

export const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = TESTIMONIALS[idx];

  const next = () => setIdx(i => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section ref={ref} className="relative py-36 bg-[#08060A] overflow-hidden">
      {/* Large decorative quote */}
      <div className="absolute top-20 left-10 font-display text-[300px] text-[#C9A96E]/3 leading-none select-none pointer-events-none">"</div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Reviews</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Navigation + dots */}
          <div className="lg:col-span-1 flex lg:flex-col items-center gap-4 order-last lg:order-first">
            <button onClick={prev} className="p-3 border border-[#C9A96E]/15 text-[#5A5040] hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-200">
              <ChevronLeft size={16} />
            </button>
            <div className="flex lg:flex-col gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`transition-all duration-300 ${
                    i === idx ? 'w-8 h-0.5 lg:w-0.5 lg:h-8 bg-[#C9A96E]' : 'w-2 h-0.5 lg:w-0.5 lg:h-2 bg-[#C9A96E]/20'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 border border-[#C9A96E]/15 text-[#5A5040] hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-200">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Quote */}
          <div className="lg:col-span-11">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="font-display text-3xl lg:text-4xl xl:text-5xl text-[#EDE4D6] font-light leading-[1.25] mb-12">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 overflow-hidden rounded-full border border-[#C9A96E]/20">
                    <img src={t.img} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-[#EDE4D6] text-base font-light">{t.author}</p>
                    <p className="font-mono-custom text-[9px] text-[#5A5040] tracking-widest uppercase mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
