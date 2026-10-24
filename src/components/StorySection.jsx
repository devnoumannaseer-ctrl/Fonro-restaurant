import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Award } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function StorySection() {
  return (
    <section id="story" className="story-section" aria-label="Our Story and Heritage">
      <div className="story-container">
        <div className="story-grid">
          {/* Left Column: Atmospheric Fast Food Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="story-visual"
          >
            <div className="story-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
                alt="Chacha Cheezy molten cheese pull pizza"
                className="story-image"
                loading="lazy"
              />
              <div className="story-image-overlay" />
            </div>

            {/* Decorative Stamp */}
            <div className="story-decorative-seal">
              <span className="seal-tag">Loaded with Cheese.</span>
              <span className="seal-tag seal-tag--warm">Served Hot & Fresh.</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="story-content"
          >
            <div className="section-eyebrow">
              <span>LAHORE'S FAVORITE CHEEZY CORNER</span>
            </div>

            <h2 className="section-title story-heading">
              The Story of Chacha Cheezy.
            </h2>

            <p className="story-lead">
              Born from a pure passion for unbeatable cheese pulls, crunchy golden fillets, and unforgettable fast food, Chacha Cheezy has captured the hearts of Lahore’s food lovers.
            </p>

            <p className="story-text">
              Located in Punjab Cooperative Housing Society (PCHS), Block F, Lahore, we make zero compromises. Every pizza starts with fresh daily-fermented dough hand-tossed to order, topped with generous mountains of real mozzarella and cheddar cheese. Our Zinger fillets are freshly hand-breaded and fried on order, accompanied by our signature fiery garlic cheese sauce.
            </p>

            {/* Heritage Metrics */}
            <div className="story-specs">
              <div className="spec-card">
                <span className="spec-number">100%</span>
                <span className="spec-label">Real Mozzarella</span>
              </div>
              <div className="spec-card">
                <span className="spec-number">Fresh</span>
                <span className="spec-label">Fried to Order Zingers</span>
              </div>
              <div className="spec-card">
                <span className="spec-number">2 AM</span>
                <span className="spec-label">Late Night Delivery</span>
              </div>
            </div>

            <div className="story-quote">
              <p>“Never hold back on the cheese. Every slice should stretch, every bite should crunch.”</p>
              <cite>— The Chacha Cheezy Promise</cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
