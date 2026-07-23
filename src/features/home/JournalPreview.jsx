import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    title: 'Sourcing the 2026 Ethiopian Harvest',
    category: 'Origin Stories',
    date: 'Jul 15, 2026',
    excerpt: 'Our journey through the misty highlands of Yirgacheffe, meeting the families behind our latest micro-lots.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800'
  },
  {
    title: 'The Science of Water Chemistry in Brewing',
    category: 'Brewing Guide',
    date: 'Jun 28, 2026',
    excerpt: 'Why we filter our water via reverse osmosis, and how mineral content drastically alters flavor extraction.',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800'
  }
];

export const JournalPreview = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#08060A] border-t border-[#C9A96E]/15">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-4">
              Journal
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE4D6]">
              Dispatches from <br/><em className="text-[#C9A96E]">the Roastery</em>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-3 text-[#C9A96E] font-mono-custom text-[10px] tracking-[0.25em] uppercase hover:text-[#E8CC8A] transition-colors pb-2 border-b border-[#C9A96E]/30 hover:border-[#C9A96E]">
            Read All Entries <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {POSTS.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group cursor-pointer flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden border border-[#C9A96E]/20 relative">
                <img 
                  src={post.img} 
                  alt={post.title}
                  className="w-full h-full object-cover filter brightness-75 sepia-[0.1] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-4 pt-2">
                <div className="flex items-center gap-3 font-mono-custom text-[9px] uppercase tracking-widest text-[#7A6F65]">
                  <span className="text-[#C9A96E]">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-[#EDE4D6] leading-tight group-hover:text-[#C9A96E] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#7A6F65] font-light text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[#C9A96E] font-mono-custom text-[10px] tracking-[0.2em] uppercase group-hover:translate-x-2 transition-transform">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
