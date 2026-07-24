import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Coffee } from 'lucide-react';

// Social Media SVG Icons
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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

  const socialLinks = [
    {
      icon: <WhatsAppIcon />,
      href: 'https://wa.me/442079460912',
      label: 'WhatsApp',
      color: 'hover:bg-[#25D366]/15 hover:text-[#25D366] hover:border-[#25D366]/40',
    },
    {
      icon: <FacebookIcon />,
      href: 'https://facebook.com/beanhavencafe',
      label: 'Facebook',
      color: 'hover:bg-[#1877F2]/15 hover:text-[#1877F2] hover:border-[#1877F2]/40',
    },
    {
      icon: <InstagramIcon />,
      href: 'https://instagram.com/beanhavencafe',
      label: 'Instagram',
      color: 'hover:bg-[#E1306C]/15 hover:text-[#E1306C] hover:border-[#E1306C]/40',
    },
    {
      icon: <TwitterXIcon />,
      href: 'https://twitter.com/beanhavencafe',
      label: 'Twitter / X',
      color: 'hover:bg-[var(--text)]/10 hover:text-[var(--text)] hover:border-[var(--text)]/30',
    },
  ];

  return (
    <footer className="bg-[var(--bg)] text-[var(--text)] border-t border-[var(--primary)]/20 relative overflow-hidden">
      {/* Subtle warm gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" fill="var(--primary)" />
                  <ellipse cx="20" cy="20" rx="9" ry="13" fill="#7C3F00" opacity="0.9" transform="rotate(-20 20 20)"/>
                  <path d="M20 10 Q24 20 20 30" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white leading-tight">Bean Haven</h3>
                <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[var(--primary)]/80">Café & Roastery</span>
              </div>
            </div>

            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Artisan coffee roastery and Nordic micro-bakehouse. Dedicated to uncompromised sourcing, scientific roasting, and sensory stillness.
            </p>

            {/* Social Media Icons */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--primary)] mb-3">Follow Us</p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-2.5 rounded-xl border border-[var(--primary)]/20 text-[var(--muted)] transition-all duration-200 ${color}`}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--primary)]">Location & Hours</span>
            <div className="space-y-3 text-sm text-[var(--muted)]">
              <p className="flex items-start gap-3">
                <MapPin size={15} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                42 Artisan Way, Victorian Quarter, London
              </p>
              <p className="flex items-center gap-3">
                <Phone size={15} className="text-[var(--primary)] flex-shrink-0" />
                <a href="tel:+442079460912" className="hover:text-[var(--primary)] transition-colors">
                  +44 (0) 20 7946 0912
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--primary)] flex-shrink-0" />
                <a href="mailto:hello@beanhaven.co.uk" className="hover:text-[var(--primary)] transition-colors">
                  hello@beanhaven.co.uk
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={15} className="text-[var(--primary)] flex-shrink-0" />
                Mon–Sun: 07:00 AM – 07:00 PM
              </p>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--primary)] mb-3">Quick Links</p>
              <div className="grid grid-cols-2 gap-1.5">
                {['Menu', 'Gallery', 'Reserve', 'Our Story', 'Contact', 'Loyalty Card'].map(link => (
                  <a key={link} href="#" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--primary)]">The Gazette</span>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Receive exclusive micro-lot release notes, seasonal specials, and cupping event invitations.
            </p>

            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[var(--primary)] flex items-center gap-2"
              >
                ✓ Thank you! Welcome to The Gazette.
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex rounded-2xl overflow-hidden border border-[var(--primary)]/30 focus-within:border-[var(--primary)] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="bg-transparent px-4 py-3 text-sm text-white focus:outline-none flex-1 placeholder-[var(--muted)]"
                  style={{ borderRadius: 0 }}
                />
                <button
                  type="submit"
                  className="px-5 bg-[var(--primary)] text-white hover:bg-[var(--accent)] transition-colors flex items-center gap-1.5"
                >
                  <Send size={15} />
                </button>
              </form>
            )}

            {/* App Store / Promise */}
            <div className="mt-2 p-4 rounded-2xl bg-[var(--surface)]/5 border border-white/8">
              <div className="flex items-center gap-3">
                <Coffee size={18} className="text-[var(--primary)]" />
                <div>
                  <p className="text-xs font-semibold text-white">Our Promise</p>
                  <p className="text-xs text-[var(--muted)]">Ethically sourced, freshly roasted, always honest.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[var(--muted)] gap-4">
          <p>© {new Date().getFullYear()} Bean Haven Café & Roastery. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">SCA Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
