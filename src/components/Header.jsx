import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, MessageCircle, ShoppingCart } from 'lucide-react';
import TopBar from './TopBar';
import { categories } from '../data/products';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeCategory, searchTerm, selectCategory, search, goHome } = useCatalog();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const goToCart = () => {
    setMobileMenuOpen(false);
    navigate('/carrito');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchTerm.trim());
    if (location.pathname !== '/') navigate('/', { state: { scrollToCatalog: true } });
  };

  const handleCategoryClick = (cat) => {
    selectCategory(cat);
    setMobileMenuOpen(false);
    // Si el catalogo no esta en esta pantalla (ej. estando en la ficha de un
    // producto), hay que navegar a la home para que el filtro se vea.
    if (location.pathname !== '/') navigate('/', { state: { scrollToCatalog: true } });
  };

  const handleSearchChange = (value) => {
    search(value);
    if (value.trim() && location.pathname !== '/') {
      navigate('/', { state: { scrollToCatalog: true } });
    }
  };

  const navCategories = ['Todas', ...categories];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <TopBar />

      {/* Fila principal blanca */}
      <div className="header-main">
        <div className="container header-main-inner">
          <Link to="/" className="logo-container" onClick={goHome}>
            <img src="/logo.jpg" alt="AYR Ferreterías" className="header-logo" />
          </Link>

          <form className="header-search" onSubmit={handleSearch}>
            <Search size={18} className="header-search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Buscar productos"
            />
          </form>

          <div className="header-actions">
            <button className="header-cart-btn" onClick={goToCart} aria-label="Ver carrito">
              <ShoppingCart size={20} />
              {totalCount > 0 && <span className="header-cart-badge">{totalCount}</span>}
            </button>
            <a
              href="https://wa.me/5491176613331"
              target="_blank"
              rel="noopener noreferrer"
              className="header-wa-btn"
            >
              <MessageCircle size={18} /> Consultá por WhatsApp
            </a>
          </div>

          <button
            className="header-cart-btn header-cart-btn--mobile"
            onClick={goToCart}
            aria-label="Ver carrito"
          >
            <ShoppingCart size={22} />
            {totalCount > 0 && <span className="header-cart-badge">{totalCount}</span>}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Navbar negro de categorías (desktop) */}
      <nav className="cat-navbar">
        <div className="container cat-navbar-inner">
          <div className="cat-navbar-categories">
            {navCategories.map((cat) => (
              <button
                key={cat}
                className={`cat-navbar-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <a href="#contacto" className="cat-navbar-item cat-navbar-item--contact">
            Contacto
          </a>
        </div>
      </nav>

      {/* Menú mobile */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <form className="mobile-search" onSubmit={handleSearch}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </form>
        <ul>
          {navCategories.map((cat) => (
            <li key={cat}>
              <button
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
          <li>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </a>
          </li>
        </ul>
        <a
          href="https://wa.me/5491176613331"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp w-100"
          onClick={() => setMobileMenuOpen(false)}
        >
          <MessageCircle size={18} /> Consultá por WhatsApp
        </a>
      </div>
    </header>
  );
};

export default Header;
