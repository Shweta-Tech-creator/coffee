import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Users, UtensilsCrossed, Gift } from 'lucide-react';
import { ReservationSection } from '../features/reservations/ReservationSection';

const EVENT_TYPES = [
  { title: 'Private Cupping & Tasting', capacity: 'Up to 12 Guests', desc: 'Guided sensory tasting comparing Ethiopian, Colombian, and Guatemalan single origins.' },
  { title: 'Full Venue Hire', capacity: 'Up to 45 Guests', desc: 'Exclusive access to our Victorian roastery space with custom espresso bar.' },
  { title: 'Barista Masterclass', capacity: 'Up to 6 Guests', desc: 'Hands-on training in coffee grinding, milk steaming, and pour over extraction.' }
];

export const ReservationPage = () => {
  return (
    <div className="pt-28 bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[var(--accent)]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block">Bookings</span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[var(--text)]">
            Table <span className="text-[var(--primary)] italic">Reservation.</span>
          </h1>
          <p className="text-[var(--muted)] font-light text-base leading-relaxed">
            Reserve your favorite table and enjoy a dedicated specialty coffee experience.
          </p>
        </motion.div>
      </section>

      {/* Main Interactive Reservation Form */}
      <ReservationSection />

      {/* Private Events */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Private Gatherings</span>
            <h2 className="font-display text-3xl lg:text-5xl font-light text-[var(--text)]">Workshops & Venue Hire</h2>
          </div>
          <p className="text-[var(--muted)] font-light text-sm max-w-sm">
            Host corporate meetings, coffee masterclasses, or private celebrations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {EVENT_TYPES.map((evt, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--primary)]/15 rounded-2xl p-6 space-y-3 hover:border-[var(--primary)]/35 hover:shadow-md transition-all shadow-sm">
              <Sparkles size={20} className="text-[var(--primary)]" />
              <h3 className="font-display text-xl font-medium text-[var(--text)]">{evt.title}</h3>
              <span className="font-mono-custom text-xs text-[var(--primary)] font-medium block">{evt.capacity}</span>
              <p className="text-xs text-[var(--muted)] leading-relaxed pt-2 border-t border-[var(--primary)]/10 font-light">
                {evt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Guidelines */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--accent)]/15">
        <div className="text-center mb-12">
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block mb-2">Good to Know</span>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-[var(--text)]">Booking <span className="text-[var(--primary)] italic">Guidelines</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[
            { Icon: Clock, title: 'Arrival Window', desc: 'Tables are held for 15 minutes past your reserved time before being released to walk-ins.' },
            { Icon: Users, title: 'Large Parties', desc: 'For groups of 7 or more, please email hello@beanhaven.co.uk or call us to arrange seating.' },
            { Icon: UtensilsCrossed, title: 'Dietary Needs', desc: 'Let us know your dietary requirements when booking and we will prepare accordingly.' },
            { Icon: Gift, title: 'Special Occasions', desc: 'Celebrating something special? Add a note to your booking and we will make it memorable.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(201,169,110,0.4)' }}
              className="bg-[var(--surface)] border border-[var(--primary)]/15 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <item.Icon size={20} className="text-[var(--primary)]" />
              </div>
              <h4 className="font-display text-base font-semibold text-[var(--text)]">{item.title}</h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
