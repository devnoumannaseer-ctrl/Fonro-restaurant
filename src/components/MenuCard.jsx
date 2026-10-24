import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MenuCard({ pizza: item, onAddToCart, index }) {
  const [added, setAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(item);
    setAdded(true);

    try {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ['#c85a32', '#df9a57', '#d4af37', '#2e7d32'],
        disableForReducedMotion: true,
      });
    } catch (err) {}

    setTimeout(() => {
      setAdded(false);
    }, 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="menu-card"
    >
      {/* Image container */}
      <div className="menu-card__image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card__image"
          loading="lazy"
        />
        <div className="menu-card__badge-tag">
          {item.badge}
        </div>
        {item.isDesiGhee && (
          <div className="menu-card__spicy-tag" title="Cooked in Pure Desi Ghee">
            <Flame size={13} />
            <span>Desi Ghee</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="menu-card__content">
        <div className="menu-card__top">
          <div className="menu-card__names-row">
            <span className="menu-card__subname">{item.portion}</span>
            {item.urduName && <span className="menu-card__urdu-name">{item.urduName}</span>}
          </div>
          <h3 className="menu-card__title">{item.name}</h3>
          <p className="menu-card__desc">{item.description}</p>
        </div>

        {/* Ingredients / Spices Pills */}
        <div className="menu-card__ingredients">
          {item.ingredients.slice(0, 3).map((ing, idx) => (
            <span key={idx} className="ingredient-pill">
              {ing}
            </span>
          ))}
          {item.ingredients.length > 3 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="ingredient-pill ingredient-pill--more"
              aria-label="Toggle full ingredients"
            >
              +{item.ingredients.length - 3} more
            </button>
          )}
        </div>

        {/* Expanded Drawer */}
        {showDetails && (
          <div className="menu-card__details-drawer">
            <p className="details-heading">Recipe & Spices:</p>
            <ul className="details-list">
              {item.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: Price & CTA */}
        <div className="menu-card__footer">
          <div className="menu-card__price-box">
            <span className="price-currency">{item.currency}</span>
            <span className="price-amount">{item.price.toLocaleString()}</span>
          </div>

          <button
            onClick={handleAdd}
            className={`btn btn--add ${added ? 'btn--add-success' : ''}`}
            aria-label={`Add ${item.name} to order for ${item.currency} ${item.price}`}
          >
            {added ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
