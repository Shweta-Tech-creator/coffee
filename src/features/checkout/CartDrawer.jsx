import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, AlertCircle, Clock, MapPin, Phone, User, Mail, Coffee, Truck } from 'lucide-react';
import { useCart } from './CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Tracker State
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [trackerStage, setTrackerStage] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    let timers = [];
    if (isCheckedOut) {
      timers.push(setTimeout(() => setTrackerStage(1), 2000));
      timers.push(setTimeout(() => setTrackerStage(2), 5000));
    }
    return () => timers.forEach(t => clearTimeout(t));
  }, [isCheckedOut]);

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setCheckoutError('Please complete all delivery details.');
      return;
    }

    setIsSubmitting(true);
    setCheckoutError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          deliveryAddress,
          items,
          subtotal
        })
      });

      if (!response.ok) {
        throw new Error('Failed to place order.');
      }

      const data = await response.json();
      setEstimatedTime(data.estimatedPrepTime || 15);
      
      setIsCheckedOut(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B8935A', '#FFD700', '#C9A96E']
      });
    } catch (err) {
      setCheckoutError('Order transmission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (isCheckedOut) {
        clearCart();
        setIsCheckedOut(false);
        setTrackerStage(0);
        setEstimatedTime(null);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setDeliveryAddress('');
      }
      setCheckoutError('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[var(--bg)]/80 backdrop-blur-md z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--surface)] border-l border-[var(--accent)]/20 z-[201] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[var(--accent)]/15">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-[var(--accent)]" />
                  <h3 className="font-display text-2xl text-[var(--text)] font-medium">
                    {isCheckedOut ? 'Order Tracker' : 'Your Order Tray'}
                  </h3>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors rounded-xl hover:bg-[var(--surface)]"
                >
                  <X size={20} />
                </button>
              </div>

              {isCheckedOut ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 flex flex-col h-full"
                >
                  <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-[var(--accent)] mx-auto mb-3" />
                    <h4 className="font-display text-3xl text-[var(--text)] font-medium mb-1">Order Confirmed</h4>
                    <div className="flex items-center justify-center gap-2 text-[var(--accent)] font-mono-custom text-xs font-semibold">
                      <Clock size={14} />
                      <span>Estimated Arrival: {estimatedTime} mins</span>
                    </div>
                  </div>

                  {/* Tracker Timeline */}
                  <div className="relative space-y-6 pl-4 before:absolute before:inset-0 before:left-3.5 before:h-full before:w-0.5 before:bg-[var(--accent)]/30">
                    <div className="relative flex items-start gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${trackerStage >= 0 ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface)] text-[var(--muted)]'}`}>
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <h5 className="font-mono-custom text-xs uppercase font-bold text-[var(--text)]">Order Received</h5>
                        <p className="text-xs text-[var(--muted)]">Transmitted to barista.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${trackerStage >= 1 ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface)] text-[var(--muted)]'}`}>
                        <Coffee size={14} />
                      </div>
                      <div>
                        <h5 className="font-mono-custom text-xs uppercase font-bold text-[var(--text)]">Brewing & Extracting</h5>
                        <p className="text-xs text-[var(--muted)]">Dialing in single origin espresso.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${trackerStage >= 2 ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface)] text-[var(--muted)]'}`}>
                        <Truck size={14} />
                      </div>
                      <div>
                        <h5 className="font-mono-custom text-xs uppercase font-bold text-[var(--text)]">Out For Delivery</h5>
                        <p className="text-xs text-[var(--muted)]">On the way to {deliveryAddress || 'your location'}.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center">
                    <button
                      onClick={closeDrawer}
                      className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-xl font-mono-custom text-xs font-bold"
                    >
                      Close Tracker
                    </button>
                  </div>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="py-20 text-center">
                  <ShoppingBag size={44} className="text-[var(--accent)]/30 mx-auto mb-3" />
                  <p className="font-display text-2xl text-[var(--text)] font-medium mb-1">Your Tray is Empty</p>
                  <p className="text-xs text-[var(--muted)]">Select artisanal coffee or sourdough items from the menu.</p>
                </div>
              ) : (
                <div className="py-5 space-y-4 max-h-[35vh] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-[var(--accent)]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-[var(--accent)]/20 bg-[var(--surface)]" />
                        <div>
                          <h4 className="font-display text-base text-[var(--text)] font-medium">{item.name}</h4>
                          <p className="font-mono-custom text-xs text-[var(--accent)] font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[var(--accent)]/20 rounded-lg overflow-hidden bg-[var(--bg)]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[var(--muted)] hover:text-[var(--text)]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono-custom text-xs text-[var(--text)] px-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[var(--muted)] hover:text-[var(--text)]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[var(--muted)] hover:text-red-400 p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout Form */}
            {!isCheckedOut && items.length > 0 && (
              <div className="pt-5 border-t border-[var(--accent)]/15 space-y-4">
                <h4 className="font-mono-custom text-xs text-[var(--accent)] uppercase tracking-wider font-semibold">Delivery Details</h4>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl text-[var(--text)] pl-10 pr-4 py-2.5 font-mono-custom text-xs focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl text-[var(--text)] pl-10 pr-4 py-2.5 font-mono-custom text-xs focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl text-[var(--text)] pl-10 pr-4 py-2.5 font-mono-custom text-xs focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-[var(--muted)] w-4 h-4" />
                    <textarea 
                      placeholder="Delivery Address" 
                      rows="2"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--accent)]/20 rounded-xl text-[var(--text)] pl-10 pr-4 py-2.5 font-mono-custom text-xs focus:outline-none focus:border-[var(--accent)] resize-none"
                    />
                  </div>
                </div>

                {checkoutError && (
                  <div className="flex items-center gap-2 text-red-400 font-mono-custom text-xs">
                    <AlertCircle size={12} />
                    {checkoutError}
                  </div>
                )}

                <div className="flex justify-between items-center font-display text-xl text-[var(--text)]">
                  <span>Subtotal</span>
                  <span className="text-[var(--accent)] font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className={`w-full py-3.5 bg-[var(--accent)] text-[var(--bg)] rounded-2xl font-mono-custom text-xs tracking-wider uppercase font-bold hover:bg-[var(--highlight)] transition-colors flex justify-center items-center shadow-lg shadow-[var(--accent)]/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
