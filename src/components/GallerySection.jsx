import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { galleryItems } from '../data/menu';

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="gallery" className="gallery-section" aria-label="Visual Gallery">
      <div className="gallery-container">
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span>THE ATMOSPHERE</span>
          </div>
          <h2 className="section-title">Scenes from the Fire.</h2>
          <p className="section-subtitle">
            A glimpse into the flour, flame, and unhurried rhythm of our kitchen.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`gallery-card gallery-card--${item.aspect}`}
              onClick={() => setActivePhoto(item)}
            >
              <div className="gallery-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-card__overlay">
                  <div className="gallery-card__info">
                    <h3 className="gallery-card__title">{item.title}</h3>
                    <p className="gallery-card__caption">{item.caption}</p>
                  </div>
                  <button
                    className="gallery-card__zoom-btn"
                    aria-label={`Enlarge photo: ${item.title}`}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="lightbox-close"
                aria-label="Close Lightbox"
              >
                <X size={22} />
              </button>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                <h4>{activePhoto.title}</h4>
                <p>{activePhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
