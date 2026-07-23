import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" ref={ref} className="relative py-36 overflow-hidden bg-[#08060A]">
      {/* Accent line top */}
      <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#C9A96E]/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[#C9A96E]/30" />

            <div className="overflow-hidden aspect-[3/4] relative">
              <motion.img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85"
                alt="Bean Haven Café interior"
                className="w-full h-full object-cover"
                style={{ y: imgY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08060A]/50 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-8 -right-6 glass p-6 max-w-[180px]"
            >
              <p className="font-display text-5xl text-[#C9A96E] font-light">8+</p>
              <p className="font-mono-custom text-[9px] text-[#5A5040] tracking-widest uppercase mt-1">Years of Craft</p>
              <div className="mt-3 h-px bg-[#C9A96E]/20" />
              <p className="font-mono-custom text-[9px] text-[#5A5040] tracking-widest uppercase mt-2">Since 2016</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Our Story</span>
              </div>

              <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl text-[#EDE4D6] font-light leading-[1.05] mb-10">
                Where Every Cup<br />
                <em className="text-[#C9A96E]">Carries a Story.</em>
              </h2>

              <div className="space-y-5 text-[#6A6055] font-light leading-relaxed text-base">
                <p>
                  Bean Haven was born from a singular obsession: finding and serving the world's most remarkable coffees. We opened in 2016 in a converted Victorian warehouse — a space where Nordic minimalism meets the warmth of a proper café.
                </p>
                <p>
                  Our roasters travel twice yearly to origin — Ethiopia's misty highlands, Colombia's cloud forests, Guatemala's volcanic slopes — selecting only the top 5% of each harvest. Back home, every batch is roasted in-house on our custom Probat drum, dialing in profiles over weeks of obsessive tasting.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <a
                  href="/about"
                  className="group flex items-center gap-3 font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] hover:text-[#E8CC8A] transition-colors"
                >
                  Read our story
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </a>
                <div className="h-px flex-1 bg-[#C9A96E]/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
