import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe, Share2, MessageCircle, Coffee } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050407] text-[#EDE4D6] border-t border-[#C9A96E]/15 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20 pt-16 sm:pt-24 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-16 mb-14 sm:mb-20">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Coffee className="text-[#C9A96E]" size={28} />
              <h3 className="font-display text-4xl font-light text-[#EDE4D6]">Bean Haven</h3>
            </div>
            <p className="font-mono-custom text-xs text-[#7A6F65] leading-relaxed max-w-sm">
              Artisan coffee roastery and Nordic micro-bakehouse. Dedicated to uncompromised sourcing, scientific roasting, and sensory stillness.
            </p>
            <div className="flex items-center gap-4 text-[#C9A96E]">
              <a href="#" className="p-2 border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-colors"><Globe size={16} /></a>
              <a href="#" className="p-2 border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-colors"><Share2 size={16} /></a>
              <a href="#" className="p-2 border border-[#C9A96E]/20 hover:border-[#C9A96E] transition-colors"><MessageCircle size={16} /></a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">Location & Hours</span>
            <div className="space-y-3 font-mono-custom text-xs text-[#7A6F65]">
              <p className="flex items-center gap-3"><MapPin size={14} className="text-[#C9A96E]" /> 42 Artisan Way, Victorian Quarter, London</p>
              <p className="flex items-center gap-3"><Phone size={14} className="text-[#C9A96E]" /> +44 (0) 20 7946 0912</p>
              <p className="flex items-center gap-3"><Mail size={14} className="text-[#C9A96E]" /> hello@beanhaven.co.uk</p>
              <p className="flex items-center gap-3"><Clock size={14} className="text-[#C9A96E]" /> Mon-Sun: 07:00 AM – 07:00 PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">The Gazette</span>
            <p className="font-mono-custom text-xs text-[#7A6F65]">Receive exclusive micro-lot release notes and cupping event invitations.</p>

            {subscribed ? (
              <p className="font-mono-custom text-xs text-[#C9A96E]">Thank you for subscribing to our Gazette.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border border-[#C9A96E]/30">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="bg-transparent px-4 py-3 text-xs text-[#EDE4D6] focus:outline-none flex-1 font-mono-custom"
                />
                <button type="submit" className="px-5 bg-[#C9A96E] text-[#08060A] hover:bg-[#E8CC8A] transition-colors">
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-[#C9A96E]/10 flex flex-col sm:flex-row justify-between items-center font-mono-custom text-[10px] text-[#5A5040] gap-4">
          <p>© {new Date().getFullYear()} Bean Haven Café & Roastery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C9A96E]">Privacy Policy</a>
            <a href="#" className="hover:text-[#C9A96E]">Terms of Service</a>
            <a href="#" className="hover:text-[#C9A96E]">SCA Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
