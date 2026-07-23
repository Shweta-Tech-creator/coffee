import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const IMGS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=85', cap: 'The Roastery', cls: 'row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=85', cap: 'Latte Art' },
  { id: 3, src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=85', cap: 'Green Beans' },
  { id: 4, src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85', cap: 'Pour Over', cls: 'col-span-2' },
  { id: 5, src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=85', cap: 'Almond Croissant' },
  { id: 6, src: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=500&q=85', cap: 'Hygge Corner' },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" ref={ref} className="relative py-36 bg-[#08060A]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Visual Journal</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl text-[#EDE4D6] font-light leading-[1.05]">
              Life Inside<br /><em className="text-[#C9A96E]">Bean Haven.</em>
            </h2>
          </div>
          <a
            href="/gallery"
            className="hidden lg:flex items-center gap-3 font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#5A5040] hover:text-[#C9A96E] transition-colors group"
          >
            <div className="h-px w-10 bg-current group-hover:w-16 transition-all" />
            Full Gallery
          </a>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-1 h-[600px] lg:h-[720px]">
          {IMGS.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative group overflow-hidden img-zoom ${img.cls || ''}`}
            >
              <img src={img.src} alt={img.cap} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-400"
                initial={false}
              >
                <p className="font-display text-white text-lg font-light">{img.cap}</p>
                <div className="mt-1 h-px w-0 group-hover:w-full bg-[#C9A96E] transition-all duration-500" />
              </motion.div>
              {/* Corner marker */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
