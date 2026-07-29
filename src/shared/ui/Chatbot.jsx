import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Coffee, Sparkles } from 'lucide-react';

const BOT_NAME = 'Barista AI';

const SUGGESTED_QUESTIONS = [
  { label: 'What coffee do you recommend?', icon: '☕', key: 'coffee' },
  { label: 'What pastries are available?', icon: '🥐', key: 'food' },
  { label: 'How do I reserve a table?', icon: '📅', key: 'reserve' },
  { label: 'What are your opening hours?', icon: '🕐', key: 'hours' },
  { label: 'Where are you located?', icon: '📍', key: 'location' },
  { label: 'Tell me about the loyalty card', icon: '💳', key: 'loyalty' },
];

const BOT_RESPONSES = {
  coffee: `☕ Our signature picks:\n\n• **Single Origin Ethiopia Yirgacheffe** — floral, citrus, bright acidity\n• **House Espresso Blend** — chocolate, caramel, silky finish\n• **Slow Drip Cold Brew** — smooth, bold, extra cold\n• **Oat Milk Cortado** — our bestseller!\n\nWould you like to place an order? 😊`,
  food: `🥐 Fresh from our Nordic micro-bakehouse:\n\n• **Long-Ferment Sourdough** — 72hr cold-proof\n• **Cardamom Knot** — Swedish inspired\n• **Chocolate Tahini Muffin** — crowd favourite\n• **Seasonal Galette** — changes weekly\n\nAll baked fresh each morning from 6:30 AM!`,
  reserve: `📅 To reserve a table, visit our **Reserve page** or call us directly!\n\n📞 +44 (0) 20 7946 0912\n\nWe accept bookings for groups of 2–12. Weekend slots fill up fast — book early! 🎉`,
  hours: `🕐 We're open every day:\n\n**Mon – Fri**: 7:00 AM – 7:00 PM\n**Sat – Sun**: 8:00 AM – 6:00 PM\n\nKitchen closes 30 mins before closing time. ☕`,
  location: `📍 Find us at:\n\n**42 Artisan Way, Victorian Quarter, London**\n\nNearest tube: Shoreditch High Street (5 min walk)\nFree parking available on weekends!\n\nLook for the amber coffee bean sign. 😄`,
  loyalty: `💳 Join our **Bean Haven Loyalty Club**!\n\n• Earn 1 stamp per purchase\n• 10 stamps = 1 free drink\n• Double stamps on Tuesdays!\n• Members get early access to seasonal specials\n\nAsk any barista to sign you up today. 🎁`,
  default: `Hi there! I'm your Bean Haven Barista AI. How can I help you today? Pick a question below or type your own! ☕`,
};

function parseText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-[var(--primary)] font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, messages]);

  const addBotMessage = (text) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text, time: new Date() }]);
    }, 600);
  };

  const handleQuestion = (key, label) => {
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: label, time: new Date() }]);
    addBotMessage(BOT_RESPONSES[key] || BOT_RESPONSES.default);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: userMsg, time: new Date() }]);

    const lower = userMsg.toLowerCase();
    let response = BOT_RESPONSES.default;
    if (lower.includes('coffee') || lower.includes('espresso') || lower.includes('latte') || lower.includes('cappuccino')) response = BOT_RESPONSES.coffee;
    else if (lower.includes('food') || lower.includes('bread') || lower.includes('pastry') || lower.includes('cake') || lower.includes('sourdough') || lower.includes('eat')) response = BOT_RESPONSES.food;
    else if (lower.includes('reserve') || lower.includes('book') || lower.includes('table') || lower.includes('seat')) response = BOT_RESPONSES.reserve;
    else if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) response = BOT_RESPONSES.hours;
    else if (lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('find')) response = BOT_RESPONSES.location;
    else if (lower.includes('loyalty') || lower.includes('stamp') || lower.includes('reward') || lower.includes('points')) response = BOT_RESPONSES.loyalty;
    addBotMessage(response);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Barista Chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            data-lenis-prevent
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[199] w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--primary)]/20"
            style={{ background: 'var(--bg)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-[var(--primary)]/15" style={{ background: 'var(--surface)' }}>
              <div className="w-10 h-10 bg-[var(--primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Coffee size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-display text-base font-semibold text-[var(--text)]">{BOT_NAME}</p>
                <p className="text-[10px] text-[var(--muted)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                  Online now
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1 rounded-lg hover:bg-[var(--primary)]/10">
                <X size={18} />
              </button>
            </div>

            {/* Messages & Suggested Questions */}
            <div
              className="h-[380px] overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: 'thin', overscrollBehavior: 'contain' }}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Welcome message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Welcome card */}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Coffee size={13} className="text-white" />
                    </div>
                    <div className="bg-[var(--surface)] border border-[var(--primary)]/15 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-[var(--text)] leading-relaxed">
                      Hi there! 👋 I'm your Bean Haven Barista AI. How can I help you today?
                    </div>
                  </div>

                  {/* Suggested questions grid */}
                  <div className="pl-9 space-y-2">
                    <p className="text-[10px] font-mono-custom text-[var(--muted)] uppercase tracking-widest mb-2">Suggested Questions</p>
                    <div className="grid grid-cols-1 gap-2">
                      {SUGGESTED_QUESTIONS.map(({ label, icon, key }) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuestion(key, label)}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 bg-[var(--surface)] border border-[var(--primary)]/15 rounded-xl text-sm text-[var(--text)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-all group"
                        >
                          <span className="text-base">{icon}</span>
                          <span className="flex-1 font-light">{label}</span>
                          <span className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Conversation messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Coffee size={13} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === 'user'
                        ? 'bg-[var(--primary)] text-white rounded-br-sm'
                        : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--primary)]/15 rounded-bl-sm'
                    }`}
                  >
                    {msg.from === 'bot' ? parseText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Suggested questions after conversation */}
              {messages.length > 0 && !typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pl-9 pt-2"
                >
                  <p className="text-[10px] font-mono-custom text-[var(--muted)] uppercase tracking-widest mb-2">Ask another question</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {SUGGESTED_QUESTIONS.map(({ label, icon, key }) => (
                      <button
                        key={key}
                        onClick={() => handleQuestion(key, label)}
                        className="flex items-center gap-2 w-full text-left text-[11px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--primary)]/15 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 px-3 py-2 rounded-xl transition-all"
                      >
                        <span>{icon}</span>
                        <span className="flex-1">{label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-start">
                  <div className="w-7 h-7 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Coffee size={13} className="text-white" />
                  </div>
                  <div className="bg-[var(--surface)] border border-[var(--primary)]/15 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-[var(--primary)]/15" style={{ background: 'var(--surface)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-[var(--bg)] border border-[var(--primary)]/15 rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--muted)]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-[var(--accent)] transition-colors shadow-sm"
              >
                <Send size={15} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
