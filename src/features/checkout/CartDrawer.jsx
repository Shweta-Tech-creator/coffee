import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, AlertCircle, Clock, MapPin, Phone, User, Mail, Coffee, Truck } from 'lucide-react';
import { useCart } from './CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  
  // Checkout Form State
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

  // Animate tracker stages after checkout
  useEffect(() => {
    let timers = [];
    if (isCheckedOut) {
      // Stage 0: Order Received (Immediate)
      // Stage 1: Preparing (after 2s)
      timers.push(setTimeout(() => setTrackerStage(1), 2000));
      // Stage 2: Ready / Out for delivery (after 5s for demo purposes)
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
        colors: ['#C9A96E', '#E8CC8A', '#8C7040']
      });
    } catch (err) {
      setCheckoutError('Order transmission failed. Please try again or check connection.');
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
            className="fixed inset-0 bg-[#08060A]/80 backdrop-blur-md z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0E0C12] border-l border-[#C9A96E]/20 z-[201] p-8 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C9A96E]/15">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-[#C9A96E]" />
                  <h3 className="font-display text-2xl text-[#EDE4D6] font-light">
                    {isCheckedOut ? 'Order Status' : 'Order Selection'}
                  </h3>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 text-[#7A6F65] hover:text-[#EDE4D6] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {isCheckedOut ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 flex flex-col h-full"
                >
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[#C9A96E] mx-auto mb-4" />
                    </motion.div>
                    <h4 className="font-display text-3xl text-[#EDE4D6] font-light mb-2">Order Confirmed</h4>
                    <div className="flex items-center justify-center gap-2 text-[#C9A96E] font-mono-custom text-xs">
                      <Clock size={14} />
                      <span>Estimated Arrival: {estimatedTime} mins</span>
                    </div>
                  </div>

                  {/* Live Tracker Timeline */}
                  <div className="relative space-y-8 pl-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#C9A96E]/40 before:to-transparent">
                    {/* Stage 0 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${trackerStage >= 0 ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A]' : 'bg-[#08060A] border-[#7A6F65] text-[#7A6F65]'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500`}>
                        <CheckCircle size={14} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] px-4">
                        <h5 className={`font-mono-custom text-[10px] tracking-widest uppercase font-bold ${trackerStage >= 0 ? 'text-[#EDE4D6]' : 'text-[#7A6F65]'}`}>Order Received</h5>
                        <p className="text-[10px] text-[#7A6F65] mt-1">Transmitted to head barista.</p>
                      </div>
                    </div>

                    {/* Stage 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${trackerStage >= 1 ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A]' : 'bg-[#08060A] border-[#7A6F65] text-[#7A6F65]'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500`}>
                        {trackerStage === 1 ? (
                           <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                             <Coffee size={14} />
                           </motion.div>
                        ) : <Coffee size={14} />}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] px-4">
                        <h5 className={`font-mono-custom text-[10px] tracking-widest uppercase font-bold ${trackerStage >= 1 ? 'text-[#EDE4D6]' : 'text-[#7A6F65]'}`}>Grinding & Extracting</h5>
                        <p className="text-[10px] text-[#7A6F65] mt-1">Dialing in your espresso.</p>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${trackerStage >= 2 ? 'bg-[#C9A96E] border-[#C9A96E] text-[#08060A]' : 'bg-[#08060A] border-[#7A6F65] text-[#7A6F65]'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500`}>
                        <Truck size={14} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] px-4">
                        <h5 className={`font-mono-custom text-[10px] tracking-widest uppercase font-bold ${trackerStage >= 2 ? 'text-[#EDE4D6]' : 'text-[#7A6F65]'}`}>Out For Delivery</h5>
                        <p className="text-[10px] text-[#7A6F65] mt-1">Speeding to {deliveryAddress || 'your address'}.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={closeDrawer}
                      className="px-6 py-3 border border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#08060A] transition-colors font-mono-custom text-[10px] tracking-[0.2em] uppercase font-bold"
                    >
                      Close Tracker
                    </button>
                  </div>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="py-24 text-center">
                  <ShoppingBag size={48} className="text-[#C9A96E]/20 mx-auto mb-4" />
                  <p className="font-display text-2xl text-[#EDE4D6] font-light mb-2">Your Tray is Empty</p>
                  <p className="font-mono-custom text-xs text-[#7A6F65]">Explore our artisanal single-origin menu to add items.</p>
                </div>
              ) : (
                <div className="py-6 space-y-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-[#C9A96E]/10 pb-4">
                      <div className="flex items-center gap-4">
                        <img src={item.img} alt={item.name} className="w-12 h-12 object-cover border border-[#C9A96E]/20" />
                        <div>
                          <h4 className="font-display text-sm text-[#EDE4D6] font-light">{item.name}</h4>
                          <p className="font-mono-custom text-[10px] text-[#C9A96E]">${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#C9A96E]/20">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#7A6F65] hover:text-[#EDE4D6]"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-mono-custom text-[10px] text-[#EDE4D6] px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#7A6F65] hover:text-[#EDE4D6]"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#7A6F65] hover:text-red-400">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout Details */}
            {!isCheckedOut && items.length > 0 && (
              <div className="pt-6 border-t border-[#C9A96E]/15">
                <h4 className="font-mono-custom text-[10px] text-[#C9A96E] uppercase tracking-widest mb-4">Delivery Details</h4>
                {/* Form Fields */}
                <div className="space-y-3 mb-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6F65] w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 text-[#EDE4D6] pl-10 pr-4 py-3 font-mono-custom text-xs focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6F65] w-4 h-4" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 text-[#EDE4D6] pl-10 pr-4 py-3 font-mono-custom text-xs focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6F65] w-4 h-4" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 text-[#EDE4D6] pl-10 pr-4 py-3 font-mono-custom text-xs focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6F65] w-4 h-4" />
                    <textarea 
                      placeholder="Delivery Address" 
                      rows="2"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[#08060A] border border-[#C9A96E]/20 text-[#EDE4D6] pl-10 pr-4 py-3 font-mono-custom text-xs focus:outline-none focus:border-[#C9A96E]/60 transition-colors resize-none"
                    />
                  </div>
                </div>

                {checkoutError && (
                  <div className="flex items-center gap-2 text-red-400 font-mono-custom text-[10px] mb-4">
                    <AlertCircle size={12} />
                    {checkoutError}
                  </div>
                )}

                <div className="flex justify-between items-center font-display text-xl text-[#EDE4D6] mb-4">
                  <span>Subtotal</span>
                  <span className="text-[#C9A96E]">${subtotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-[#C9A96E] text-[#08060A] font-mono-custom text-[10px] tracking-[0.3em] uppercase font-bold transition-colors flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#E8CC8A]'}`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#08060A] border-t-transparent rounded-full"
                    />
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
