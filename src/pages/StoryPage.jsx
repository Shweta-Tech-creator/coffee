import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { CinematicStory } from '../features/roast-story/CinematicStory';
import { RoastSlider } from '../features/roast-story/RoastSlider';

const FLAVOR_CATEGORIES = [
  { category: 'Floral & Citrus', notes: ['Jasmine', 'Bergamot', 'Lemon Zest', 'Orange Blossom'], color: 'var(--highlight)' },
  { category: 'Fruit & Berry',   notes: ['Wild Strawberry', 'Blackberry', 'Peach', 'Red Apple'],  color: 'var(--accent)' },
  { category: 'Sweet & Nutty',   notes: ['Toasted Hazelnut', 'Brown Sugar', 'Pecan', 'Honey'],    color: 'var(--accent)' },
  { category: 'Roasty & Chocolate', notes: ['70% Dark Chocolate', 'Cedar', 'Campfire Smoke', 'Molasses'], color: '#9C5821' },
];

export const StoryPage = () => {
  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text)]">
      {/* Cinematic Story Experience */}
      <CinematicStory />

      {/* Interactive Roast Profiles */}
      <RoastSlider />

      {/* Flavor Chemistry Matrix */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="text-center mb-12">
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Sensory Matrix</span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[var(--text)]">SCA Flavor Spectrum</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVOR_CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--surface)] border border-[var(--primary)]/15 rounded-2xl p-6 space-y-4 hover:border-[var(--primary)]/35 hover:shadow-md transition-all shadow-sm"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <h3 className="font-display text-xl font-medium text-[var(--text)]">{cat.category}</h3>
              <div className="space-y-2 pt-2 border-t border-[var(--primary)]/10 font-mono-custom text-xs text-[var(--muted)]">
                {cat.notes.map((note) => (
                  <p key={note} className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">✦</span> {note}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roast Profile Curve */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block">Thermal Rate of Rise</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Maillard Phase & First Crack</h2>
            <p className="text-[var(--muted)] font-light text-sm leading-relaxed">
              Between 160°C and 200°C, amino acids react to generate caramelization and floral notes. We log Rate of Rise to ensure roast precision.
            </p>
            <div className="space-y-2 font-mono-custom text-xs text-[var(--text)] pt-2">
              <p><span className="text-[var(--accent)] font-semibold">Drying Phase:</span> 0 – 4:30 mins</p>
              <p><span className="text-[var(--accent)] font-semibold">Maillard Phase:</span> 4:30 – 8:15 mins</p>
              <p><span className="text-[var(--accent)] font-semibold">First Crack:</span> 8:15 – 9:45 mins</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 border border-[var(--accent)]/20 bg-[var(--surface)] rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--accent)]/15 pb-4">
              <span className="font-mono-custom text-xs text-[var(--accent)] font-semibold">Probat 12kg Drum Roaster Log</span>
              <Thermometer size={16} className="text-[var(--accent)]" />
            </div>
            <div className="h-40 flex items-end justify-between gap-1 sm:gap-2 pt-4">
              {[30, 45, 60, 75, 90, 110, 140, 175, 196, 210, 224].map((temp, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full bg-gradient-to-t from-[#9C5821] via-[var(--accent)] to-[var(--highlight)] rounded-t-sm"
                    style={{ height: `${(temp / 240) * 100}%` }}
                  />
                  <span className="font-mono-custom text-[9px] text-[var(--muted)]">{temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
