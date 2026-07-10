import { useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  MapPin,
  Truck,
  Users,
  Store,
  ShieldCheck,
  PenTool,
  PaintBucket,
  HardHat,
  Hammer,
  Wrench,
  Home as HomeIcon,
  Key,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import BrandStrip from '../components/BrandStrip';
import ContactForm from '../components/ContactForm';
import HeroCarousel from '../components/HeroCarousel';
import { products, categories } from '../data/products';
import { useCatalog } from '../context/CatalogContext';
import './Home.css';

const categoryIcons = {
  'Herramientas Eléctricas': <PenTool size={20} />,
  Pinturería: <PaintBucket size={20} />,
  Construcción: <HardHat size={20} />,
  Tornillería: <Hammer size={20} />,
  Plomería: <Wrench size={20} />,
  'Artículos para el hogar': <HomeIcon size={20} />,
  Cerrajería: <Key size={20} />,
};

const features = [
  { icon: <Store size={26} />, title: 'Mayorista y Minorista', text: 'Precios para obra, taller y hogar.' },
  { icon: <Truck size={26} />, title: 'Envíos en la zona', text: 'Del Viso y alrededores.' },
  { icon: <Users size={26} />, title: 'Atención personalizada', text: 'Te asesoramos en lo que necesites.' },
  { icon: <ShieldCheck size={26} />, title: 'Primeras marcas', text: 'Amplio stock y garantía.' },
];

const Home = () => {
  const {
    activeCategory,
    selectCategory,
    activeSubcategory,
    selectSubcategory,
    searchTerm,
    scrollToCatalog,
  } = useCatalog();
  const location = useLocation();
  const navigate = useNavigate();

  // Subcategorias disponibles para la categoria activa (ej. Plomería tiene
  // PVC, Awaduct, PPN, Griferías). Si la categoria no tiene subcategorias
  // cargadas, esta lista queda vacia y no se muestra la fila de filtros.
  const subcategories = useMemo(() => {
    if (activeCategory === 'Todas') return [];
    const set = new Set(
      products
        .filter((p) => p.category === activeCategory && p.subcategory)
        .map((p) => p.subcategory)
    );
    return Array.from(set);
  }, [activeCategory]);

  // Si llegamos desde otra pagina pidiendo ir directo al catalogo (ej. se
  // eligio una categoria desde la ficha de un producto), lo hacemos apenas
  // esta pantalla esta montada y borramos el pedido para que no se repita
  // si el usuario despues usa "atras/adelante" del navegador.
  useEffect(() => {
    if (location.state?.scrollToCatalog) {
      scrollToCatalog();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = activeCategory === 'Todas' || p.category === activeCategory;
      const matchSubcategory =
        activeSubcategory === 'Todas' || p.subcategory === activeSubcategory;
      const matchSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      return matchCategory && matchSubcategory && matchSearch;
    });
  }, [activeCategory, activeSubcategory, searchTerm]);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <HeroCarousel />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-eyebrow"
          >
            Ferretería Industrial · Del Viso
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            Todo para tu obra, <br />
            <span className="text-primary">hogar y taller</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            Venta mayorista y minorista. Herramientas, materiales y las mejores marcas, con
            asesoramiento y el mejor precio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-actions"
          >
            <a href="#catalogo" className="btn btn-primary hero-btn">
              Ver Catálogo <ChevronRight size={20} />
            </a>
            <a href="#sucursales" className="btn hero-btn-ghost">
              <MapPin size={18} /> Nuestras Sucursales
            </a>
          </motion.div>
        </div>
      </section>

      {/* Marcas */}
      <BrandStrip />

      {/* Beneficios */}
      <section className="features">
        <div className="container features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-item">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Sobre AYR Ferreterías</h2>
              <p>
                Somos una empresa dedicada a brindar soluciones integrales en ferretería industrial,
                construcción y el hogar. Con dos sucursales en Del Viso, ofrecemos un amplio stock de
                las mejores marcas del mercado.
              </p>
              <p>
                Nuestro compromiso es la atención personalizada, asesorando a cada cliente para que
                encuentre exactamente lo que necesita al mejor precio.
              </p>
              <p>
                Nos identifica la <strong>atención al profesional</strong>: entendemos lo que
                necesitás para tu obra, tu taller o tu hogar, y te acompañamos en cada compra con
                asesoramiento real, no solo venta.
              </p>
              <ul className="about-highlights">
                <li>
                  <ShieldCheck size={20} /> Asesoramiento experto
                </li>
                <li>
                  <Store size={20} /> Dos sucursales en Del Viso
                </li>
                <li>
                  <Users size={20} /> Trato cercano y de confianza
                </li>
              </ul>
            </div>
            <div className="about-image">
              <img
                src="/nosotros.jpg"
                alt="AYR Ferreterías — Quiénes Somos"
                className="about-photo"
                onError={(e) => {
                  // Hasta que se cargue la foto real, muestra el logo.
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo.jpg';
                  e.currentTarget.classList.add('about-photo--fallback');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="catalog-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Nuestro Catálogo</span>
            <h2>Productos destacados</h2>
            <p>Explorá por categoría o buscá lo que necesitás. ¿No lo ves? ¡Escribinos por WhatsApp!</p>
          </div>

          {/* Filtro por categoría (sincronizado con el navbar) */}
          <div className="categories-filter">
            <button
              className={`category-btn ${activeCategory === 'Todas' ? 'active' : ''}`}
              onClick={() => selectCategory('Todas')}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => selectCategory(cat)}
              >
                <span className="category-icon">{categoryIcons[cat]}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Subcategorías (solo si la categoría activa tiene) */}
          {subcategories.length > 0 && (
            <div className="subcategories-filter">
              <button
                className={`subcategory-btn ${activeSubcategory === 'Todas' ? 'active' : ''}`}
                onClick={() => selectSubcategory('Todas')}
              >
                Todas
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  className={`subcategory-btn ${activeSubcategory === sub ? 'active' : ''}`}
                  onClick={() => selectSubcategory(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {searchTerm.trim() && (
            <p className="search-info">
              Resultados para “{searchTerm.trim()}”: {filteredProducts.length}
            </p>
          )}

          <motion.div layout className="products-grid">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No encontramos productos con ese criterio.</p>
                <a
                  href="https://wa.me/5491176613331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Consultanos por WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="contact-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;
