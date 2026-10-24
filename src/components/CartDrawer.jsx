import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertCircle, MessageSquare } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  const [showConfigHelper, setShowConfigHelper] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Generate prefilled WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `🍕 *CHACHA CHEEZY ORDER*\n\n`;
    cartItems.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}* x ${item.quantity} = PKR ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    msg += `\n*Subtotal:* PKR ${subtotal.toLocaleString()}`;
    msg += `\n*Branch:* PCHS Block F, Lahore`;
    msg += `\n*Hotline:* 0307 4242727`;
    msg += `\n*Order Mode:* Fast Delivery / Takeaway`;
    msg += `\n\n_Sent via Chacha Cheezy Online Menu_`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    if (restaurantConfig.contact.isPlaceholderNumber) {
      // Show polite setup modal explaining that the phone is currently demo placeholder
      setShowConfigHelper(true);
    } else {
      const text = generateWhatsAppMessage();
      const url = `https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const proceedWithDemoWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowConfigHelper(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="cart-backdrop"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="cart-drawer"
            aria-label="Order Cart"
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <div className="cart-drawer__title-wrap">
                <ShoppingBag size={20} className="cart-drawer__icon" />
                <h2 className="cart-drawer__title">Your Order</h2>
                <span className="cart-drawer__badge">{totalCount}</span>
              </div>
              <button
                onClick={onClose}
                className="cart-drawer__close-btn"
                aria-label="Close Cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Body */}
            <div className="cart-drawer__body">
              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="cart-empty-icon-box">
                    <ShoppingBag size={42} strokeWidth={1.2} />
                  </div>
                  <h3 className="cart-empty-title">Your table is still empty</h3>
                  <p className="cart-empty-text">
                    Add our hand-crafted, wood-fired Neapolitan pizzas to start your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn btn--primary btn--compact"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <ul className="cart-item-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item__image"
                      />
                      <div className="cart-item__details">
                        <div className="cart-item__head">
                          <h4 className="cart-item__name">{item.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="cart-item__remove-btn"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="cart-item__unit-price">
                          PKR {item.price.toLocaleString()} each
                        </span>

                        <div className="cart-item__controls">
                          <div className="qty-stepper">
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              className="qty-btn"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-number">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              className="qty-btn"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="cart-item__line-total">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer / Subtotal & Checkout */}
            {cartItems.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span className="summary-value">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row summary-row--muted">
                    <span>Delivery (Demo)</span>
                    <span className="summary-free">Complimentary</span>
                  </div>
                  <div className="summary-row summary-row--total">
                    <span>Total</span>
                    <span className="summary-value-total">
                      PKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="cart-drawer__actions">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="btn btn--primary btn--full btn--whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Order via WhatsApp</span>
                  </button>

                  <button
                    onClick={onClearCart}
                    className="btn btn--text cart-clear-btn"
                  >
                    Clear Order
                  </button>
                </div>

                <div className="cart-disclaimer">
                  <AlertCircle size={13} />
                  <span>
                    Demo Experience: No real payment processed. Pre-populates a WhatsApp message for test ordering.
                  </span>
                </div>
              </div>
            )}
          </motion.aside>

          {/* Modal helper if phone number is a placeholder */}
          {showConfigHelper && (
            <div className="config-modal-backdrop" onClick={() => setShowConfigHelper(false)}>
              <div className="config-modal" onClick={(e) => e.stopPropagation()}>
                <div className="config-modal__header">
                  <AlertCircle size={22} className="config-modal__icon" />
                  <h3 className="config-modal__title">WhatsApp Ordering Setup</h3>
                </div>
                <p className="config-modal__text">
                  The restaurant phone number is currently configured as demo placeholder:
                  <code> {restaurantConfig.contact.phoneDisplay}</code>
                </p>
                <p className="config-modal__subtext">
                  To connect your real WhatsApp business line, simply edit <code>src/data/restaurant.js</code> and update <code>whatsappNumber</code>.
                </p>
                <div className="config-modal__actions">
                  <button
                    onClick={proceedWithDemoWhatsApp}
                    className="btn btn--secondary"
                  >
                    Open Test Link Anyway
                  </button>
                  <button
                    onClick={() => setShowConfigHelper(false)}
                    className="btn btn--primary"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
