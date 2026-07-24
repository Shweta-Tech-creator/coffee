import React from 'react';
import { Hero } from '../features/home/Hero';
import { MarqueeBanner } from '../features/home/MarqueeBanner';
import { SeasonalReserve } from '../features/home/SeasonalReserve';
import { CafeExperience } from '../features/home/CafeExperience';
import { Workshops } from '../features/home/Workshops';
import { MerchandisePreview } from '../features/home/MerchandisePreview';
import { JournalPreview } from '../features/home/JournalPreview';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <Hero />
      <MarqueeBanner />

      <SeasonalReserve />
      <CafeExperience />
      <Workshops />
      <MerchandisePreview />
      <JournalPreview />

      {/* Reservation CTA Banner */}
      <section className="py-24 relative overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, #0A0E14 0%, #141B24 50%, #0A0E14 100%)' }}>
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.20) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-5">
          <div className="w-12 h-12 rounded-2xl border border-[var(--primary)]/40 flex items-center justify-center mx-auto text-[var(--primary)] bg-[var(--primary)]/10">
            <Calendar size={22} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--text)] font-light leading-tight">
            Reserve Your <span className="text-[var(--primary)] italic">Table Today.</span>
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed font-light">
            Select your preferred seating ambiance and enjoy artisanal single-origin brews.
          </p>
          <div className="pt-2">
            <Link
              to="/reservation"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs font-bold hover:bg-[var(--accent)] transition-all shadow-lg shadow-[var(--primary)]/30 hover:-translate-y-0.5"
            >
              Reserve Table Floorplan
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
