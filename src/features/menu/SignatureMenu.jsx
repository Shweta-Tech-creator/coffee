import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Plus, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../checkout/CartContext';
import { CoffeeCustomizerModal } from './CoffeeCustomizerModal';

const MENU = [
  {
    id: 1, cat: 'Espresso', name: 'Nordic Black', price: 5.50,
    desc: 'Ethiopian Yirgacheffe · black sesame · birch smoke finish',
    badge: 'Staff Pick', rating: 4.9,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80'
  },
  {
    id: 2, cat: 'Espresso', name: 'Hygge Latte', price: 6.00,
    desc: 'Guatemalan espresso · steamed oat milk · cardamom · honey',
    badge: 'Bestseller', rating: 5.0,
    img: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=500&q=80'
  },
  {
    id: 3, cat: 'Espresso', name: 'Flat White', price: 4.50,
    desc: 'Double ristretto · silky microfoam · served in 5oz ceramic',
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&q=80'
  },
  {
    id: 4, cat: 'Filter', name: 'Pour Over', price: 5.00,
    desc: 'V60 · single origin · 4-min extraction · floral & citrus',
    badge: 'Artisan', rating: 4.9,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'
  },
  {
    id: 5, cat: 'Cold', name: 'Amber Cold Brew', price: 6.50,
    desc: 'Concentrate · smoked caramel · vanilla bean · cold cream',
    badge: 'Seasonal', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80'
  },
  {
    id: 6, cat: 'Cold', name: 'Iced Matcha', price: 6.50,
    desc: 'Ceremonial grade matcha · oat milk · vanilla · cold brew ice',
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80'
  },
  {
    id: 7, cat: 'Food', name: 'Almond Croissant', price: 5.50,
    desc: 'Twice-baked · frangipane · toasted almond · flaky layers',
    badge: 'Baker\'s Pride', rating: 5.0,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80'
  },
  {
    id: 8, cat: 'Food', name: 'Sourdough Toast', price: 7.00,
    desc: 'House 48hr sourdough · cultured butter · seasonal jam',
    badge: 'Fresh Daily', rating: 4.8,
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'
  },
];

const CATS = ['All', 'Espresso', 'Filter', 'Cold', 'Food'];

export const SignatureMenu = () => {
  const [cat, setCat] = useState('All');
  const [hovered, setHovered] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { addToCart } = useCart();

  const filtered = cat === 'All' ? MENU : MENU.filter(i => i.cat === cat);

  return (
    <section id="menu" ref={ref} className="relative py-16 sm:py-24 lg:py-36 bg-[#08060A]">
      {/* Section label + heading */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Our Menu</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-[#EDE4D6] font-light leading-[1.05]">
              Crafted with<br /><em className="text-[#C9A96E]">Intention.</em>
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono-custom text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                  cat === c
                    ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A] font-bold'
                    : 'border-[#C9A96E]/20 text-[#5A5040] hover:border-[#C9A96E]/50 hover:text-[#C9A96E]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C9A96E]/8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative bg-[#08060A] group overflow-hidden cursor-pointer"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedProduct(item)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-[#08060A]/30 to-transparent" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 font-mono-custom text-[9px] tracking-[0.3em] uppercase bg-[#C9A96E] text-[#08060A] px-3 py-1 font-bold">
                      {item.badge}
                    </span>
                  )}

                  {/* Add & Customize Overlay buttons */}
                  <AnimatePresence>
                    {hovered === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 right-4 flex items-center gap-2"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(item);
                          }}
                          className="px-3 py-2 bg-[#08060A] border border-[#C9A96E] text-[#C9A96E] font-mono-custom text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#C9A96E] hover:text-[#08060A] transition-colors"
                        >
                          <SlidersHorizontal size={12} />
                          Customize
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                          }}
                          className="w-10 h-10 bg-[#C9A96E] text-[#08060A] flex items-center justify-center hover:bg-[#E8CC8A] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Info */}
                <div className="p-3 sm:p-6">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <h3 className="font-display text-base sm:text-xl text-[#EDE4D6] font-light leading-tight">{item.name}</h3>
                    <span className="font-display text-base sm:text-xl text-[#C9A96E] font-light ml-2 shrink-0">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="font-mono-custom text-[9px] sm:text-[10px] text-[#4A4030] tracking-wide leading-relaxed mb-3 hidden sm:block">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star size={10} className="text-[#C9A96E] fill-current" />
                      <span className="font-mono-custom text-[10px] text-[#5A5040]">{item.rating}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="font-mono-custom text-[9px] tracking-[0.25em] uppercase text-[#C9A96E] hover:text-[#E8CC8A] transition-colors flex items-center gap-1.5"
                    >
                      Add <ShoppingCart size={10} />
                    </button>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View full menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/menu"
            className="group flex items-center gap-4 font-mono-custom text-[10px] tracking-[0.35em] uppercase text-[#5A5040] hover:text-[#C9A96E] transition-colors"
          >
            <div className="h-px w-12 bg-current transition-all group-hover:w-20" />
            View Full Menu
            <div className="h-px w-12 bg-current transition-all group-hover:w-20" />
          </a>
        </motion.div>
      </div>

      {/* Coffee Customizer Modal */}
      {selectedProduct && (
        <CoffeeCustomizerModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
