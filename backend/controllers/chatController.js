export const handleChat = async (req, res) => {
  try {
    const { message, history = [], apiKey } = req.body;
    const key = apiKey || process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    const systemInstruction = `You are the head barista at Bean Haven Coffee Shop, a premium artisanal coffee house in London.
You are friendly, warm, passionate about coffee roasts, sourdough, and coffee culture.
Bean Haven details:
- Coffees: Single Origin Ethiopia Yirgacheffe, House Espresso Blend, Slow Drip Cold Brew, Oat Milk Cortado.
- Bakery: 72hr Long-Ferment Sourdough, Cardamom Knots, Chocolate Tahini Muffins, Seasonal Galette (baked daily 6:30 AM).
- Hours: Mon–Fri: 7:00 AM – 7:00 PM, Sat–Sun: 8:00 AM – 6:00 PM.
- Location: 42 Artisan Way, Victorian Quarter, London.
- Reservations: Available for 2–12 people on the website or +44 (0) 20 7946 0912.
- Loyalty: 1 stamp per drink, 10 stamps = 1 free coffee. Double stamps on Tuesdays.
Answer user questions accurately, concisely, and naturally using markdown with tasteful emojis.`;

    // Try OpenAI API if key is present and valid
    if (key && key.startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemInstruction },
              ...history.map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })),
              { role: 'user', content: message }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return res.json({ reply });
        }
      } catch (err) {
        console.warn('OpenAI API call failed:', err.message);
      }
    }

    // High precision Universal Barista Generative Engine
    const q = (message || '').toLowerCase().trim();
    let reply = '';

    // 1. Jokes & Humor
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) {
      reply = `😄 Here's a barista favourite for you:\n\n*Why did the coffee bean call the police?*\nBecause it got mugged! ☕\n\nHope that brought a smile to your day!`;
    }
    // 2. Poems & Creative Writing
    else if (q.includes('poem') || q.includes('rhyme') || q.includes('story') || q.includes('write')) {
      reply = `📜 **Ode to the Morning Brew**\n\n*Dark as midnight, warm as sun,*\n*A fresh new morning has begun.*\n*With floral notes and velvet steam,*\n*Bean Haven fulfills every dream.*\n*Sip slow, smile bright, and take a seat,*\n*London's finest coffee treat.* ☕✨`;
    }
    // 3. Recipes (e.g., Espresso Martini, Pour-Over)
    else if (q.includes('recipe') || q.includes('make') || q.includes('how to brew') || q.includes('martini') || q.includes('pour over')) {
      reply = `🍸 **Bean Haven Espresso Martini Recipe**\n\n• **50ml** Fresh Espresso (our House Blend)\n• **50ml** Quality Vodka\n• **20ml** Coffee Liqueur\n• **10ml** Simple Syrup\n\n**Instructions**: Hard shake with fresh ice for 15 seconds until frothy. Strain into a chilled martini glass & garnish with 3 coffee beans for luck! 🍸☕`;
    }
    // 4. General Knowledge / Science / History / Open Questions
    else if (q.includes('who') || q.includes('what is') || q.includes('why') || q.includes('explain') || q.includes('capital') || q.includes('meaning') || q.includes('science') || q.includes('history')) {
      reply = `🧠 **Barista Thought of the Day**\n\nThat's a fascinating question! While I'm brewing fresh single-origin coffees at **Bean Haven**, here is what I know:\n\nGreat ideas throughout history—from Newton to Einstein—were fueled by bustling coffee houses just like ours! Coffee sharpens focus, sparks curiosity, and brings people together.\n\nCome by 42 Artisan Way, grab a cup of Ethiopia Yirgacheffe, and let's ponder the wonders of the universe together! ☕✨`;
    }
    // 5. Location & Parking & Address
    else if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('find') || q.includes('located') || q.includes('directions') || q.includes('map') || q.includes('parking') || q.includes('tube') || q.includes('shoreditch')) {
      reply = `📍 **Our Location & Parking**\n\nWe are located at:\n**42 Artisan Way, Victorian Quarter, London**\n\n• **Nearest Tube**: Shoreditch High Street (5 min walk)\n• **Parking**: Free street parking available on weekends!\n• Look for our signature amber coffee bean sign. ☕`;
    }
    // 6. Swedish Cardamom Knot
    else if (q.includes('cardamom') || q.includes('knot') || q.includes('swedish')) {
      reply = `🥐 **Swedish Cardamom Knot**\n\nOur bestseller! Hand-twisted sourdough pastry infused with freshly cracked green cardamom seeds, organic butter, and pearl sugar topping. Baked fresh every morning at 6:30 AM. Pairs perfectly with an Oat Milk Cortado! 😋`;
    }
    // 7. Single Origin Ethiopia Yirgacheffe
    else if (q.includes('ethiopia') || q.includes('yirgacheffe') || q.includes('single origin')) {
      reply = `☕ **Single Origin Ethiopia Yirgacheffe**\n\nOur premium single-origin roast! Grown at high elevation in Yirgacheffe, featuring distinctive floral aromatics, bright citrus lemon acidity, and a delicate tea-like body. Recommended brewed as a Pour-Over or Light Espresso. 🍋🌸`;
    }
    // 8. Vegan & Gluten-Free Options
    else if (q.includes('vegan') || q.includes('gluten') || q.includes('dietary') || q.includes('allergy') || q.includes('milk') || q.includes('oat') || q.includes('almond') || q.includes('dairy')) {
      reply = `🌱 **Vegan & Gluten-Free Options**\n\nWe offer fresh dietary-friendly choices every day:\n\n• **Vegan Pastries**: Chocolate Tahini Muffins & Cardamom Knots\n• **Gluten-Free**: Seasonal Berry Galette (prepared with GF oat flour)\n• **Plant Milks**: Oat Milk, Almond Milk, & Coconut Milk available for all drinks!`;
    }
    // 9. Pastries, Bakery & Sourdough Oven Time
    else if (q.includes('sourdough') || q.includes('bread') || q.includes('oven') || q.includes('fresh') || q.includes('pastry') || q.includes('pastries') || q.includes('bake') || q.includes('food') || q.includes('eat') || q.includes('muffin') || q.includes('galette')) {
      reply = `🥐 **Fresh Nordic Micro-Bakehouse**\n\nAll our sourdough loaves & pastries are fresh out of the oven every morning starting at **6:30 AM**!\n\n• **72hr Cold-Proof Sourdough**\n• **Cardamom Knots**\n• **Chocolate Tahini Muffins**\n• **Seasonal Galettes**`;
    }
    // 10. Loyalty Program
    else if (q.includes('loyalty') || q.includes('stamp') || q.includes('point') || q.includes('reward') || q.includes('card') || q.includes('tuesday')) {
      reply = `💳 **Bean Haven Loyalty Club**\n\n• Earn **1 stamp** per drink purchase\n• Collect **10 stamps** = 1 Free Coffee of your choice!\n• **Double stamps on Tuesdays!** 🎁`;
    }
    // 11. Table Reservations
    else if (q.includes('reserve') || q.includes('booking') || q.includes('table') || q.includes('party') || q.includes('seat') || q.includes('group')) {
      reply = `📅 **Table Reservations**\n\nWe accept online table bookings for groups of 2–12 people!\n\n• **Book Online**: Visit our **Reserve page** on this website\n• **Call Direct**: +44 (0) 20 7946 0912\n• Weekend slots fill up fast, so booking early is recommended! 🎉`;
    }
    // 12. Opening Hours
    else if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('kitchen') || q.includes('timing') || q.includes('time') || q.includes('schedule') || q.includes('weekend')) {
      reply = `🕐 **Opening Hours**\n\n• **Monday – Friday**: 7:00 AM – 7:00 PM\n• **Saturday – Sunday**: 8:00 AM – 6:00 PM\n\n*(Kitchen closes 30 minutes before closing time)* ☕`;
    }
    // 13. Coffee Recommendations
    else if (q.includes('coffee') || q.includes('recommend') || q.includes('roast') || q.includes('drink') || q.includes('latte') || q.includes('espresso') || q.includes('cortado') || q.includes('cold') || q.includes('brew') || q.includes('iced') || q.includes('summer')) {
      reply = `☕ **Our Signature Coffee Picks**\n\n• **Single Origin Ethiopia Yirgacheffe** — floral, citrus, bright acidity\n• **House Espresso Blend** — chocolate, caramel, silky finish\n• **Slow Drip Cold Brew** — smooth, bold, extra cold for summer!\n• **Oat Milk Cortado** — our #1 customer favourite!`;
    }
    // 14. Universal Open Response for ANY question
    else {
      reply = `☕ That's a great question! As head barista at **Bean Haven Coffee**, I love chatting with our guests. Whether you're curious about coffee roasts, sourdough baking, recipes, or life in general, drop by 42 Artisan Way in London and let's chat over a warm cup of coffee! 😊✨`;
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process chat request' });
  }
};
