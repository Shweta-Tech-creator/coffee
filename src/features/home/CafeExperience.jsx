import React from 'react';
import { motion } from 'framer-motion';

export const CafeExperience = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0A0810] border-t border-[#C9A96E]/15 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">
              The Space
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE4D6] leading-[1.1]">
              A Sanctuary for <br/><em className="text-[#C9A96E]">Sensory Focus</em>
            </h2>
            <p className="text-[#7A6F65] font-light text-sm sm:text-base leading-relaxed">
              We built Bean Haven as an antidote to the chaotic modern coffee shop. Drawing inspiration from Nordic minimalism and Japanese wabi-sabi, our space features acoustic-treated oak paneling, warm ambient lighting, and bespoke ceramic ware crafted by local artisans. 
            </p>
            <p className="text-[#7A6F65] font-light text-sm sm:text-base leading-relaxed">
              Every detail, from the playlist to the seating geometry, is engineered to help you slow down and fully experience the nuances in your cup.
            </p>
            
            <div className="flex gap-12 pt-6 border-t border-[#C9A96E]/10">
              <div>
                <p className="font-display text-3xl text-[#C9A96E]">0</p>
                <p className="font-mono-custom text-[8px] text-[#4A4030] tracking-widest uppercase mt-2">Wifi Networks</p>
              </div>
              <div>
                <p className="font-display text-3xl text-[#C9A96E]">45<span className="text-xl">db</span></p>
                <p className="font-mono-custom text-[8px] text-[#4A4030] tracking-widest uppercase mt-2">Ambient Noise Level</p>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200" 
                alt="Cafe Interior"
                className="w-full h-full object-cover filter brightness-75 sepia-[0.2]"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-[#C9A96E]/30 m-4 sm:m-6 pointer-events-none" />
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-40 sm:w-56 aspect-square bg-[#08060A] p-3 border border-[#C9A96E]/20"
              >
                <img 
                  src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=600" 
                  alt="Ceramic Cup"
                  className="w-full h-full object-cover opacity-80"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
