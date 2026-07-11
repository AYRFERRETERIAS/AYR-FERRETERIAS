import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, MessageCircle, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { products } from '../data/products';
import { productSlug, idFromSlug } from '../utils/slug';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const PHONE = '5491176613331';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { selectCategory } = useCatalog();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const product = useMemo(() => {
    const id = idFromSlug(slug);
    return products.find((p) => p.id === id);
  }, [slug]);

  useEffect(() => {
    setQty(1);
    setSelectedTier(product?.priceTiers ? product.priceTiers[0] : null);
  }, [slug, product]);

  if (!product) {
    return (
      <div className="container product-not-found">
        <p>No encontramos ese producto.</p>
        <Link to="/" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const hasTiers = Boolean(product.priceTiers);
  const isBoxTier = hasTiers && selectedTier && selectedTier.qty > 1;
  const effectivePrice = hasTiers ? selectedTier?.price : product.price;
  const effectiveQtyLabel = isBoxTier
    ? `Caja x${selectedTier.qty} — cantidad: ${qty} caja${qty > 1 ? 's' : ''} (${selectedTier.qty * qty} unidades)`
    : `cantidad: ${qty}`;

  const unidadesTotales = isBoxTier ? selectedTier.qty * qty : qty;
  const ticketTxt = product.codigoAyr
    ? `\n\n— Para cargar en el sistema —\n${product.codigoAyr}\t${unidadesTotales}`
    : '';

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    (effectivePrice
      ? `Hola, me interesa el producto "${product.title}" (${formatPrice(effectivePrice)} c/u, ${effectiveQtyLabel}). ¿Está disponible?`
      : `Hola, me interesa el producto "${product.title}" (${effectiveQtyLabel}). ¿Me podrían pasar más información y precio?`) + ticketTxt
  )}`;

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <span
            className="breadcrumb-link"
            onClick={() => {
              selectCategory(product.category);
              navigate('/', { state: { scrollToCatalog: true } });
            }}
          >
            {product.category}
          </span>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <span className="product-detail-category">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="product-detail-description">{product.description}</p>

            {effectivePrice && <p className="product-detail-price">{formatPrice(effectivePrice)}{hasTiers && ' c/u'}</p>}

            {hasTiers && (
              <div className="product-detail-tiers">
                {product.priceTiers.map((tier) => (
                  <button
                    key={tier.qty}
                    type="button"
                    className={`product-detail-tier${selectedTier?.qty === tier.qty ? ' product-detail-tier--active' : ''}`}
                    onClick={() => {
                      setSelectedTier(tier);
                      setQty(1);
                    }}
                  >
                    <span>{tier.qty === 1 ? 'Unidad' : `Caja x${tier.qty}`}</span>
                    <strong>{formatPrice(tier.price)} c/u</strong>
                  </button>
                ))}
              </div>
            )}

            <div className="product-detail-actions">
              <div className="qty-selector">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar">
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Sumar">
                  <Plus size={16} />
                </button>
              </div>
              {isBoxTier && <span className="product-detail-tier-hint">caja{qty > 1 ? 's' : ''} de {selectedTier.qty} — {selectedTier.qty * qty} unidades</span>}

              <button
                className="btn btn-primary product-detail-add"
                onClick={() => {
                  addToCart(product.id, isBoxTier ? qty * selectedTier.qty : qty, hasTiers ? selectedTier : null);
                  setJustAdded(true);
                  setTimeout(() => setJustAdded(false), 2500);
                }}
              >
                <ShoppingCart size={18} /> Agregar a la consulta
              </button>
            </div>

            {justAdded && (
              <p className="product-detail-added-note">
                <Check size={16} /> Agregado al carrito.{' '}
                <Link to="/carrito">Ver carrito</Link>
              </p>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-100 product-detail-whatsapp"
            >
              <MessageCircle size={18} /> Consultar este producto ahora
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <section className="product-detail-related">
            <h2>También te puede interesar</h2>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
