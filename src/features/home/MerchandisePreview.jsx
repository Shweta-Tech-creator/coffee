import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Kinto SCS Mug',
    price: '$24',
    category: 'Ceramics',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600'
  },
  {
    name: 'Ethiopia Yirgacheffe',
    price: '$22',
    category: 'Coffee Beans (250g)',
    img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600'
  },
  {
    name: 'Fellow Stagg EKG',
    price: '$165',
    category: 'Brewing Gear',
    img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=600'
  },
];

export const MerchandisePreview = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0A0810] border-t border-[#C9A96E]/15">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-4">
              Curated Goods
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE4D6]">
              Elevate Your <em className="text-[#C9A96E]">Ritual</em>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-3 text-[#C9A96E] font-mono-custom text-[10px] tracking-[0.25em] uppercase hover:text-[#E8CC8A] transition-colors pb-2 border-b border-[#C9A96E]/30 hover:border-[#C9A96E]">
            Shop All Collections <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-[#0E0C12] border border-[#C9A96E]/15 overflow-hidden mb-6">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover filter brightness-75 sepia-[0.1] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />
                
                {/* Overlay Add to Cart button */}
                <div className="absolute inset-0 bg-[#08060A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-[#C9A96E] text-[#08060A] px-6 py-3 font-mono-custom text-[10px] tracking-[0.2em] uppercase font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-2xl text-[#EDE4D6] mb-1 group-hover:text-[#C9A96E] transition-colors">{product.name}</h3>
                  <p className="font-mono-custom text-[9px] text-[#7A6F65] tracking-widest uppercase">{product.category}</p>
                </div>
                <span className="font-mono-custom text-sm text-[#C9A96E]">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
