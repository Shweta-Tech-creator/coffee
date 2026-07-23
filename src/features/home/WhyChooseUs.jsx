import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Flame, Sparkles, Wind, Heart, MapPin } from 'lucide-react';

const REASONS = [
  {
    icon: Leaf,
    title: 'Direct Trade Sourcing',
    desc: 'We partner directly with farmers in Ethiopia, Colombia, and Guatemala — paying up to 3x Fair Trade minimums.'
  },
  {
    icon: Flame,
    title: 'In-House Drum Roasting',
    desc: 'Our 12kg Probat roaster allows complete manual profile control, coaxing out peak floral and berry nuances.'
  },
  {
    icon: Sparkles,
    title: 'Refractometer Dialing',
    desc: 'Every morning, our lead baristas calibrate grind and TDS levels down to ±0.1g for flawless extraction.'
  },
  {
    icon: Wind,
    title: 'Nordic Hygge Haven',
    desc: 'Crafted with natural oak, warm ambient lighting, soft acoustic lining, and serene minimalist aesthetics.'
  },
  {
    icon: Heart,
    title: 'Artisan Micro-Bakehouse',
    desc: 'House-fermented 48-hour sourdough, twice-baked almond croissants, and cardamom buns made every dawn.'
  },
  {
    icon: MapPin,
    title: 'Seasonal Micro-Lots',
    desc: 'Constantly evolving coffee offerings that mirror global harvest calendars for peak sweetness.'
  }
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-us" ref={ref} className="relative py-36 bg-[#0B090F] overflow-hidden border-t border-[#C9A96E]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Why Bean Haven</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl text-[#EDE4D6] font-light leading-[1.05]">
              An Uncompromising<br />
              <em className="text-[#C9A96E]">Standard of Excellence.</em>
            </h2>
          </div>
          <p className="text-[#7A6F65] font-light text-base max-w-md leading-relaxed">
            From green bean selection to acoustic atmosphere, every nuance is engineered for total sensory harmony.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A96E]/10">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-[#0B090F] p-10 group relative hover:bg-[#120F18] transition-colors duration-500 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center mb-8 text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#08060A] transition-all duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-2xl text-[#EDE4D6] font-light mb-3">{title}</h3>
                <p className="font-mono-custom text-[11px] text-[#7A6F65] leading-relaxed">{desc}</p>
              </div>

              <div className="mt-8 h-px w-0 bg-[#C9A96E] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
