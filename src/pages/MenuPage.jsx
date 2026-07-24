import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { SignatureMenu } from '../features/menu/SignatureMenu';
import { useCart } from '../features/checkout/CartContext';

const RETAIL_BEANS = [
  {
    id: 'b1',
    name: 'Ethiopia Yirgacheffe (250g)',
    price: 18.00,
    desc: 'Light Roast · Jasmine, Bergamot, Blueberry',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
  },
  {
    id: 'b2',
    name: 'Colombia Huila Pink Bourbon (250g)',
    price: 19.50,
    desc: 'Medium Roast · Toasted Hazelnut, Brown Sugar',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80'
  },
  {
    id: 'b3',
    name: 'Guatemala Antigua Reserve (250g)',
    price: 21.00,
    desc: 'Dark Roast · 70% Dark Chocolate, Cinnamon',
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=80'
  }
];

const FAQS = [
  { q: 'Do you offer dairy-free milk options?', a: 'Yes! Organic Oat, Almond, and Coconut Milk are served at no extra charge.' },
  { q: 'Are pastries baked fresh daily?', a: 'Every morning our bakers craft sourdough pastries and fresh cardamom buns.' },
  { q: 'Can whole beans be ground at purchase?', a: 'We custom grind for Espresso, Pour Over, French Press, or Moka Pot at checkout.' }
];

export const MenuPage = () => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-28 bg-[var(--bg)] min-h-screen text-[var(--text)]">
      {/* Hero Header */}
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[var(--accent)]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block">Artisanal Offerings</span>
          <h1 className="font-display text-4xl sm:text-6xl font-light">
            Our Specialty <span className="text-[var(--accent)] italic">Menu.</span>
          </h1>
          <p className="text-[var(--muted)] font-light text-base leading-relaxed">
            Single-origin espresso, precision pour overs, and fresh daily sourdough bakehouse creations.
          </p>
        </motion.div>
      </section>

      {/* Main Interactive Menu Component */}
      <SignatureMenu />

      {/* Whole Beans Section */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Take Bean Haven Home</span>
            <h2 className="font-display text-3xl lg:text-5xl font-light">Whole Bean Micro-Lots</h2>
          </div>
          <p className="text-[var(--muted)] font-light text-sm max-w-sm">
            Roasted in small batches every Tuesday. Nitrogen sealed for optimal freshness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {RETAIL_BEANS.map((bean, index) => (
            <motion.div
              key={bean.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--surface)] border border-[var(--accent)]/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[var(--accent)]/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[var(--surface)]">
                  <img
                    src={bean.img}
                    alt={bean.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display text-xl font-medium text-[var(--text)]">{bean.name}</h3>
                  <span className="font-display text-lg text-[var(--accent)] font-semibold">${bean.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[var(--muted)] font-light">{bean.desc}</p>
              </div>

              <button
                onClick={() => addToCart(bean)}
                className="w-full py-3 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Whole Beans Bag
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dietary & FAQ */}
      <section className="py-20 px-6 lg:px-20 max-w-3xl mx-auto border-t border-[var(--accent)]/15">
        <div className="text-center mb-10">
          <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Helpful Details</span>
          <h2 className="font-display text-3xl font-light">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="p-5 border border-[var(--accent)]/15 rounded-2xl bg-[var(--surface)] cursor-pointer hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="font-display text-lg text-[var(--text)] font-medium">{faq.q}</h4>
                <span className="text-[var(--accent)]">
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>
              {openFaq === i && (
                <p className="text-xs text-[var(--muted)] mt-3 pt-3 border-t border-[var(--accent)]/10 leading-relaxed font-light">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
