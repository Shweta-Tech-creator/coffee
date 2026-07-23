import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ROASTS = [
  {
    level: 'Light Roast',
    temp: '196°C',
    color: '#D4A96A',
    flavor: 'Jasmine · Bergamot · Wild Strawberry',
    origin: 'Ethiopia Yirgacheffe (Guji Grade 1)',
    process: 'Natural Anaerobic Process',
    notes: 'Sparkling acidity with tea-like body, crisp citric notes, and delicate honeysuckle finish.',
    brew: 'V60 Pour Over / AeroPress',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
  },
  {
    level: 'Medium Roast',
    temp: '210°C',
    color: '#8B5E3C',
    flavor: 'Toasted Hazelnut · Brown Sugar · Peach',
    origin: 'Colombia Huila (Pink Bourbon)',
    process: 'Washed Extended Fermentation',
    notes: 'Velvety sweetness, balanced malic acidity, and rich caramelised pecan finish.',
    brew: 'Espresso / Syphon / French Press',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80'
  },
  {
    level: 'Dark Roast',
    temp: '224°C',
    color: '#3D1C0A',
    flavor: '70% Dark Chocolate · Cedar · Cinnamon',
    origin: 'Guatemala Antigua (Volcanic Estate)',
    process: 'Honey Processed',
    notes: 'Deep molasses sweetness, subtle campfire aroma, full-bodied heavy texture.',
    brew: 'Stovetop Moka / Cold Brew Concentrate',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80'
  }
];

export const RoastSlider = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const r = ROASTS[active];

  return (
    <section ref={ref} className="relative py-36 bg-[#08060A] border-t border-[#C9A96E]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Roast Chemistry</span>
            <div className="h-px w-10 bg-[#C9A96E]" />
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-[#EDE4D6] font-light">
            Master Roast <em className="text-[#C9A96E]">Profiles.</em>
          </h2>
        </motion.div>

        {/* Roast Selector Tabs */}
        <div className="flex justify-center gap-4 mb-14">
          {ROASTS.map((roast, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`font-mono-custom text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 border transition-all duration-300 ${
                active === i
                  ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A] font-bold shadow-[0_0_25px_rgba(201,169,110,0.25)]'
                  : 'border-[#C9A96E]/20 text-[#7A6F65] hover:text-[#EDE4D6] hover:border-[#C9A96E]/40'
              }`}
            >
              {roast.level} ({roast.temp})
            </button>
          ))}
        </div>

        {/* Selected Roast Showcase */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-12 border border-[#C9A96E]/20 bg-[#0E0C12] overflow-hidden"
        >
          <div className="lg:col-span-5 relative min-h-[400px] bg-[#120F18] flex items-center justify-center overflow-hidden">
            <img
              src={r.img}
              alt={r.level}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                // High reliability fallback
                e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0E0C12] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C12] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
              <span className="font-mono-custom text-[#C9A96E] text-xs tracking-widest">{r.temp} Internal Temp</span>
            </div>

            <h3 className="font-display text-4xl lg:text-5xl text-[#EDE4D6] font-light mb-6">{r.origin}</h3>

            <p className="text-[#9E9283] font-light text-lg leading-relaxed mb-8">{r.notes}</p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#C9A96E]/15">
              <div>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]">Flavor Spectrum</span>
                <p className="font-display text-xl text-[#EDE4D6] mt-1">{r.flavor}</p>
              </div>
              <div>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]">Recommended Brew</span>
                <p className="font-display text-xl text-[#EDE4D6] mt-1">{r.brew}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
