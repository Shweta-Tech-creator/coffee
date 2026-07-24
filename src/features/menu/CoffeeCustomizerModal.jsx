import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../checkout/CartContext';
import confetti from 'canvas-confetti';

export const CoffeeCustomizerModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [milk, setMilk] = useState('Organic Oat Milk');
  const [roast, setRoast] = useState('Medium Roasted');
  const [sweetness, setSweetness] = useState('50% Sweetness');
  const [extraShot, setExtraShot] = useState(false);

  if (!product) return null;

  const finalPrice = product.price + (extraShot ? 1.00 : 0);

  const handleAdd = () => {
    const customizedProduct = {
      ...product,
      id: `${product.id}-${Date.now()}`,
      name: `${product.name} (${milk.split(' ')[0]})`,
      price: finalPrice,
      customizations: { milk, roast, sweetness, extraShot }
    };
    addToCart(customizedProduct);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, colors: ['var(--accent)', 'var(--highlight)'] });
    onClose();
  };

  const milkOptions = ['Organic Oat Milk', 'Almond Milk', 'Whole Dairy Milk', 'Coconut Milk'];
  const roastOptions = ['Light Floral Roast', 'Medium Roasted', 'Dark Chocolate Roast'];
  const sweetnessOptions = ['Unsweetened (0%)', '25% Mild', '50% Standard', '100% Rich Sweet'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] bg-[var(--bg)]/85 backdrop-blur-md flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative max-w-xl w-full bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--accent)]/30 z-10 p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl border border-[var(--accent)]/20 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-4">
            <img
              src={product.img || product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-2xl border border-[var(--accent)]/30"
            />
            <div>
              <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--accent)] font-semibold block mb-1">
                Customizing Brew
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)] font-medium">
                {product.name}
              </h3>
              <p className="font-display text-xl text-[var(--accent)] font-semibold mt-1">
                ${finalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1">
            {/* Milk Option */}
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted)] font-medium block mb-2.5">
                1. Milk Selection
              </label>
              <div className="grid grid-cols-2 gap-2">
                {milkOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setMilk(opt)}
                    className={`py-2.5 px-3 rounded-xl font-mono-custom text-xs transition-all text-left flex items-center justify-between border ${
                      milk === opt
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] font-bold shadow-sm'
                        : 'bg-[var(--bg)] text-[var(--muted)] border-[var(--accent)]/15 hover:text-[var(--text)]'
                    }`}
                  >
                    <span>{opt}</span>
                    {milk === opt && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Strength */}
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted)] font-medium block mb-2.5">
                2. Bean Roast Profile
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roastOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRoast(opt)}
                    className={`py-2.5 px-2 rounded-xl font-mono-custom text-xs transition-all text-center border ${
                      roast === opt
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] font-bold shadow-sm'
                        : 'bg-[var(--bg)] text-[var(--muted)] border-[var(--accent)]/15 hover:text-[var(--text)]'
                    }`}
                  >
                    {opt.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness */}
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted)] font-medium block mb-2.5">
                3. Sweetness & Syrup Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sweetnessOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSweetness(opt)}
                    className={`py-2.5 px-3 rounded-xl font-mono-custom text-xs transition-all text-left border ${
                      sweetness === opt
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] font-bold shadow-sm'
                        : 'bg-[var(--bg)] text-[var(--muted)] border-[var(--accent)]/15 hover:text-[var(--text)]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Shot Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setExtraShot(!extraShot)}
                className={`w-full p-3.5 rounded-xl border font-mono-custom text-xs flex items-center justify-between transition-all ${
                  extraShot
                    ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-semibold'
                    : 'border-[var(--accent)]/15 bg-[var(--bg)] text-[var(--muted)]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles size={14} className="text-[var(--accent)]" />
                  <span>Add Extra Ristretto Espresso Shot (+$1.00)</span>
                </div>
                <span className="font-bold">{extraShot ? 'ADDED' : '+ ADD'}</span>
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleAdd}
            className="w-full py-4 bg-[var(--accent)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs tracking-wider uppercase font-bold hover:bg-[var(--highlight)] transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[var(--accent)]/20"
          >
            <ShoppingBag size={14} />
            <span>Add Customized Order (${finalPrice.toFixed(2)})</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
