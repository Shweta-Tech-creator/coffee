import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './features/checkout/CartContext';

import { ScrollToTop } from './shared/layout/ScrollToTop';
import { LoadingScreen } from './shared/ui/LoadingScreen';
import { CustomCursor } from './shared/ui/CustomCursor';
import { BackgroundEffects } from './shared/ui/BackgroundEffects';
import { Navbar } from './shared/layout/Navbar';
import { CartDrawer } from './features/checkout/CartDrawer';
import { Footer } from './shared/layout/Footer';
import { PageTransition } from './shared/layout/PageTransition';

// Pages
import { Home } from './pages/Home';
import { StoryPage } from './pages/StoryPage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/story" element={<PageTransition><StoryPage /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/reservation" element={<PageTransition><ReservationPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <CustomCursor />
        <LoadingScreen onComplete={() => setIsLoading(false)} />

        <div className={`min-h-screen relative ${isLoading ? 'h-screen overflow-hidden' : 'overflow-clip'}`}>
          <BackgroundEffects />
          <Navbar />

          <main className="relative z-10">
            <AppRoutes />
          </main>

          <CartDrawer />
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
