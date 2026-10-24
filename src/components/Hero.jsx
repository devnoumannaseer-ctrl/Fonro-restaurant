import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { menuCategories } from '../data/menu';

const DesiCulinaryScene3D = lazy(() => import('./DesiCulinaryScene3D'));

export default function Hero({ onOpenCart, onSelectCategory }) {
  const slides = [
    {
      id: 0,
      script: 'Welcome to',
      title: 'CHACHA CHEEZY',
      subtitle:
        'Lahore\'s craziest Crown Crust Pizzas, crunchy Zinger Burgers, Cheezy Loaded Fries, and melted mozzarella wraps.',
      cta: 'LOOK CHEEZY MENU',
      category: 'all',
    },
    {
      id: 1,
      script: 'Insane Cheese Pull',
      title: 'CROWN CRUST PIZZA',
      subtitle:
        'Stuffed with molten cream cheese & seekh kebab bites, smothered in BBQ chicken, garlic ranch, and golden mozzarella.',
      cta: 'EXPLORE PIZZAS',
      category: 'pizzas',
    },
    {
      id: 2,
      script: 'Crispy & Cheezy',
      title: 'ZINGERS & LOADED FRIES',
      subtitle:
        'Massive crunchy zinger fillets drenched in hot cheese sauce, alongside jumbo loaded fries platters.',
      cta: 'EXPLORE BURGERS & FRIES',
      category: 'burgers',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToMenuWithCategory = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent("Hello Chacha Cheezy! I'd like to check today's pizza & burger deals and place an order.");
    window.open(`https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="pato-hero-section" aria-label="Hero Showcase">
      {/* Background Restaurant Layer */}
      <div className="pato-hero-bg-layer" aria-hidden="true">
        <img
          src="/images/hero-restaurant.jpg"
          alt="Chacha Cheezy Restaurant Ambiance"
          className="pato-hero-bg-img"
        />
        <div className="pato-hero-scrim" />
      </div>

      {/* 3D Background: Interactive 3D Atmosphere */}
      <div className="pato-3d-canvas-container" aria-hidden="true">
        <Suspense
          fallback={
            <div className="pizza-scene-loader">
              <div className="scene-spinner" />
              <span className="scene-loader-text">Melting the Cheese...</span>
            </div>
          }
        >
          <DesiCulinaryScene3D />
        </Suspense>
      </div>

      {/* Foreground Hero Center Content (Pato Place Typography with CHACHA CHEEZY) */}
      <div className="pato-hero-center-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pato-hero-text-block"
          >
            {/* Elegant Calligraphic Script: "Welcome to" */}
            <span className="pato-script-title">{slides[currentSlide].script}</span>

            {/* Big Bold Headline: "CHACHA CHEEZY" */}
            <h1 className="pato-main-heading">{slides[currentSlide].title}</h1>

            <p className="pato-lead-description">
              {slides[currentSlide].subtitle}
            </p>

            {/* Pill CTA Buttons */}
            <div className="pato-cta-row">
              <button
                onClick={() => scrollToMenuWithCategory(slides[currentSlide].category)}
                className="pato-btn-look-menu"
              >
                <span>{slides[currentSlide].cta}</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="pato-btn-order-direct"
              >
                <MessageSquare size={16} />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Arrow Controls */}
      <button
        onClick={prevSlide}
        className="pato-arrow-btn pato-arrow-btn--prev"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="pato-arrow-btn pato-arrow-btn--next"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="pato-pagination-dots" role="tablist" aria-label="Hero Slides">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
            className={`pato-dot ${currentSlide === index ? 'pato-dot--active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Category Chips */}
      <div className="kumo-flavor-switcher" aria-label="Explore Menu Categories">
        <div className="kumo-switcher-header">
          <Sparkles size={13} className="kumo-sparkle-icon" />
          <span>Interactive Cheezy Categories:</span>
        </div>

        <div className="kumo-flavor-pill-list">
          {menuCategories.slice(1, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToMenuWithCategory(cat.id)}
              className="kumo-flavor-pill"
            >
              <span className="kumo-pill-dot" />
              <span className="kumo-pill-name">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
