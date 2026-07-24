import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Navigation, Coffee } from 'lucide-react';
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
      colors: ['#C9A96E', '#B8935A', '#FFD700']
    });
  };

  return (
    <div className="pt-28 bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto border-b border-[var(--primary)]/15 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <span className="font-mono-custom text-[var(--primary)] text-xs tracking-[0.25em] uppercase font-semibold block">Inquiries</span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[var(--text)]">
            Get in <span className="text-[var(--primary)] italic">Touch.</span>
          </h1>
          <p className="text-[var(--muted)] font-light text-base leading-relaxed">
            We welcome wholesale inquiries, event bookings, and coffee lovers everywhere.
          </p>
        </motion.div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[var(--primary)] font-semibold">Contact Details</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] font-mono-custom text-xs font-semibold rounded-full border border-[var(--primary)]/25">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Open Today
              </span>
            </div>

            <div className="space-y-3">
              {[
                { icon: <MapPin size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />, title: 'Visit Our Roastery', detail: '42 Artisan Way, Victorian Quarter, London, UK' },
                { icon: <Phone size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />, title: 'Direct Line', detail: '+44 (0) 20 7946 0912' },
                { icon: <Mail size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />, title: 'Email Inquiry', detail: 'hello@beanhaven.co.uk' },
              ].map(({ icon, title, detail }) => (
                <div key={title} className="flex items-start gap-4 p-5 border border-[var(--primary)]/15 bg-[var(--surface)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  {icon}
                  <div>
                    <h4 className="font-display text-base text-[var(--text)] font-semibold mb-0.5">{title}</h4>
                    <p className="text-sm text-[var(--muted)] font-light">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Directions */}
            <div className="p-5 border border-[var(--primary)]/15 bg-[var(--surface)] rounded-2xl space-y-2 text-sm text-[var(--muted)] font-light shadow-sm">
              <h4 className="font-display text-base text-[var(--text)] font-semibold flex items-center gap-2">
                <Navigation size={16} className="text-[var(--primary)]" /> Getting Here
              </h4>
              <p>• <strong className="text-[var(--text)] font-semibold">Underground:</strong> 3-min walk from Victorian Quarter Station</p>
              <p>• <strong className="text-[var(--text)] font-semibold">Bicycle:</strong> Secure bike racks in our courtyard</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 border border-[var(--primary)]/15 bg-[var(--surface)] rounded-3xl shadow-xl shadow-[var(--primary)]/5">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-[var(--primary)] mx-auto mb-4" />
                <h3 className="font-display text-3xl text-[var(--text)] font-medium mb-2">Message Received</h3>
                <p className="text-[var(--muted)] font-light text-sm max-w-sm mx-auto mb-6">
                  Thank you for reaching out. We will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-mono-custom text-xs font-bold hover:bg-[var(--secondary)] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[var(--primary)] font-semibold block mb-4">
                  Send a Message
                </span>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-semibold">Your Name *</label>
                    <input
                      required type="text" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[var(--bg)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-semibold">Your Email *</label>
                    <input
                      required type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-[var(--bg)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-semibold">Subject</label>
                  <input
                    type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Wholesale inquiry / Event booking..."
                    className="w-full bg-[var(--bg)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono-custom text-xs uppercase text-[var(--muted)] tracking-wider block mb-2 font-semibold">Message *</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you?"
                    className="w-full bg-[var(--bg)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-[var(--text)] font-light focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--primary)] text-white rounded-2xl font-mono-custom text-xs tracking-wider uppercase font-bold hover:bg-[var(--secondary)] transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--primary)]/20 hover:-translate-y-0.5"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Wholesale Partnership CTA */}
      <section className="py-20 px-6 lg:px-20 max-w-[1440px] mx-auto border-t border-[var(--primary)]/10">
        <div className="bg-[var(--surface)] border border-[var(--primary)]/20 rounded-3xl p-10 text-center max-w-3xl mx-auto space-y-4 shadow-lg shadow-[var(--primary)]/5">
          <Coffee size={32} className="text-[var(--primary)] mx-auto" />
          <h3 className="font-display text-3xl text-[var(--text)] font-medium">Wholesale Coffee Partnerships</h3>
          <p className="text-sm text-[var(--muted)] font-light max-w-lg mx-auto leading-relaxed">
            We supply restaurants, boutique hotels, and specialty coffee bars with custom roast profiles and barista training.
          </p>
          <a
            href="mailto:wholesale@beanhaven.co.uk"
            className="inline-block px-8 py-3.5 bg-[var(--primary)] text-white rounded-2xl font-mono-custom text-xs font-bold hover:bg-[var(--secondary)] transition-all shadow-md shadow-[var(--primary)]/20 hover:-translate-y-0.5"
          >
            Inquire For Wholesale
          </a>
        </div>
      </section>
    </div>
  );
};
