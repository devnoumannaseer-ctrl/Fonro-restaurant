import React from 'react';
import { ArrowUp, MessageSquare, Facebook } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const msg = encodeURIComponent("Hello Chacha Cheezy! I'd like to place an order or inquire about your deals.");
    window.open(`https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Top Tier */}
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="pato-brand-box footer-brand-pill">
              <span className="pato-brand-title">{restaurantConfig.brandName}</span>
              <span className="pato-brand-subtitle">FAST FOOD & PIZZA</span>
            </div>
            <p className="footer-tagline">“{restaurantConfig.tagline}”</p>
            <p className="footer-sub">
              Famous Crown Crust Pizzas, crunchy Zinger Burgers, Cheezy Loaded Fries, and oven-baked pastas.
            </p>
            <div className="footer-actions-wrap">
              <button
                onClick={handleWhatsAppClick}
                className="btn btn--whatsapp btn--compact"
              >
                <MessageSquare size={14} />
                <span>WhatsApp: 0307 4242727</span>
              </button>
              <a
                href={restaurantConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary btn--compact"
              >
                <Facebook size={14} />
                <span>Official Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-col">
            <h4 className="footer-col__title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')}>Cheezy Menu</a>
              </li>
              <li>
                <a href={restaurantConfig.facebookUrl} target="_blank" rel="noreferrer">Facebook Page</a>
              </li>
              <li>
                <a href="#story" onClick={(e) => handleNavClick(e, '#story')}>Our Story</a>
              </li>
              <li>
                <a href="#craft" onClick={(e) => handleNavClick(e, '#craft')}>The Cheezy Craft</a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>Kitchen Gallery</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Location & Hotline</a>
              </li>
            </ul>
          </div>

          {/* Location Details */}
          <div className="footer-col">
            <h4 className="footer-col__title">Branch Location</h4>
            <p className="footer-text"><strong>Address:</strong> E-45, Block F, Punjab Cooperative Housing Society (PCHS), Lahore</p>
            <p className="footer-text footer-text--highlight">Hotline: {restaurantConfig.contact.phoneDisplay}</p>
            <p className="footer-text">WhatsApp: +92 307 4242727</p>
            <span className="footer-badge">Daily Open 2:00 PM – 2:00 AM (Fri from 4 PM)</span>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="footer-bottom">
          <div className="footer-bottom__left">
            <p className="copyright-text">
              © {currentYear} {restaurantConfig.brandName}. All rights reserved.
            </p>
            <p className="footer-disclaimer">
              Follow our official Facebook page for everyday flash deals & mega pizza combos.
            </p>
          </div>

          <div className="footer-bottom__right">
            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
