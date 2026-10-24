import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Phone, Facebook } from 'lucide-react';
import { signatureMenu, menuCategories } from '../data/menu';
import { restaurantConfig } from '../data/restaurant';
import MenuCard from './MenuCard';

export default function MenuSection({ onAddToCart, activeCategory, onSelectCategory }) {
  const [localCategory, setLocalCategory] = useState('all');

  const selectedCat = activeCategory !== undefined ? activeCategory : localCategory;
  const setSelectedCat = onSelectCategory || setLocalCategory;

  const filteredItems = selectedCat === 'all'
    ? signatureMenu
    : signatureMenu.filter((item) => item.category === selectedCat);

  const handleWhatsAppInquiry = () => {
    const msg = encodeURIComponent("Hello Chacha Cheezy! I would like to place a delivery order from your menu.");
    window.open(`https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu" className="menu-section" aria-label="Chacha Cheezy Menu">
      <div className="menu-container">
        {/* Editorial Section Header */}
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            <span>CHACHA CHEEZY OFFICIAL MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Loaded with Flavor. Dripping in Cheese.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Lahore's favorite Cheezy Crown Crust Pizzas, crunchy monster Zinger Burgers, jumbo Cheezy Loaded Fries, and piping-hot baked pastas.
          </motion.p>

          {/* Interactive Category Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="menu-filter-chips-wrap"
            role="tablist"
            aria-label="Filter dishes by category"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCat === cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`filter-chip ${selectedCat === cat.id ? 'filter-chip--active' : ''}`}
              >
                <span>{cat.label}</span>
                {cat.id !== 'all' && (
                  <span className="chip-count">
                    {signatureMenu.filter(m => m.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Menu Cards Grid */}
        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              pizza={item}
              onAddToCart={onAddToCart}
              index={index}
            />
          ))}
        </div>

        {/* Direct WhatsApp & Facebook Callout Banner */}
        <div className="forno-direct-banner">
          <div className="forno-banner-info">
            <span className="forno-banner-tag">OFFICIAL CHACHA CHEEZY DELIVERY & TAKEAWAY</span>
            <h3>Craving hot pizzas, crispy zingers, and loaded fries?</h3>
            <p>Order directly via WhatsApp or call our PCHS Lahore hotline at <strong>0307 4242727</strong> for fast delivery right to your door.</p>
          </div>
          <div className="forno-banner-actions">
            <button
              onClick={handleWhatsAppInquiry}
              className="btn btn--whatsapp"
            >
              <MessageSquare size={17} />
              <span>WhatsApp: 0307 4242727</span>
            </button>
            <a
              href={restaurantConfig.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              <Facebook size={16} />
              <span>Visit Facebook Page</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
