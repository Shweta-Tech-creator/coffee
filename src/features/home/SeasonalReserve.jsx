import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeasonalReserve = () => {
  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div>
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-4">
              Seasonal Spotlight
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light text-[#EDE4D6] leading-tight">
              Panama <br/><em className="text-[#C9A96E]">Geisha Reserve</em>
            </h2>
          </div>
          
          <p className="text-[#7A6F65] font-light text-sm sm:text-base leading-relaxed max-w-md">
            Cultivated at 1,800 MASL in the volcanic soils of Boquete. This micro-lot undergoes a 96-hour anaerobic fermentation, resulting in an exceptionally complex cup with intense floral aromatics and fruit-forward clarity.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#C9A96E]/15">
            <div>
              <p className="font-mono-custom text-[9px] text-[#4A4030] tracking-widest uppercase mb-1">Process</p>
              <p className="font-display text-lg text-[#EDE4D6] font-light">Anaerobic Natural</p>
            </div>
            <div>
              <p className="font-mono-custom text-[9px] text-[#4A4030] tracking-widest uppercase mb-1">Tasting Notes</p>
              <p className="font-display text-lg text-[#EDE4D6] font-light">Jasmine, Papaya, Bergamot</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors"
            >
              Order Now <ArrowRight size={14} />
            </Link>
            <button className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C9A96E]/30 text-[#C9A96E] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#C9A96E]/10 transition-colors">
              <Info size={14} /> Read the Story
            </button>
          </div>
        </div>

        {/* Image / Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative h-[500px] lg:h-[700px] w-full bg-[#0E0C12] border border-[#C9A96E]/20 overflow-hidden group"
        >
          <img 
            src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1400" 
            alt="Coffee pouring"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <p className="font-mono-custom text-[10px] text-[#C9A96E] tracking-[0.3em] uppercase">Limited Release</p>
              <p className="font-display text-2xl text-[#EDE4D6] mt-2">Only 50 bags remaining</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-[#C9A96E]/40 flex items-center justify-center backdrop-blur-sm">
              <span className="font-mono-custom text-[9px] text-[#C9A96E]">01</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
