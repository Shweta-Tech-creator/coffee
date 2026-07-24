import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Plus, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
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
    badge: "Baker's Pride", rating: 5.0,
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { addToCart } = useCart();

  const filtered = cat === 'All' ? MENU : MENU.filter(i => i.cat === cat);

  return (
    <section id="menu" ref={ref} className="relative py-20 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Header & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold">
                Artisanal Selection
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] font-light leading-tight">
              Curated <span className="text-[var(--accent)] italic">Menu.</span>
            </h2>
          </div>

          {/* Filter Pills & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`font-mono-custom text-xs px-4 py-2 rounded-xl transition-all duration-200 ${
                    cat === c
                      ? 'bg-[var(--accent)] text-[var(--bg)] font-bold shadow-md shadow-[var(--accent)]/20'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center gap-1 p-1.5 bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === 'list' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Menu Items Container */}
        <AnimatePresence mode="popLayout">
          {viewMode === 'grid' ? (
            /* Uncluttered Modern Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl p-5 flex flex-col justify-between hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-300 group"
                >
                  <div>
                    {/* Image Thumbnail Header - Clean & Rounded */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[var(--surface)]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-[var(--accent)] text-[var(--bg)] font-mono-custom text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-xl text-[var(--text)] font-medium leading-snug">{item.name}</h3>
                      <span className="font-display text-lg text-[var(--accent)] font-semibold shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--muted)] font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Actions & Rating Footer */}
                  <div className="pt-4 border-t border-[var(--accent)]/10 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[var(--accent)]">
                      <Star size={12} className="fill-current" />
                      <span className="font-mono-custom text-xs text-[var(--muted)] font-medium">{item.rating}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="p-2.5 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-xl transition-colors"
                        title="Customize item"
                      >
                        <SlidersHorizontal size={14} />
                      </button>

                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors shadow-sm"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Uncluttered Streamlined List View */
            <motion.div
              layout
              className="space-y-4 max-w-4xl mx-auto"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 hover:border-[var(--accent)]/40 transition-all duration-300"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-[var(--surface)]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-display text-lg sm:text-xl text-[var(--text)] font-medium">{item.name}</h3>
                        {item.badge && (
                          <span className="bg-[var(--accent)]/15 text-[var(--accent)] font-mono-custom text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold border border-[var(--accent)]/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted)] font-light truncate max-w-md">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & Buttons */}
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <span className="font-display text-lg sm:text-xl text-[var(--accent)] font-semibold">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="p-2.5 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-xl transition-colors"
                        title="Customize"
                      >
                        <SlidersHorizontal size={14} />
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors flex items-center gap-1.5"
                      >
                        <Plus size={14} /> <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Full Menu CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[var(--surface)] border border-[var(--accent)]/30 text-[var(--text)] rounded-2xl font-mono-custom text-xs font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            Explore Complete Menu & Coffee Beans &rarr;
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
