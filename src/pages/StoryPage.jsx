import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coffee, Star, Leaf, BadgeCheck, Globe, Award, Sparkles } from 'lucide-react';
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
      <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-3"
        >
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block">Recognition</span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[var(--text)]">
            Awards & <span className="text-[var(--primary)] italic font-semibold">Certifications</span>
          </h2>
          <p className="text-[var(--muted)] font-light text-sm max-w-xl mx-auto leading-relaxed">
            Our commitment to craft has been recognised by the world&apos;s leading coffee authorities and sustainability bodies.
          </p>
        </motion.div>

        {/* Top Award Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              year: '2024',
              title: 'World Coffee Championship',
              subtitle: 'Top 3 Finalist — Roaster Category',
              Icon: Trophy,
              color: '#C9A96E',
              desc: 'Recognised among the top 3 specialty roasters globally at the WCC Stockholm finals.',
            },
            {
              year: '2023',
              title: 'SCA Gold Standard',
              subtitle: 'Score: 92 / 100',
              Icon: Coffee,
              color: '#B8935A',
              desc: 'Our Ethiopia Yirgacheffe received a 92-point cup score by certified Q-graders.',
              score: 92,
            },
            {
              year: '2023',
              title: 'Great Taste Award',
              subtitle: '3-Star Gold — Specialty Espresso',
              Icon: Star,
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
              whileHover={{ y: -6, borderColor: `${award.color}60` }}
              className="relative bg-[var(--surface)] border border-[var(--primary)]/15 rounded-3xl p-8 flex flex-col justify-between shadow-md hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative background glow */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10 group-hover:opacity-25 transition-opacity blur-3xl pointer-events-none"
                style={{ backgroundColor: award.color }}
              />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${award.color}15`,
                      borderColor: `${award.color}35`,
                      color: award.color,
                    }}
                  >
                    <award.Icon size={22} />
                  </div>
                  <span
                    className="font-mono-custom text-[11px] font-bold px-3 py-1 rounded-full border tracking-wider"
                    style={{ color: award.color, borderColor: `${award.color}40`, backgroundColor: `${award.color}12` }}
                  >
                    {award.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text)] leading-tight">{award.title}</h3>
                  <p className="font-mono-custom text-xs font-semibold mt-1.5" style={{ color: award.color }}>
                    {award.subtitle}
                  </p>
                </div>

                {award.score && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between font-mono-custom text-[11px] text-[var(--muted)]">
                      <span>SCA Cup Score</span>
                      <span className="font-bold text-xs" style={{ color: award.color }}>{award.score} / 100</span>
                    </div>
                    <div className="h-2 bg-[var(--primary)]/10 rounded-full overflow-hidden p-0.5 border border-[var(--primary)]/15">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${award.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${award.color}, #F5D061)` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-[var(--muted)] font-light leading-relaxed pt-1">{award.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[var(--surface)] border border-[var(--primary)]/15 rounded-3xl p-8 sm:p-10 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles size={14} className="text-[var(--primary)] animate-pulse" />
            <p className="font-mono-custom text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-semibold">
              Certifications &amp; Standards
            </p>
            <Sparkles size={14} className="text-[var(--primary)] animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Leaf,
                name: 'Rainforest Alliance',
                desc: "All our farms meet the Rainforest Alliance's rigorous environmental and social standards.",
                year: 'Certified Since 2019',
                color: '#4AE3B5',
              },
              {
                Icon: BadgeCheck,
                name: 'Fair Trade Certified',
                desc: '100% of our single-origin lots are purchased above Fair Trade minimum price floors.',
                year: 'Certified Since 2020',
                color: '#D4A66A',
              },
              {
                Icon: Globe,
                name: 'B Corp Certified',
                desc: 'We meet the highest standards of verified social and environmental performance.',
                year: 'Certified Since 2022',
                color: '#6EB2F0',
              },
            ].map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, borderColor: 'rgba(201,169,110,0.35)' }}
                className="flex items-start gap-4 p-6 border border-[var(--primary)]/12 rounded-2xl bg-[var(--bg)] hover:bg-[var(--surface)] hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${cert.color}15`,
                    borderColor: `${cert.color}30`,
                    color: cert.color,
                  }}
                >
                  <cert.Icon size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-base font-semibold text-[var(--text)]">{cert.name}</h4>
                  <p className="font-mono-custom text-[11px] font-semibold" style={{ color: cert.color }}>
                    {cert.year}
                  </p>
                  <p className="text-xs text-[var(--muted)] font-light leading-relaxed pt-1">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
