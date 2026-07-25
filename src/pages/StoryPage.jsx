import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
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

      {/* Awards & Certifications */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 space-y-3"
        >
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block">Recognition</span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[var(--text)]">
            Awards & <span className="text-[var(--primary)] italic">Certifications</span>
          </h2>
          <p className="text-[var(--muted)] font-light text-sm max-w-xl mx-auto leading-relaxed">
            Our commitment to craft has been recognised by the world's leading coffee authorities and sustainability bodies.
          </p>
        </motion.div>

        {/* Top Award Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              year: '2024',
              title: 'World Coffee Championship',
              subtitle: 'Top 3 Finalist — Roaster Category',
              icon: '🏆',
              color: '#C9A96E',
              desc: 'Recognised among the top 3 specialty roasters globally at the WCC Stockholm finals.',
            },
            {
              year: '2023',
              title: 'SCA Gold Standard',
              subtitle: 'Score: 92 / 100',
              icon: '☕',
              color: '#B8935A',
              desc: 'Our Ethiopia Yirgacheffe received a 92-point cup score by certified Q-graders.',
              score: 92,
            },
            {
              year: '2023',
              title: 'Great Taste Award',
              subtitle: '3-Star Gold — Specialty Espresso',
              icon: '⭐',
              color: '#D4A843',
              desc: 'The highest honour from the Guild of Fine Food, awarded for exceptional flavour complexity.',
            },
          ].map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative bg-[var(--surface)] border border-[var(--primary)]/15 rounded-3xl p-7 space-y-4 shadow-md hover:shadow-xl hover:shadow-[var(--primary)]/10 hover:border-[var(--primary)]/35 transition-all group overflow-hidden"
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl"
                style={{ backgroundColor: award.color }}
              />
              <div className="flex items-start justify-between">
                <span className="text-3xl">{award.icon}</span>
                <span
                  className="font-mono-custom text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{ color: award.color, borderColor: `${award.color}40`, backgroundColor: `${award.color}12` }}
                >
                  {award.year}
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[var(--text)] leading-tight">{award.title}</h3>
                <p className="font-mono-custom text-xs font-semibold mt-1" style={{ color: award.color }}>{award.subtitle}</p>
              </div>
              {award.score && (
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono-custom text-[10px] text-[var(--muted)]">
                    <span>SCA Cup Score</span><span className="font-bold" style={{ color: award.color }}>{award.score}/100</span>
                  </div>
                  <div className="h-1.5 bg-[var(--primary)]/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${award.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${award.color}, #FFD700)` }}
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-[var(--muted)] font-light leading-relaxed">{award.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[var(--surface)] border border-[var(--primary)]/15 rounded-3xl p-8"
        >
          <p className="font-mono-custom text-xs uppercase tracking-[0.2em] text-[var(--primary)] font-semibold text-center mb-8">Certifications & Standards</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { badge: '🌿', name: 'Rainforest Alliance', desc: "All our farms meet the Rainforest Alliance's rigorous environmental and social standards.", year: 'Certified Since 2019' },
              { badge: '✅', name: 'Fair Trade Certified', desc: '100% of our single-origin lots are purchased above Fair Trade minimum price floors.', year: 'Certified Since 2020' },
              { badge: '🌍', name: 'B Corp Certified', desc: 'We meet the highest standards of verified social and environmental performance.', year: 'Certified Since 2022' },
            ].map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-5 border border-[var(--primary)]/10 rounded-2xl bg-[var(--bg)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
              >
                <span className="text-2xl mt-0.5">{cert.badge}</span>
                <div className="space-y-1">
                  <h4 className="font-display text-base font-semibold text-[var(--text)]">{cert.name}</h4>
                  <p className="font-mono-custom text-[10px] text-[var(--primary)] font-semibold">{cert.year}</p>
                  <p className="text-xs text-[var(--muted)] font-light leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
