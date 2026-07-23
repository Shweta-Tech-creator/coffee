import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const IMAGES = [
  { id: 1, cat: 'Roastery', src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85', cap: '12kg Probat Drum Roaster' },
  { id: 2, cat: 'Coffee Craft', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=85', cap: 'Nordic Black Sesame Espresso' },
  { id: 3, cat: 'Coffee Craft', src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=85', cap: 'Green Coffee Bean Resting Silos' },
  { id: 4, cat: 'Atmosphere', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85', cap: 'V60 Pour Over Bar' },
  { id: 5, cat: 'Bakehouse', src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=85', cap: 'Twice-Baked Almond Croissant' },
  { id: 6, cat: 'Atmosphere', src: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&q=85', cap: 'Nordic Hygge Seating Sanctuary' },
  { id: 7, cat: 'Bakehouse', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=85', cap: '48hr Fermented Sourdough' },
  { id: 8, cat: 'Roastery', src: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&q=85', cap: 'Cupping & Sensory Analysis' }
];

const CATS = ['All', 'Atmosphere', 'Coffee Craft', 'Bakehouse', 'Roastery'];

export const GalleryPage = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filtered = activeCat === 'All' ? IMAGES : IMAGES.filter(img => img.cat === activeCat);

  return (
    <div className="pt-28 bg-[#08060A] min-h-screen text-[#EDE4D6]">
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[#C9A96E]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">Photography</span>
          <h1 className="font-display text-5xl sm:text-7xl font-light">
            Visual <em className="text-[#C9A96E]">Journal.</em>
          </h1>
          <p className="text-[#9E9283] font-light text-lg">
            A glance inside our roastery, bakehouse, and Scandinavian coffee sanctuary.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`font-mono-custom text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeCat === c
                  ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A] font-bold'
                  : 'border-[#C9A96E]/20 text-[#5A5040] hover:border-[#C9A96E]/50 hover:text-[#C9A96E]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImg(img)}
                className="group relative aspect-[4/3] overflow-hidden border border-[#C9A96E]/15 cursor-pointer"
              >
                <img src={img.src} alt={img.cap} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="font-mono-custom text-[9px] text-[#C9A96E] uppercase tracking-widest">{img.cat}</span>
                  <h4 className="font-display text-xl text-[#EDE4D6] font-light">{img.cap}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[2000] bg-[#08060A]/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 p-3 text-[#EDE4D6] border border-[#C9A96E]/30 hover:border-[#C9A96E]">
            <X size={20} />
          </button>
          <div className="max-w-4xl w-full space-y-4" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.cap} className="w-full max-h-[75vh] object-contain border border-[#C9A96E]/30" />
            <div className="text-center">
              <span className="font-mono-custom text-xs text-[#C9A96E] uppercase tracking-widest">{lightboxImg.cat}</span>
              <h3 className="font-display text-3xl text-[#EDE4D6] mt-1">{lightboxImg.cap}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
