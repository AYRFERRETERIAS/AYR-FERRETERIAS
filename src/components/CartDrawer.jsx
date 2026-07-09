import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productSlug } from '../utils/slug';
import './CartDrawer.css';

const PHONE = '5491176613331';

const buildWhatsappMessage = (cartItems) => {
  const lines = cartItems.map((i) => `• ${i.title} — Cantidad: ${i.qty}`);
  return `Hola, quiero consultar precio y disponibilidad de estos productos:\n\n${lines.join('\n')}`;
};

const CartDrawer = () => {
  const { cartItems, totalCount, updateQty, removeFromCart, isCartOpen, closeCart } = useCart();

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildWhatsappMessage(cartItems))}`;

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Carrito de consulta">
        <div className="cart-drawer-header">
          <h3>Tu consulta {totalCount > 0 && `(${totalCount})`}</h3>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Todavía no agregaste productos.</p>
            <button className="btn btn-primary" onClick={closeCart}>
              Ver catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <Link to={`/producto/${productSlug(item)}`} onClick={closeCart} className="cart-item-image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </Link>
                  <div className="cart-item-info">
                    <Link to={`/producto/${productSlug(item)}`} onClick={closeCart} className="cart-item-title">
                      {item.title}
                    </Link>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Restar">
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Sumar">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Quitar del carrito"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <p className="cart-footer-note">
                Consultá precio y disponibilidad de todo tu pedido por WhatsApp, sin compromiso.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-100"
                onClick={closeCart}
              >
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
