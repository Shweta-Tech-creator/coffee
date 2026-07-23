import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { SignatureMenu } from '../features/menu/SignatureMenu';
import { useCart } from '../features/checkout/CartContext';

const RETAIL_BEANS = [
  {
    id: 'b1',
    name: 'Ethiopia Yirgacheffe (250g)',
    price: 18.00,
    desc: 'Light Roast · Jasmine, Bergamot, Blueberry · Anaerobic Process',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
  },
  {
    id: 'b2',
    name: 'Colombia Huila Pink Bourbon (250g)',
    price: 19.50,
    desc: 'Medium Roast · Toasted Hazelnut, Brown Sugar, Peach · Washed',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80'
  },
  {
    id: 'b3',
    name: 'Guatemala Antigua Reserve (250g)',
    price: 21.00,
    desc: 'Dark Roast · 70% Dark Chocolate, Cinnamon, Cedar · Honey Process',
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=80'
  }
];

const FAQS = [
  { q: 'Do you offer dairy-free milk alternatives?', a: 'Yes! We offer Organic Oat Milk, Almond Milk, and Coconut Milk at no extra charge.' },
  { q: 'Are your sourdough pastries baked in-house daily?', a: 'Every dawn, our master bakers ferment 48-hour sourdough and bake fresh cardamom buns and croissants.' },
  { q: 'Can I purchase whole coffee beans ground for my brew method?', a: 'Absoltely. We can custom grind your beans for Espresso, V60 Pour Over, French Press, or Moka Pot at checkout.' }
];

export const MenuPage = () => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-28 bg-[#08060A] min-h-screen text-[#EDE4D6]">
      {/* Hero Header */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[#C9A96E]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">Artisanal Offerings</span>
          <h1 className="font-display text-5xl sm:text-7xl font-light">
            The Full <em className="text-[#C9A96E]">Menu.</em>
          </h1>
          <p className="text-[#9E9283] font-light text-lg">
            Single-origin espresso, precision pour overs, ceremonial teas, and fresh daily sourdough bakehouse creations.
          </p>
        </motion.div>
      </section>

      {/* Main Interactive Menu Component */}
      <SignatureMenu />

      {/* Whole Beans & Home Roastery Gear */}
      <section className="py-28 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-3">Take Bean Haven Home</span>
            <h2 className="font-display text-4xl lg:text-6xl font-light">Whole Bean Micro-Lots</h2>
          </div>
          <p className="text-[#7A6F65] font-light text-sm max-w-md">
            Freshly roasted in small batches every Tuesday. Nitrogen sealed for maximum floral volatile retention.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {RETAIL_BEANS.map((bean, index) => (
            <motion.div
              key={bean.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8 }}
              className="bg-[#0E0C12] border border-[#C9A96E]/20 p-6 flex flex-col justify-between space-y-6 hover:border-[#C9A96E]/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={bean.img}
                    alt={bean.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-2xl font-light text-[#EDE4D6]">{bean.name}</h3>
                  <span className="font-display text-xl text-[#C9A96E]">${bean.price.toFixed(2)}</span>
                </div>
                <p className="font-mono-custom text-[11px] text-[#7A6F65] leading-relaxed">{bean.desc}</p>
              </div>

              <button
                onClick={() => addToCart(bean)}
                className="w-full py-3.5 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Whole Beans Bag
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dietary & Allergen Guide */}
      <section className="py-24 px-6 lg:px-20 max-w-4xl mx-auto border-t border-[#C9A96E]/15">
        <div className="text-center mb-12">
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-3">Dietary Guide</span>
          <h2 className="font-display text-4xl font-light">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="p-6 border border-[#C9A96E]/15 bg-[#0E0C12] cursor-pointer hover:border-[#C9A96E]/40 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-display text-xl text-[#EDE4D6]">{faq.q}</h4>
                <span className="text-[#C9A96E] font-mono-custom">{openFaq === i ? '-' : '+'}</span>
              </div>
              {openFaq === i && (
                <p className="font-mono-custom text-xs text-[#7A6F65] mt-4 pt-4 border-t border-[#C9A96E]/10 leading-relaxed">
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
