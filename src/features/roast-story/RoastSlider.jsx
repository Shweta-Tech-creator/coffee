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
    <section ref={ref} className="relative py-36 bg-[var(--bg)] border-t border-[var(--primary)]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[var(--primary)]" />
            <span className="font-mono-custom text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase">Roast Chemistry</span>
            <div className="h-px w-10 bg-[var(--primary)]" />
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-[var(--text)] font-light">
            Master Roast <em className="text-[var(--primary)]">Profiles.</em>
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
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--bg)] font-bold shadow-[0_0_25px_rgba(201,169,110,0.25)]'
                  : 'border-[var(--primary)]/20 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/40'
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
          className="grid lg:grid-cols-12 border border-[var(--primary)]/20 bg-[var(--surface)] overflow-hidden"
        >
          <div className="lg:col-span-5 relative min-h-[400px] bg-[var(--surface)] flex items-center justify-center overflow-hidden">
            <img
              src={r.img}
              alt={r.level}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                // High reliability fallback
                e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--surface)] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
              <span className="font-mono-custom text-[var(--primary)] text-xs tracking-widest">{r.temp} Internal Temp</span>
            </div>

            <h3 className="font-display text-4xl lg:text-5xl text-[var(--text)] font-light mb-6">{r.origin}</h3>

            <p className="text-[var(--muted)] font-light text-lg leading-relaxed mb-8">{r.notes}</p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--primary)]/15">
              <div>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]">Flavor Spectrum</span>
                <p className="font-display text-xl text-[var(--text)] mt-1">{r.flavor}</p>
              </div>
              <div>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]">Recommended Brew</span>
                <p className="font-display text-xl text-[var(--text)] mt-1">{r.brew}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
