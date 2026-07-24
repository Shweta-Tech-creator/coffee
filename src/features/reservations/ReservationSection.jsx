import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const TABLES = [
  { id: 'T1', type: 'Window Booth', seats: '2 Guests', desc: 'Panoramic street view, soft velvet booth seating' },
  { id: 'T2', type: 'Bar Counter', seats: '1-2 Guests', desc: 'Front-row view of barista pour overs & espresso dialing' },
  { id: 'T3', type: 'Central Oak Table', seats: '4 Guests', desc: 'Hand-carved Danish oak, warm ambient pendant lighting' },
  { id: 'T4', type: 'Private Lounge', seats: '6 Guests', desc: 'Secluded corner with plush leather armchairs' }
];

export const ReservationSection = () => {
  const [selectedTable, setSelectedTable] = useState('T1');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00',
    guests: '2 Guests',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B8935A', '#FFD700', '#C9A96E']
    });
  };

  return (
    <section id="reservation" className="relative py-24 bg-[var(--bg)] overflow-hidden border-t border-[var(--accent)]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[var(--accent)]" />
            <span className="font-mono-custom text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold">
              Sensory Sanctuary
            </span>
            <span className="h-px w-8 bg-[var(--accent)]" />
          </div>
          <h2 className="font-display text-4xl lg:text-6xl text-[var(--text)] font-light">
            Reserve Your <span className="text-[var(--accent)] italic">Table.</span>
          </h2>
          <p className="text-[var(--muted)] font-light text-base max-w-lg mx-auto mt-3">
            Select your preferred ambiance and reserve a dedicated moment for artisanal coffee.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto p-10 border border-[var(--accent)]/30 bg-[var(--surface)] rounded-3xl text-center shadow-2xl"
          >
            <CheckCircle2 className="w-16 h-16 text-[var(--accent)] mx-auto mb-5" />
            <h3 className="font-display text-3xl text-[var(--text)] font-medium mb-3">Reservation Confirmed</h3>
            <p className="text-[var(--muted)] font-light text-base mb-6">
              We look forward to welcoming you, <span className="text-[var(--accent)] font-medium">{formData.name}</span>. A confirmation details email has been sent.
            </p>
            <div className="inline-block p-5 border border-[var(--accent)]/20 bg-[var(--bg)] rounded-2xl text-left font-mono-custom text-xs text-[var(--muted)] space-y-2 mb-8 w-full max-w-md">
              <p><span className="text-[var(--accent)] font-semibold">Table:</span> {TABLES.find(t => t.id === selectedTable)?.type}</p>
              <p><span className="text-[var(--accent)] font-semibold">Date & Time:</span> {formData.date || 'Today'} at {formData.time}</p>
              <p><span className="text-[var(--accent)] font-semibold">Party Size:</span> {formData.guests}</p>
            </div>
            <div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-mono-custom text-xs font-bold hover:bg-[var(--highlight)] transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Table Floorplan Selector */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[var(--accent)] font-semibold block mb-4">
                1. Select Table Ambiance
              </span>
              {TABLES.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTable(t.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    selectedTable === t.id
                      ? 'border-[var(--accent)] bg-[var(--surface)] shadow-lg shadow-[var(--accent)]/10'
                      : 'border-[var(--accent)]/15 bg-[var(--surface)] hover:border-[var(--accent)]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-display text-xl text-[var(--text)] font-medium">{t.type}</h4>
                    <span className="font-mono-custom text-xs text-[var(--accent)] font-semibold">{t.seats}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] font-light leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 border border-[var(--accent)]/20 bg-[var(--surface)] rounded-3xl shadow-xl">
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[var(--accent)] font-semibold block mb-6">
                2. Your Reservation Info
              </span>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Marcus Vance"
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Date *</label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--muted)] font-light focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Time *</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Guests *</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-medium">Special Requests</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Dietary preferences, anniversary celebrations..."
                    className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--accent)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs tracking-wider uppercase font-bold hover:bg-[var(--highlight)] transition-colors shadow-md shadow-[var(--accent)]/20"
                >
                  Confirm Table Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
