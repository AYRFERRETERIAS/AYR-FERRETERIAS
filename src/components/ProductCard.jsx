import { MessageCircle } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const phoneNumber = '5491176613331';
  const message = `Hola, me interesa el producto "${product.title}". ¿Me podrían pasar más información y precio?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
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
