import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { ReservationSection } from '../features/reservations/ReservationSection';

const EVENT_TYPES = [
  { title: 'Private Cupping & Tasting Workshop', capacity: 'Up to 12 Guests', desc: 'A 90-minute guided sensory journey comparing Ethiopian, Colombian, and Guatemalan single origins.' },
  { title: 'Full Café Venue Hire', capacity: 'Up to 45 Guests', desc: 'Exclusive access to our Victorian roastery space with custom espresso bar and catering.' },
  { title: 'Barista Espresso Masterclass', capacity: 'Up to 6 Guests', desc: 'Hands-on training in coffee grinding, milk steaming, and pour over extraction chemistry.' }
];

export const ReservationPage = () => {
  return (
    <div className="pt-28 bg-[#08060A] min-h-screen text-[#EDE4D6]">
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[#C9A96E]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">Bookings</span>
          <h1 className="font-display text-5xl sm:text-7xl font-light">
            Interactive <em className="text-[#C9A96E]">Table Reservation.</em>
          </h1>
          <p className="text-[#9E9283] font-light text-lg">
            Choose your preferred seating arrangement and enjoy a reserved sensory coffee experience.
          </p>
        </motion.div>
      </section>

      {/* Main Interactive Reservation Form & Floorplan */}
      <ReservationSection />

      {/* Private Events & Masterclasses */}
      <section className="py-28 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-3">Private Gatherings</span>
            <h2 className="font-display text-4xl lg:text-6xl font-light">Workshops & Venue Hire</h2>
          </div>
          <p className="text-[#7A6F65] font-light text-sm max-w-md">
            Host your next corporate meeting, sensory masterclass, or intimate celebration inside Bean Haven.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {EVENT_TYPES.map((evt, i) => (
            <div key={i} className="bg-[#0E0C12] border border-[#C9A96E]/20 p-8 space-y-4">
              <Sparkles size={20} className="text-[#C9A96E]" />
              <h3 className="font-display text-2xl font-light text-[#EDE4D6]">{evt.title}</h3>
              <span className="font-mono-custom text-xs text-[#C9A96E] block">{evt.capacity}</span>
              <p className="font-mono-custom text-xs text-[#7A6F65] leading-relaxed pt-2 border-t border-[#C9A96E]/10">
                {evt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Guidelines */}
      <section className="py-20 px-6 lg:px-20 max-w-4xl mx-auto border-t border-[#C9A96E]/15 font-mono-custom text-xs text-[#7A6F65]">
        <div className="p-8 border border-[#C9A96E]/15 bg-[#0E0C12] space-y-4">
          <h4 className="font-display text-2xl text-[#EDE4D6]">House Rules & Booking Etiquette</h4>
          <p>• Tables are held for 15 minutes past your reserved time slot before being released to walk-in guests.</p>
          <p>• For parties larger than 6 guests, please contact our events concierge directly via hello@beanhaven.co.uk.</p>
          <p>• We accommodate dietary preferences (vegan, gluten-free, nut-free sourdough options available).</p>
        </div>
      </section>
    </div>
  );
};
