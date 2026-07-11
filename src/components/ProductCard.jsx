import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { productSlug } from '../utils/slug';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const phoneNumber = '5491176613331';
  const ticketTxt = product.codigoAyr
    ? `\n\n— Para cargar en el sistema —\n${product.codigoAyr}\t1`
    : '';
  const message = (product.price
    ? `Hola, me interesa el producto "${product.title}" (${formatPrice(product.price)}). ¿Está disponible?`
    : `Hola, me interesa el producto "${product.title}". ¿Me podrían pasar más información y precio?`) + ticketTxt;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const detailUrl = `/producto/${productSlug(product)}`;

  return (
    <div className="product-card">
      <Link to={detailUrl} className="product-image-container">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </Link>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <Link to={detailUrl} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <p className="product-description">{product.description}</p>

        {product.price && <p className="product-price">{formatPrice(product.price)}</p>}

        <div className="product-qty-selector">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar">
            <Minus size={14} />
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="Sumar">
            <Plus size={14} />
          </button>
        </div>

        <button
          type="button"
          className="product-cta product-cta-cart mt-auto"
          onClick={() => {
            addToCart(product.id, qty);
            setQty(1);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 1800);
          }}
        >
          {justAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
          {justAdded ? 'Agregado' : 'Agregar al carrito'}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-cta product-cta-whatsapp"
        >
          <WhatsAppIcon size={18} /> {product.price ? 'Consultar por WhatsApp' : 'Consultar precio'}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
