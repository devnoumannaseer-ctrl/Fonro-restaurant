import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageSquare, Calendar, ArrowRight, Facebook } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function ContactSection({
  onOpenCart,
  showReservationModal: controlledReservationOpen,
  setShowReservationModal: controlledSetReservationOpen
}) {
  const [internalReservationModal, setInternalReservationModal] = useState(false);
  const showReservationModal = controlledReservationOpen !== undefined ? controlledReservationOpen : internalReservationModal;
  const setShowReservationModal = controlledSetReservationOpen || setInternalReservationModal;

  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    guests: '2',
    notes: 'Hot delivery to home or dine-in',
  });

  const handleWhatsAppGeneralClick = () => {
    const msg = encodeURIComponent(`Hello Chacha Cheezy! I would like to place an order or inquire about your deals.`);
    window.open(`https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setReservationSubmitted(true);
    setTimeout(() => {
      setReservationSubmitted(false);
      setShowReservationModal(false);
    }, 2500);
  };

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="contact-section" aria-label="Visit & Contact Information">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <span>VISIT & CONNECT</span>
          </div>
          <h2 className="section-title">Your Cheezy Feast Awaits.</h2>
          <p className="section-subtitle">
            Dine in with family and friends at our PCHS Lahore branch, or get sizzling fast delivery right to your doorstep.
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="contact-grid">
          {/* Address & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-card"
          >
            <div className="contact-card__icon-box">
              <MapPin size={20} />
            </div>
            <h3 className="contact-card__title">The Branch</h3>
            <p className="contact-card__detail">{restaurantConfig.contact.address}</p>
            <p className="contact-card__detail">{restaurantConfig.contact.city}</p>
            <span className="contact-card__badge">Dine-in & Takeaway</span>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-card"
          >
            <div className="contact-card__icon-box">
              <Clock size={20} />
            </div>
            <h3 className="contact-card__title">Opening Hours</h3>
            <p className="contact-card__detail">{restaurantConfig.contact.hoursWeekday}</p>
            <p className="contact-card__detail">{restaurantConfig.contact.hoursWeekend}</p>
            <span className="contact-card__badge">Late Night Fast Food</span>
          </motion.div>

          {/* Inquiries & Direct Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-card"
          >
            <div className="contact-card__icon-box">
              <Phone size={20} />
            </div>
            <h3 className="contact-card__title">Delivery Hotline</h3>
            <p className="contact-card__detail">{restaurantConfig.contact.phoneDisplay}</p>
            <p className="contact-card__detail">WhatsApp: +92 307 4242727</p>
            <span className="contact-card__badge">Fast Delivery Lahore</span>
          </motion.div>
        </div>

        {/* Action Bar: WhatsApp & Facebook */}
        <div className="contact-actions-banner">
          <div className="banner-content">
            <h3 className="banner-heading">Ready for a Cheezy Feast?</h3>
            <p className="banner-text">
              Order directly via WhatsApp for quick takeaway and delivery across Lahore, or message us directly on our official Facebook page.
            </p>
          </div>

          <div className="banner-buttons">
            <button
              onClick={handleWhatsAppGeneralClick}
              className="btn btn--whatsapp banner-btn"
            >
              <MessageSquare size={18} />
              <span>WhatsApp: 0307 4242727</span>
            </button>

            <a
              href={restaurantConfig.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary banner-btn"
            >
              <Facebook size={18} />
              <span>Facebook Page</span>
            </a>

            <button
              onClick={scrollToMenu}
              className="btn btn--secondary banner-btn"
            >
              <span>Explore Menu</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Booking & Order Inquiries Modal */}
      {showReservationModal && (
        <div className="config-modal-backdrop" onClick={() => setShowReservationModal(false)}>
          <div className="config-modal config-modal--reservation" onClick={(e) => e.stopPropagation()}>
            <div className="config-modal__header">
              <Calendar size={22} className="config-modal__icon" />
              <h3 className="config-modal__title">Chacha Cheezy Table Booking</h3>
            </div>

            {reservationSubmitted ? (
              <div className="reservation-success">
                <h4>Booking Request Sent!</h4>
                <p>
                  Thank you, <strong>{reservationData.name || 'Guest'}</strong>. Our Chacha Cheezy branch team will confirm your table and order shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="reservation-form">
                <div className="form-group">
                  <label htmlFor="res-name">Your Name</label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    placeholder="e.g. Ali Ahmed"
                    value={reservationData.name}
                    onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-phone">Phone Number</label>
                    <input
                      id="res-phone"
                      type="text"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={reservationData.phone}
                      onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-guests">Guests</label>
                    <select
                      id="res-guests"
                      value={reservationData.guests}
                      onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                    >
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6 Persons (Family)</option>
                      <option value="8+">8+ Persons (Party)</option>
                    </select>
                  </div>
                </div>

                <div className="config-modal__actions">
                  <button
                    type="button"
                    onClick={() => setShowReservationModal(false)}
                    className="btn btn--secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary">
                    Submit Booking Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
