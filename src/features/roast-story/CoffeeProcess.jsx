import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  {
    num: '01', title: 'Origin Selection',
    sub: 'Farm-direct sourcing',
    body: 'Our head roaster travels twice yearly — cupping hundreds of lots, choosing only the top 5% by altitude, flavor complexity, and farmer relationship.',
    detail: 'Ethiopia · Colombia · Guatemala · Yemen · Indonesia',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
  },
  {
    num: '02', title: 'Artisan Roasting',
    sub: 'Probat drum · small batch',
    body: 'Our 12kg Probat drum allows full manual control. Each roast profile is developed over weeks of cupping until it\'s dialled in to exactly where we want it.',
    detail: '12kg batches · weekly roasts · full manual profiling',
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800&q=85',
  },
  {
    num: '03', title: 'Precision Brewing',
    sub: 'Science meets craft',
    body: 'Every method is calibrated using refractometry — targeting TDS 1.2-1.5% and extraction yield 18-22%. Our baristas are craftspeople who understand both.',
    detail: 'TDS 1.2–1.5% · Extraction 18–22% · ±0.5°C',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
  },
];

const Step = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
      {/* Image */}
      <motion.div
        className={`relative flex items-center justify-center p-8 lg:p-16 bg-[var(--bg)] overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.img
          src={step.img}
          alt={step.title}
          className="w-full max-w-[450px] aspect-[4/3] object-cover border border-[var(--primary)]/20"
          style={{ y: imgY }}
        />
        <div className="absolute top-4 right-8 lg:top-8 lg:right-12">
          <span className="font-display text-[80px] lg:text-[120px] text-white/5 font-light leading-none select-none">
            {step.num}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`flex flex-col justify-center bg-[var(--bg)] px-10 lg:px-16 py-16 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono-custom text-[var(--primary)]/40 text-[10px] tracking-[0.4em]">{step.num}</span>
          <div className="h-px flex-1 bg-[var(--primary)]/10" />
          <span className="font-mono-custom text-[var(--muted)] text-[10px] tracking-[0.3em] uppercase">{step.sub}</span>
        </div>

        <h3 className="font-display text-4xl lg:text-5xl text-[var(--text)] font-light mb-6 leading-tight">
          {step.title}
        </h3>

        <p className="text-[var(--muted)] font-light leading-relaxed text-base mb-8">{step.body}</p>

        <div className="pl-4 border-l border-[var(--primary)]/30">
          <p className="font-mono-custom text-[10px] text-[var(--muted)] tracking-wide">{step.detail}</p>
        </div>
      </motion.div>
    </div>
  );
};

export const CoffeeProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" ref={ref} className="bg-[var(--bg)]">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[var(--primary)]" />
              <span className="font-mono-custom text-[var(--primary)] text-[10px] tracking-[0.4em] uppercase">The Craft</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl text-[var(--text)] font-light leading-[1.05]">
              From Bean<br /><em className="text-[var(--primary)]">to Cup.</em>
            </h2>
          </div>
          <p className="text-[var(--muted)] font-light max-w-sm leading-relaxed">
            A cup of coffee tells the story of a thousand careful decisions. Here's how ours gets made.
          </p>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="border-t border-[var(--primary)]/8">
        {STEPS.map((step, i) => (
          <div key={i} className="border-b border-[var(--primary)]/8">
            <Step step={step} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};
