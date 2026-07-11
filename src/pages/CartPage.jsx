import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, MessageCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productSlug } from '../utils/slug';
import { formatPrice } from '../utils/format';
import './CartPage.css';

const PHONE = '5491176613331';
const ENVIO_GRATIS_MINIMO = 99999;
const ZONAS_ENVIO_GRATIS = ['Del Viso', 'Manuel Alberti', 'La Lonja', 'Pilar'];

const buildWhatsappMessage = (items, subtotal, sinPrecioCount, envioGratis) => {
  const lines = items.map((i) => {
    const precioTxt = i.price ? ` — ${formatPrice(i.price)} c/u` : ' — a consultar';
    return `• ${i.title} — Cantidad: ${i.qty}${precioTxt}`;
  });
  const totalTxt = subtotal > 0
    ? `\n\nSubtotal: ${formatPrice(subtotal)}${sinPrecioCount ? ` (+ ${sinPrecioCount} producto${sinPrecioCount === 1 ? '' : 's'} a consultar)` : ''}`
    : '';
  const envioTxt = envioGratis
    ? `\n\nEnvío sin cargo (zona ${ZONAS_ENVIO_GRATIS.join(', ')}), a confirmar según dirección.`
    : '';

  const conCodigo = items.filter((i) => i.codigoAyr);
  const ticketTxt = conCodigo.length
    ? `\n\n— Para cargar en el sistema —\n${conCodigo.map((i) => `${i.codigoAyr}\t${i.qty}`).join('\n')}`
    : '';

  return `Hola, quiero consultar precio y disponibilidad de estos productos:\n\n${lines.join('\n')}${totalTxt}${envioTxt}${ticketTxt}`;
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

  const subtotal = cartItems.reduce((sum, i) => sum + (i.price ? i.price * i.qty : 0), 0);
  const sinPrecioCount = cartItems.filter((i) => !i.price).reduce((sum, i) => sum + i.qty, 0);
  const envioGratis = subtotal >= ENVIO_GRATIS_MINIMO;
  const faltaParaEnvioGratis = ENVIO_GRATIS_MINIMO - subtotal;

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    buildWhatsappMessage(cartItems, subtotal, sinPrecioCount, envioGratis)
  )}`;

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

            {cartItems.map((item) => {
              const step = item.tier?.qty && item.tier.qty > 1 ? item.tier.qty : 1;
              return (
              <div className="cart-page-item" key={`${item.id}-${item.tier?.qty ?? 1}`}>
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
                      <button
                        onClick={() => {
                          const next = item.qty - step;
                          if (next >= step) updateQty(item.id, next, item.tier);
                        }}
                        disabled={item.qty <= step}
                        aria-label="Restar"
                      >
                        <Minus size={15} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + step, item.tier)} aria-label="Sumar">
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      className="cart-page-item-remove"
                      onClick={() => removeFromCart(item.id, item.tier)}
                    >
                      <Trash2 size={15} /> Quitar
                    </button>
                  </div>
                </div>

                <div className="cart-page-item-price">
                  {item.price ? (
                    <>
                      <span className="cart-page-item-price-total">
                        {formatPrice(item.price * item.qty)}
                      </span>
                      <span className="cart-page-item-price-unit">
                        {formatPrice(item.price)} c/u
                      </span>
                    </>
                  ) : (
                    <span className="cart-summary-consult">A consultar</span>
                  )}
                </div>
              </div>
              );
            })}

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
            <div className="cart-summary-row cart-summary-total">
              <span>Subtotal</span>
              <span>{subtotal > 0 ? formatPrice(subtotal) : 'A consultar'}</span>
            </div>
            {subtotal > 0 && sinPrecioCount > 0 && (
              <p className="cart-summary-note cart-summary-note--warn">
                + {sinPrecioCount} {sinPrecioCount === 1 ? 'producto' : 'productos'} a consultar
                (no incluido en el subtotal)
              </p>
            )}
            <div className="cart-summary-row">
              <span>Envío</span>
              {envioGratis ? (
                <span className="cart-summary-free-shipping">¡Sin cargo!</span>
              ) : (
                <span className="cart-summary-consult">A coordinar</span>
              )}
            </div>
            {envioGratis ? (
              <p className="cart-summary-note cart-summary-note--success">
                Envío sin cargo en Del Viso, Manuel Alberti, La Lonja y Pilar.
                Lo confirmamos según tu dirección exacta por WhatsApp.
              </p>
            ) : (
              subtotal > 0 && (
                <p className="cart-summary-note">
                  Te faltan {formatPrice(faltaParaEnvioGratis)} para envío sin cargo
                  (Del Viso, Manuel Alberti, La Lonja y Pilar).
                </p>
              )
            )}
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
