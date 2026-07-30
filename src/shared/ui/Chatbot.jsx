import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Coffee } from 'lucide-react';

const BOT_NAME = 'Bean Haven Barista';

const SUGGESTED_QUESTIONS = [
  { label: 'What coffee do you recommend?', icon: '☕', key: 'coffee' },
  { label: 'What pastries are available?', icon: '🥐', key: 'food' },
  { label: 'How do I reserve a table?', icon: '📅', key: 'reserve' },
  { label: 'What are your opening hours?', icon: '🕐', key: 'hours' },
];

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
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [open, messages, typing]);

  const generateSmartAnswer = (userPrompt) => {
    const q = (userPrompt || '').toLowerCase().trim();

    // 1. Jokes & Humor
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) {
      return `😄 Here's a barista favourite for you:\n\n*Why did the coffee bean call the police?*\nBecause it got mugged! ☕\n\nHope that brought a smile to your day!`;
    }

    // 2. Poems & Creative Writing
    if (q.includes('poem') || q.includes('rhyme') || q.includes('story') || q.includes('write')) {
      return `📜 **Ode to the Morning Brew**\n\n*Dark as midnight, warm as sun,*\n*A fresh new morning has begun.*\n*With floral notes and velvet steam,*\n*Bean Haven fulfills every dream.*\n*Sip slow, smile bright, and take a seat,*\n*London's finest coffee treat.* ☕✨`;
    }

    // 3. Recipes (e.g., Espresso Martini, Pour-Over)
    if (q.includes('recipe') || q.includes('make') || q.includes('how to brew') || q.includes('martini') || q.includes('pour over')) {
      return `🍸 **Bean Haven Espresso Martini Recipe**\n\n• **50ml** Fresh Espresso (our House Blend)\n• **50ml** Quality Vodka\n• **20ml** Coffee Liqueur\n• **10ml** Simple Syrup\n\n**Instructions**: Hard shake with fresh ice for 15 seconds until frothy. Strain into a chilled martini glass & garnish with 3 coffee beans for luck! 🍸☕`;
    }

    // 4. General Knowledge / Science / History / Open Questions
    if (q.includes('who') || q.includes('what is') || q.includes('why') || q.includes('explain') || q.includes('capital') || q.includes('meaning') || q.includes('science') || q.includes('history')) {
      return `🧠 **Barista Thought of the Day**\n\nThat's a fascinating question! While I'm brewing fresh single-origin coffees at **Bean Haven**, here is what I know:\n\nGreat ideas throughout history—from Newton to Einstein—were fueled by bustling coffee houses just like ours! Coffee sharpens focus, sparks curiosity, and brings people together.\n\nCome by 42 Artisan Way, grab a cup of Ethiopia Yirgacheffe, and let's ponder the wonders of the universe together! ☕✨`;
    }

    // 5. Location & Parking & Address
    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('find') || q.includes('located') || q.includes('directions') || q.includes('map') || q.includes('parking') || q.includes('tube') || q.includes('shoreditch')) {
      return `📍 **Our Location & Parking**\n\nWe are located at:\n**42 Artisan Way, Victorian Quarter, London**\n\n• **Nearest Tube**: Shoreditch High Street (5 min walk)\n• **Parking**: Free street parking available on weekends!\n• Look for our signature amber coffee bean sign. ☕`;
    }

    // 6. Swedish Cardamom Knot
    if (q.includes('cardamom') || q.includes('knot') || q.includes('swedish')) {
      return `🥐 **Swedish Cardamom Knot**\n\nOur bestseller! Hand-twisted sourdough pastry infused with freshly cracked green cardamom seeds, organic butter, and pearl sugar topping. Baked fresh every morning at 6:30 AM. Pairs perfectly with an Oat Milk Cortado! 😋`;
    }

    // 7. Single Origin Ethiopia Yirgacheffe
    if (q.includes('ethiopia') || q.includes('yirgacheffe') || q.includes('single origin')) {
      return `☕ **Single Origin Ethiopia Yirgacheffe**\n\nOur premium single-origin roast! Grown at high elevation in Yirgacheffe, featuring distinctive floral aromatics, bright citrus lemon acidity, and a delicate tea-like body. Recommended brewed as a Pour-Over or Light Espresso. 🍋🌸`;
    }

    // 8. Vegan & Gluten-Free Options
    if (q.includes('vegan') || q.includes('gluten') || q.includes('dietary') || q.includes('allergy') || q.includes('milk') || q.includes('oat') || q.includes('almond') || q.includes('dairy')) {
      return `🌱 **Vegan & Gluten-Free Options**\n\nWe offer fresh dietary-friendly choices every day:\n\n• **Vegan Pastries**: Chocolate Tahini Muffins & Cardamom Knots\n• **Gluten-Free**: Seasonal Berry Galette (prepared with GF oat flour)\n• **Plant Milks**: Oat Milk, Almond Milk, & Coconut Milk available for all drinks!`;
    }

    // 9. Pastries, Bakery & Sourdough Oven Time
    if (q.includes('sourdough') || q.includes('bread') || q.includes('oven') || q.includes('fresh') || q.includes('pastry') || q.includes('pastries') || q.includes('bake') || q.includes('food') || q.includes('eat') || q.includes('muffin') || q.includes('galette')) {
      return `🥐 **Fresh Nordic Micro-Bakehouse**\n\nAll our sourdough loaves & pastries are fresh out of the oven every morning starting at **6:30 AM**!\n\n• **72hr Cold-Proof Sourdough**\n• **Cardamom Knots**\n• **Chocolate Tahini Muffins**\n• **Seasonal Galettes**`;
    }

    // 10. Loyalty Program
    if (q.includes('loyalty') || q.includes('stamp') || q.includes('point') || q.includes('reward') || q.includes('card') || q.includes('tuesday')) {
      return `💳 **Bean Haven Loyalty Club**\n\n• Earn **1 stamp** per drink purchase\n• Collect **10 stamps** = 1 Free Coffee of your choice!\n• **Double stamps on Tuesdays!** 🎁`;
    }

    // 11. Table Reservations
    if (q.includes('reserve') || q.includes('booking') || q.includes('table') || q.includes('party') || q.includes('seat') || q.includes('group')) {
      return `📅 **Table Reservations**\n\nWe accept online table bookings for groups of 2–12 people!\n\n• **Book Online**: Visit our **Reserve page** on this website\n• **Call Direct**: +44 (0) 20 7946 0912\n• Weekend slots fill up fast, so booking early is recommended! 🎉`;
    }

    // 12. Opening Hours
    if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('kitchen') || q.includes('timing') || q.includes('time') || q.includes('schedule') || q.includes('weekend')) {
      return `🕐 **Opening Hours**\n\n• **Monday – Friday**: 7:00 AM – 7:00 PM\n• **Saturday – Sunday**: 8:00 AM – 6:00 PM\n\n*(Kitchen closes 30 minutes before closing time)* ☕`;
    }

    // 13. Coffee Recommendations
    if (q.includes('coffee') || q.includes('recommend') || q.includes('roast') || q.includes('drink') || q.includes('latte') || q.includes('espresso') || q.includes('cortado') || q.includes('cold') || q.includes('brew') || q.includes('iced') || q.includes('summer')) {
      return `☕ **Our Signature Coffee Picks**\n\n• **Single Origin Ethiopia Yirgacheffe** — floral, citrus, bright acidity\n• **House Espresso Blend** — chocolate, caramel, silky finish\n• **Slow Drip Cold Brew** — smooth, bold, extra cold for summer!\n• **Oat Milk Cortado** — our #1 customer favourite!`;
    }

    // 14. Universal Open Response for ANY question
    return `☕ That's a great question! As head barista at **Bean Haven Coffee**, I love chatting with our guests. Whether you're curious about coffee roasts, sourdough baking, recipes, or life in general, drop by 42 Artisan Way in London and let's chat over a warm cup of coffee! 😊✨`;
  };

  const fetchRealAIResponse = async (userPrompt, history) => {
    // Ultra-fast 300ms timeout for backend call to guarantee instant response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userPrompt, history }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch (e) {
      clearTimeout(timeoutId);
    }

    // Return instant smart contextual answer
    return generateSmartAnswer(userPrompt);
  };

  const handleQuestion = async (key, label) => {
    const userMsg = { id: Date.now(), from: 'user', text: label, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const reply = await fetchRealAIResponse(label, messages);
    
    // Instant 100ms response feel
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date() }]);
    }, 100);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const userMsg = input.trim();
    setInput('');

    const newMsg = { id: Date.now(), from: 'user', text: userMsg, time: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setTyping(true);

    const reply = await fetchRealAIResponse(userMsg, messages);
    
    // Instant 100ms response feel
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date() }]);
    }, 100);
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

              <button
                onClick={() => setOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1 rounded-lg hover:bg-[var(--primary)]/10"
              >
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
                      Hi there! 👋 I'm your Bean Haven Barista. How can I help you today?
                    </div>
                  </div>

                  {/* Suggested questions grid (Only 4 questions) */}
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

              {/* Suggested questions after conversation (Only 4) */}
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
                placeholder="Ask me anything..."
                className="flex-1 bg-[var(--bg)] border border-[var(--primary)]/15 rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--muted)]"
              />
              <motion.button
                type="submit"
                disabled={typing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-[var(--accent)] transition-colors shadow-sm disabled:opacity-50"
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
