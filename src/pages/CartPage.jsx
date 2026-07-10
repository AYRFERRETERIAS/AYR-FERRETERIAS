import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, MessageCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productSlug } from '../utils/slug';
import './CartPage.css';

const PHONE = '5491176613331';

const buildWhatsappMessage = (items) => {
  const lines = items.map((i) => `• ${i.title} — Cantidad: ${i.qty}`);
  return `Hola, quiero consultar precio y disponibilidad de estos productos:\n\n${lines.join('\n')}`;
};

const CartPage = () => {
  const { cartItems, totalCount, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container cart-empty-state">
          <ShoppingCart size={56} strokeWidth={1.2} />
          <h1>Tu carrito está vacío</h1>
          <p>Agregá productos desde el catálogo para armar tu consulta.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/', { state: { scrollToCatalog: true } })}
          >
            <ArrowLeft size={18} /> Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildWhatsappMessage(cartItems))}`;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page-title">
          Tu carrito <span>({totalCount} {totalCount === 1 ? 'producto' : 'productos'})</span>
        </h1>

        <div className="cart-page-grid">
          <div className="cart-page-items">
            <div className="cart-page-items-header">
              <span>Productos ({cartItems.length})</span>
              <button className="cart-clear-btn" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>

            {cartItems.map((item) => (
              <div className="cart-page-item" key={item.id}>
                <Link to={`/producto/${productSlug(item)}`} className="cart-page-item-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </Link>

                <div className="cart-page-item-info">
                  <span className="cart-page-item-category">{item.category}</span>
                  <Link to={`/producto/${productSlug(item)}`} className="cart-page-item-title">
                    {item.title}
                  </Link>

                  <div className="cart-page-item-actions">
                    <div className="qty-selector">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Restar">
                        <Minus size={15} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Sumar">
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      className="cart-page-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={15} /> Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="cart-continue-shopping"
              onClick={() => navigate('/', { state: { scrollToCatalog: true } })}
            >
              <ArrowLeft size={16} /> Seguir viendo el catálogo
            </button>
          </div>

          <aside className="cart-summary">
            <h2>Resumen de tu consulta</h2>
            <div className="cart-summary-row">
              <span>Productos</span>
              <span>{totalCount}</span>
            </div>
            <div className="cart-summary-row">
              <span>Precio</span>
              <span className="cart-summary-consult">A consultar</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío</span>
              <span className="cart-summary-consult">A coordinar</span>
            </div>
            <p className="cart-summary-note">
              Te confirmamos precio, stock y forma de entrega por WhatsApp — sin compromiso.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-100 cart-summary-cta"
            >
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
