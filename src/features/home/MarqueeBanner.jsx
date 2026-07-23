import React from 'react';

const ITEMS = [
  'Handcrafted Artisanal Coffee',
  'Single-Origin Arabica',
  'Nordic Hygge Bakehouse',
  'Award-Winning Baristas',
  'Organic Sourdough',
  'Ethically Sourced',
  'Precision Extraction',
  'Seasonal Menus',
];

export const MarqueeBanner = () => (
  <div className="relative overflow-hidden border-y border-[#C9A96E]/12 bg-[#0A0810] py-5">
    <div className="flex whitespace-nowrap animate-marquee w-[200%]">
      {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center mx-10 gap-8">
          <span className="font-mono-custom text-[10px] tracking-[0.35em] text-[#5A5040] uppercase">{item}</span>
          <span className="text-[#C9A96E]/30 text-xs">✦</span>
        </span>
      ))}
    </div>
  </div>
);
