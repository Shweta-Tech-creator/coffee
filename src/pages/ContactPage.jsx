import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C9A96E', '#E8CC8A', '#8C7040']
    });
  };

  return (
    <div className="pt-28 bg-[#08060A] min-h-screen text-[#EDE4D6]">
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[#C9A96E]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block">Inquiries</span>
          <h1 className="font-display text-5xl sm:text-7xl font-light">
            Get in <em className="text-[#C9A96E]">Touch.</em>
          </h1>
          <p className="text-[#9E9283] font-light text-lg">
            We welcome wholesale inquiries, event bookings, and feedback from coffee lovers worldwide.
          </p>
        </motion.div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-28 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]">Contact Information</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A96E]/15 text-[#C9A96E] font-mono-custom text-[9px] uppercase tracking-widest border border-[#C9A96E]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open Today
              </span>
            </div>

            <div className="space-y-6 font-mono-custom text-xs text-[#7A6F65]">
              <div className="flex items-start gap-4 p-6 border border-[#C9A96E]/15 bg-[#0E0C12]">
                <MapPin className="text-[#C9A96E] shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-display text-lg text-[#EDE4D6] mb-1">Visit Our Roastery</h4>
                  <p>42 Artisan Way, Victorian Quarter, London, UK</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-[#C9A96E]/15 bg-[#0E0C12]">
                <Phone className="text-[#C9A96E] shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-display text-lg text-[#EDE4D6] mb-1">Direct Line</h4>
                  <p>+44 (0) 20 7946 0912</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-[#C9A96E]/15 bg-[#0E0C12]">
                <Mail className="text-[#C9A96E] shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-display text-lg text-[#EDE4D6] mb-1">Email Inquiry</h4>
                  <p>hello@beanhaven.co.uk</p>
                </div>
              </div>
            </div>

            {/* Transit Directions */}
            <div className="p-6 border border-[#C9A96E]/15 bg-[#0E0C12] space-y-3 font-mono-custom text-xs text-[#7A6F65]">
              <h4 className="font-display text-lg text-[#EDE4D6] flex items-center gap-2">
                <Navigation size={16} className="text-[#C9A96E]" /> Getting Here
              </h4>
              <p>• <strong>Underground:</strong> 3-min walk from Victorian Quarter Station (Central & District Lines)</p>
              <p>• <strong>Bicycle:</strong> On-site secure bike racks available right outside our courtyard</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-10 border border-[#C9A96E]/20 bg-[#0E0C12]">
            {submitted ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#C9A96E] mx-auto mb-4" />
                <h3 className="font-display text-3xl text-[#EDE4D6] font-light mb-2">Message Received</h3>
                <p className="text-[#7A6F65] font-mono-custom text-xs leading-relaxed max-w-sm mx-auto mb-6">
                  Thank you for reaching out. A member of our concierge team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.2em] uppercase font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <span className="font-mono-custom text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] block mb-6">Send Message</span>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Your Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Wholesale inquiry / Table booking..."
                    className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="font-mono-custom text-[10px] uppercase text-[#7A6F65] tracking-widest block mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you?"
                    className="w-full bg-[#08060A] border border-[#C9A96E]/20 px-4 py-3 text-[#EDE4D6] font-light focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Wholesale Partnership CTA */}
      <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[#C9A96E]/15">
        <div className="bg-[#0E0C12] border border-[#C9A96E]/20 p-12 text-center max-w-4xl mx-auto space-y-6">
          <Coffee size={32} className="text-[#C9A96E] mx-auto" />
          <h3 className="font-display text-4xl text-[#EDE4D6] font-light">Wholesale Coffee Partnerships</h3>
          <p className="font-mono-custom text-xs text-[#7A6F65] max-w-xl mx-auto leading-relaxed">
            We supply selected Michelin-starred restaurants, luxury boutique hotels, and speciality coffee bars with custom roast profiles, barista training, and equipment servicing.
          </p>
          <a
            href="mailto:wholesale@beanhaven.co.uk"
            className="inline-block px-8 py-3.5 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#E8CC8A] transition-colors"
          >
            Inquire For Wholesale
          </a>
        </div>
      </section>
    </div>
  );
};
