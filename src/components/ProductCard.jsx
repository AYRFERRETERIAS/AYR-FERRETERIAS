import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { productSlug } from '../utils/slug';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const phoneNumber = '5491176613331';
  const message = `Hola, me interesa el producto "${product.title}". ¿Me podrían pasar más información y precio?`;
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

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-cta mt-auto"
        >
          <MessageCircle size={18} /> Consultar precio
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
