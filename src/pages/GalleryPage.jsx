import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pin, Heart, Camera, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_POLAROIDS = [
  {
    id: 1,
    cat: 'Atmosphere',
    title: 'Sunny Morning at the Window Booth',
    author: 'Elena & Lucas',
    date: 'July 2026',
    rotation: '-rotate-2',
    src: '/assets/cafe_polaroid_wall.jpg',
    likes: 42
  },
  {
    id: 2,
    cat: 'Furniture',
    title: 'Custom Danish Oak Communal Lounge',
    author: 'Bean Haven Craftsmen',
    date: 'Design Icon',
    rotation: 'rotate-3',
    src: '/assets/cafe_furniture.jpg',
    likes: 68
  },
  {
    id: 3,
    cat: 'Coffee Craft',
    title: 'First Ristretto Extraction of the Day',
    author: 'Barista Marco',
    date: 'Yesterday',
    rotation: '-rotate-1',
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85',
    likes: 56
  },
  {
    id: 4,
    cat: 'Atmosphere',
    title: 'Leather Armchairs & Afternoon Light',
    author: 'Sarah M.',
    date: 'Community Memory',
    rotation: 'rotate-2',
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=85',
    likes: 29
  },
  {
    id: 5,
    cat: 'Furniture',
    title: 'Victorian Roastery Seating Alcove',
    author: 'Arch Digest Review',
    date: 'Featured',
    rotation: '-rotate-3',
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85',
    likes: 64
  },
  {
    id: 6,
    cat: 'Coffee Craft',
    title: 'Hand-Poured Ethiopia V60 Pour Over',
    author: 'Coffee Obsessive Club',
    date: 'Specialty Brew',
    rotation: 'rotate-1',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
    likes: 47
  }
];

const FURNITURE_HIGHLIGHTS = [
  {
    name: 'Nordic Window Booths & Leather Lounge',
    desc: 'High-end Danish oak communal seating with plush velvet window booths and cognac leather armchairs.',
    img: '/assets/cafe_furniture.jpg'
  },
  {
    name: 'Hand-Carved Oak Communal Bar',
    desc: 'Solid Danish oak communal tables fitted with warm pendant ambient glass lamps.',
    img: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&q=85'
  },
  {
    name: 'Secluded Cognac Leather Lounge',
    desc: 'Deep buttoned cognac leather armchairs perfect for long conversations & reading.',
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=85'
  }
];

const CATS = ['All', 'Atmosphere', 'Furniture', 'Coffee Craft'];

export const GalleryPage = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [polaroids, setPolaroids] = useState(INITIAL_POLAROIDS);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    author: '',
    cat: 'Atmosphere',
    imgUrl: '/assets/cafe_polaroid_wall.jpg'
  });

  const filtered = activeCat === 'All' ? polaroids : polaroids.filter(p => p.cat === activeCat);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setPolaroids(polaroids.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleStickPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.author.trim()) return;

    const created = {
      id: Date.now(),
      cat: newPhoto.cat,
      title: newPhoto.title,
      author: newPhoto.author,
      date: 'Just Now',
      rotation: Math.random() > 0.5 ? 'rotate-2' : '-rotate-2',
      src: newPhoto.imgUrl,
      likes: 1
    };

    setPolaroids([created, ...polaroids]);
    setShowAddModal(false);
    setNewPhoto({ title: '', author: '', cat: 'Atmosphere', imgUrl: '/assets/cafe_polaroid_wall.jpg' });

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['var(--accent)', 'var(--highlight)', 'var(--accent)']
    });
  };

  return (
    <div className="pt-28 bg-[var(--bg)] min-h-screen text-[var(--text)]">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[var(--accent)]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block">Interior & Community</span>
          <h1 className="font-display text-4xl sm:text-6xl font-light">
            Ambitious Spaces & <span className="text-[var(--accent)] italic">Wall Memories.</span>
          </h1>
          <p className="text-[var(--muted)] font-light text-base leading-relaxed">
            Explore our Scandinavian furniture design and our interactive guest photo wall.
          </p>

          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors shadow-lg shadow-[var(--accent)]/20"
          >
            <Pin size={14} /> Stick Your Photo On Our Wall
          </button>
        </motion.div>
      </section>

      {/* Ambitious Furniture Architecture Section */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Interior Architecture</span>
            <h2 className="font-display text-3xl lg:text-5xl font-light">Bespoke Cafe Furniture</h2>
          </div>
          <p className="text-[var(--muted)] font-light text-sm max-w-sm">
            Crafted from solid Danish oak, rich cognac leather, and ambient pendant lighting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FURNITURE_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--surface)] border border-[var(--accent)]/15 rounded-3xl p-5 space-y-4 hover:border-[var(--accent)]/40 transition-all duration-300 group"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface)]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-medium text-[var(--text)] mb-1">{item.name}</h3>
                <p className="text-xs text-[var(--muted)] font-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Photo Wall (Photos Pinned on Cafe Wall) */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Camera size={18} className="text-[var(--accent)]" />
              <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold">
                Cafe Memory Wall
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-light">Guest Photos Pinned On Wall</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`font-mono-custom text-xs px-4 py-2 rounded-xl transition-all ${
                  activeCat === c
                    ? 'bg-[var(--accent)] text-[var(--bg)] font-bold shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* The Cafe Wall Board Container */}
        <div className="relative bg-[var(--surface)] border border-[var(--accent)]/20 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxImg(item)}
                  className={`bg-[var(--bg)] p-4 pb-6 rounded-md shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer ${item.rotation} group relative border border-[var(--primary)]/20`}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] shadow-md border-2 border-[var(--bg)] flex items-center justify-center">
                      <Pin size={12} className="text-[var(--bg)]" />
                    </div>
                  </div>

                  {/* Photo Frame */}
                  <div className="aspect-[4/3] rounded overflow-hidden bg-[var(--surface)] mb-4 mt-2">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Polaroid Caption */}
                  <div className="text-[var(--text)] font-serif-custom space-y-1">
                    <h4 className="font-semibold text-lg leading-snug">{item.title}</h4>
                    <div className="flex items-center justify-between text-xs font-sans text-[var(--muted)] pt-1">
                      <span>By {item.author}</span>
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="flex items-center gap-1 text-[var(--accent)] hover:scale-110 transition-transform font-bold"
                      >
                        <Heart size={14} className="fill-current" /> {item.likes}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stick Your Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[2000] bg-[var(--bg)]/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--surface)] border border-[var(--accent)]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--muted)] hover:text-[var(--text)]"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4 text-[var(--accent)]">
              <Sparkles size={18} />
              <h3 className="font-display text-2xl text-[var(--text)] font-medium">Stick Photo On Cafe Wall</h3>
            </div>

            <form onSubmit={handleStickPhoto} className="space-y-4">
              <div>
                <label className="font-mono-custom text-xs uppercase text-[var(--muted)] block mb-1">Photo Title / Memory *</label>
                <input
                  required
                  type="text"
                  placeholder="E.g. Sunday Morning Espresso with Friends"
                  value={newPhoto.title}
                  onChange={e => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-2.5 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="font-mono-custom text-xs uppercase text-[var(--muted)] block mb-1">Your Name / Handle *</label>
                <input
                  required
                  type="text"
                  placeholder="E.g. Sophia & Alex"
                  value={newPhoto.author}
                  onChange={e => setNewPhoto({ ...newPhoto, author: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-2.5 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="font-mono-custom text-xs uppercase text-[var(--muted)] block mb-1">Category</label>
                <select
                  value={newPhoto.cat}
                  onChange={e => setNewPhoto({ ...newPhoto, cat: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-2.5 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="Atmosphere">Atmosphere</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Coffee Craft">Coffee Craft</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--accent)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors shadow-lg shadow-[var(--accent)]/20 flex items-center justify-center gap-2 mt-4"
              >
                <Pin size={14} /> Pin Polaroid To Wall
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[2000] bg-[var(--bg)]/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 p-3 text-[var(--text)] bg-[var(--surface)] border border-[var(--accent)]/30 rounded-xl hover:border-[var(--accent)]">
            <X size={20} />
          </button>
          <div className="max-w-3xl w-full space-y-4 text-center bg-[var(--bg)] p-6 rounded-2xl border border-[var(--accent)]/40" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.title || lightboxImg.cap} className="w-full max-h-[70vh] object-cover rounded-xl" />
            <div className="text-[var(--text)] font-serif-custom">
              <span className="font-mono-custom text-xs text-[var(--accent)] uppercase font-semibold">{lightboxImg.cat}</span>
              <h3 className="font-bold text-2xl mt-1">{lightboxImg.title || lightboxImg.cap}</h3>
              <p className="text-xs text-[var(--muted)] font-sans mt-1">Shared by {lightboxImg.author || 'Bean Haven Guest'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
