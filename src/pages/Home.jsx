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
    <div className="bg-[#08060A]">
      {/* Top Banner and Hero remain as they are */}
      <Hero />
      <MarqueeBanner />

      {/* New Premium Homepage Flow */}
      <SeasonalReserve />
      <CafeExperience />
      <Workshops />
      <MerchandisePreview />
      <JournalPreview />

      {/* Refined Reservation CTA Banner */}
      <section className="py-28 bg-[#0E0C12] border-t border-[#C9A96E]/15 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-full border border-[#C9A96E]/30 flex items-center justify-center mx-auto text-[#C9A96E]">
            <Calendar size={20} />
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#EDE4D6] font-light leading-tight">
            Ready for a <em className="text-[#C9A96E]">Sensory Sanctuary?</em>
          </h2>
          <p className="font-mono-custom text-xs text-[#7A6F65] max-w-lg mx-auto leading-relaxed">
            Reserve your favorite table visually on our interactive floorplan diagram and enjoy single-origin precision brews.
          </p>
          <div className="pt-4">
            <Link
              to="/reservation"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors"
            >
              Choose Your Table Floorplan
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
