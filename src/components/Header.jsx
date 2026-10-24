import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, Facebook, Phone } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function Header({ cartCount, onOpenCart, cartTotal, onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'CHEEZY MENU', href: '#menu' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'CRAFT', href: '#craft' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="header-container">
          {/* Pato-style Pill Brand Logo for CHACHA CHEEZY */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, { href: '#hero' })}
            className="pato-brand-badge"
            aria-label="Chacha Cheezy Home"
          >
            <div className="pato-brand-box">
              <span className="pato-brand-title">{restaurantConfig.brandName}</span>
              <span className="pato-brand-subtitle">FAST FOOD & PIZZA</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.label} className="nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions: Facebook Link, Call / WhatsApp & Cart */}
          <div className="header-actions">
            <a
              href={restaurantConfig.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="social-icon-link header-fb-btn"
              aria-label="Chacha Cheezy Facebook"
              title="Official Facebook Page"
            >
              <Facebook size={18} />
            </a>

            <a
              href={`tel:${restaurantConfig.contact.whatsappNumber}`}
              className="btn btn--secondary btn--compact header-res-btn"
            >
              <Phone size={13} />
              <span>0307 4242727</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="cart-toggle-btn"
              aria-label={`Open shopping cart. ${cartCount} items selected`}
            >
              <div className="cart-toggle-btn__icon-wrap">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="cart-badge" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="cart-toggle-btn__text">
                {cartCount > 0 ? `PKR ${cartTotal.toLocaleString()}` : 'Order'}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'mobile-drawer-backdrop--open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />
      <aside
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        aria-label="Mobile Menu"
      >
        <div className="mobile-drawer__header">
          <div className="pato-brand-box">
            <span className="pato-brand-title">{restaurantConfig.brandName}</span>
            <span className="pato-brand-subtitle">FAST FOOD & PIZZA</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer__close"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="mobile-nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={restaurantConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-link"
              >
                Official Facebook Page
              </a>
            </li>
          </ul>
        </nav>

        <div className="mobile-drawer__footer">
          <a
            href={`https://wa.me/${restaurantConfig.contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--whatsapp btn--full"
          >
            WhatsApp Hotline: 0307 4242727
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="btn btn--primary btn--full"
          >
            View Cart ({cartCount})
          </button>
        </div>
      </aside>
    </>
  );
}
