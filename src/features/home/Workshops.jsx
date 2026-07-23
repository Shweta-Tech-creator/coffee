import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Coffee, Users } from 'lucide-react';

const SESSIONS = [
  {
    icon: Coffee,
    title: 'Sensory Cupping',
    desc: 'Learn the SCA protocol for evaluating coffee. Taste 6 distinct origins and identify flavor notes.',
    date: 'Every Saturday, 10 AM',
  },
  {
    icon: Users,
    title: 'Home Brew Masterclass',
    desc: 'Dial in your V60 and AeroPress technique with our head roaster. Includes a 250g bag of beans.',
    date: 'Bi-Weekly Sundays, 2 PM',
  },
  {
    icon: CalendarDays,
    title: 'Latte Art Fundamentals',
    desc: 'Master milk texturing and pour basic patterns (heart, rosetta, tulip) on our La Marzocco Linea.',
    date: 'First Thursday of Month',
  }
];

export const Workshops = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#08060A] border-t border-[#C9A96E]/15">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20 text-center">
        <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-4">
          Community
        </span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE4D6] mb-16">
          Master the <em className="text-[#C9A96E]">Craft</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {SESSIONS.map((session, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#0E0C12] border border-[#C9A96E]/20 p-8 sm:p-10 text-left hover:border-[#C9A96E]/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-[#C9A96E]/30 flex items-center justify-center mb-6 text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#08060A] transition-colors">
                <session.icon size={20} />
              </div>
              <h3 className="font-display text-2xl text-[#EDE4D6] mb-3">{session.title}</h3>
              <p className="text-[#7A6F65] font-light text-sm leading-relaxed mb-8">
                {session.desc}
              </p>
              <div className="pt-4 border-t border-[#C9A96E]/10">
                <p className="font-mono-custom text-[10px] text-[#C9A96E] tracking-widest uppercase">
                  {session.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-transparent border border-[#C9A96E] text-[#C9A96E] font-mono-custom text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#C9A96E] hover:text-[#08060A] transition-colors">
            View Full Calendar
          </button>
        </div>
      </div>
    </section>
  );
};
