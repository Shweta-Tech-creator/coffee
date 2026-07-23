import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
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
      colors: ['#C9A96E', '#E8CC8A', '#8C7040']
    });
  };

  return (
    <section id="reservation" className="relative py-36 bg-[#08060A] overflow-hidden border-t border-[#C9A96E]/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Sensory Sanctuary</span>
            <div className="h-px w-10 bg-[#C9A96E]" />
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-[#EDE4D6] font-light">
            Reserve Your <em className="text-[#C9A96E]">Table.</em>
          </h2>
          <p className="text-[#7A6F65] font-light text-base max-w-xl mx-auto mt-4">
            Select your preferred seating ambiance and reserve a dedicated moment for single-origin precision brews.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto p-12 border border-[#C9A96E]/30 bg-[#0E0C12] text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#C9A96E] mx-auto mb-6" />
            <h3 className="font-display text-4xl text-[#EDE4D6] font-light mb-4">Reservation Confirmed</h3>
            <p className="text-[#9E9283] font-light text-lg mb-6">
              We look forward to welcoming you, <span className="text-[#C9A96E] font-normal">{formData.name}</span>. A confirmation email has been dispatched.
            </p>
            <div className="inline-block p-6 border border-[#C9A96E]/20 bg-[#08060A] text-left font-mono-custom text-xs text-[#7A6F65] space-y-2 mb-8">
              <p><span className="text-[#C9A96E]">Table:</span> {TABLES.find(t => t.id === selectedTable)?.type}</p>
              <p><span className="text-[#C9A96E]">Date & Time:</span> {formData.date || 'Today'} at {formData.time}</p>
              <p><span className="text-[#C9A96E]">Party Size:</span> {formData.guests}</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors"
            >
              Make Another Reservation
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Table Floorplan Selector */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] block mb-4">1. Choose Ambiance</span>
              {TABLES.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTable(t.id)}
                  className={`p-6 border transition-all duration-300 cursor-pointer ${
                    selectedTable === t.id
                      ? 'border-[#C9A96E] bg-[#120F18] shadow-[0_0_20px_rgba(201,169,110,0.15)]'
                      : 'border-[#C9A96E]/15 bg-[#0E0C12] hover:border-[#C9A96E]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-2xl text-[#EDE4D6] font-light">{t.type}</h4>
                    <span className="font-mono-custom text-[10px] text-[#C9A96E] tracking-widest">{t.seats}</span>
                  </div>
                  <p className="font-mono-custom text-[11px] text-[#7A6F65] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-10 border border-[#C9A96E]/20 bg-[#0E0C12]">
              <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] block mb-8">2. Party Details</span>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="E.g. Marcus Vance"
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Date *</label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Time *</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
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
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Guests *</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Special Requests</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Dietary preferences, anniversary celebrations..."
                    className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors"
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
