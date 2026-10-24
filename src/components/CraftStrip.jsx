import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Utensils, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function CraftStrip() {
  const getIcon = (id) => {
    switch (id) {
      case 'cheese':
        return <Sparkles size={20} strokeWidth={1.8} />;
      case 'crispy':
        return <Flame size={20} strokeWidth={1.8} />;
      case 'fresh':
        return <Utensils size={20} strokeWidth={1.8} />;
      default:
        return <Sparkles size={20} strokeWidth={1.8} />;
    }
  };

  return (
    <section id="craft" className="craft-strip-section" aria-label="Our Cheezy Principles">
      <div className="craft-container">
        <div className="craft-grid">
          {restaurantConfig.craftPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="craft-card"
            >
              <div className="craft-card__header">
                <span className="craft-card__number">{pillar.accent}</span>
                <div className="craft-card__icon-box">
                  {getIcon(pillar.id)}
                </div>
              </div>
              <h3 className="craft-card__title">{pillar.title}</h3>
              <p className="craft-card__description">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
