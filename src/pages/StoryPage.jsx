import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { CinematicStory } from '../features/roast-story/CinematicStory';
import { RoastSlider } from '../features/roast-story/RoastSlider';
import { CoffeeProcess } from '../features/roast-story/CoffeeProcess';

const FLAVOR_CATEGORIES = [
  { category: 'Floral & Citrus', notes: ['Jasmine', 'Bergamot', 'Lemon Zest', 'Orange Blossom'], color: '#E8CC8A' },
  { category: 'Fruit & Berry',   notes: ['Wild Strawberry', 'Blackberry', 'Peach', 'Red Apple'],  color: '#C86D51' },
  { category: 'Sweet & Nutty',   notes: ['Toasted Hazelnut', 'Brown Sugar', 'Pecan', 'Honey'],    color: '#C9A96E' },
  { category: 'Roasty & Chocolate', notes: ['70% Dark Chocolate', 'Cedar', 'Campfire Smoke', 'Molasses'], color: '#5C3A21' },
];

export const StoryPage = () => {
  return (
    <div className="bg-[#08060A] min-h-screen text-[#EDE4D6]">

      {/* ── CINEMATIC STORY EXPERIENCE ── */}
      <CinematicStory />

      {/* ── Interactive Roast Profiles ── */}
      <RoastSlider />

      {/* ── Flavor Chemistry Matrix ── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-3">Sensory Matrix</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-light">SCA Flavor Spectrum</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FLAVOR_CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[#0E0C12] border border-[#C9A96E]/20 p-6 sm:p-8 space-y-4 hover:border-[#C9A96E]/40 transition-colors"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <h3 className="font-display text-xl sm:text-2xl font-light text-[#EDE4D6]">{cat.category}</h3>
              <div className="space-y-2 pt-2 border-t border-[#C9A96E]/10 font-mono-custom text-xs text-[#7A6F65]">
                {cat.notes.map((note) => (
                  <p key={note} className="flex items-center gap-2">
                    <span className="text-[#C9A96E]">✦</span> {note}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Roast Profile Curve ── */}
      <section className="py-16 sm:py-28 px-5 sm:px-8 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">Thermal Rate of Rise</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">Maillard Phase & First Crack</h2>
            <p className="text-[#7A6F65] font-mono-custom text-xs leading-relaxed">
              Between 160°C and 200°C, amino acids and reducing sugars react to generate complex caramelization and floral esters. We monitor Rate of Rise (RoR) every 5 seconds to prevent baking or scorching.
            </p>
            <div className="space-y-3 font-mono-custom text-xs text-[#EDE4D6] pt-4">
              <p><span className="text-[#C9A96E]">Drying Phase:</span> 0 – 4:30 mins (Removal of moisture)</p>
              <p><span className="text-[#C9A96E]">Maillard Phase:</span> 4:30 – 8:15 mins (Flavor creation)</p>
              <p><span className="text-[#C9A96E]">First Crack:</span> 8:15 – 9:45 mins (Cellular expansion)</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 border border-[#C9A96E]/20 bg-[#0E0C12] space-y-6">
            <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-4">
              <span className="font-mono-custom text-xs text-[#C9A96E]">Probat 12kg Drum Roaster Log</span>
              <Thermometer size={16} className="text-[#C9A96E]" />
            </div>
            <div className="h-40 sm:h-48 flex items-end justify-between gap-1 sm:gap-2 pt-6">
              {[30, 45, 60, 75, 90, 110, 140, 175, 196, 210, 224].map((temp, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#8C7040] via-[#C9A96E] to-[#E8CC8A]"
                    style={{ height: `${(temp / 240) * 100}%` }}
                  />
                  <span className="font-mono-custom text-[7px] sm:text-[8px] text-[#5A5040]">{temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
