import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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

      {/* Reservation Etiquette */}
      <section className="py-16 px-6 lg:px-20 max-w-3xl mx-auto">
        <div className="p-6 border border-[var(--primary)]/15 bg-[var(--surface)] rounded-2xl space-y-3 text-sm text-[var(--muted)] font-light shadow-sm">
          <h4 className="font-display text-xl text-[var(--text)] font-semibold">Booking Guidelines</h4>
          <p>• Tables are held for 15 minutes past your reserved time before release.</p>
          <p>• For parties larger than 6 guests, please contact hello@beanhaven.co.uk directly.</p>
        </div>
      </section>
    </div>
  );
};
