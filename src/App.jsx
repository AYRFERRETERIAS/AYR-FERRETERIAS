import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CatalogProvider } from './context/CatalogContext';
import { CartProvider } from './context/CartContext';
import './App.css';

// Sin esto, al navegar entre paginas (ej. "Inicio" desde un producto) el
// navegador mantiene el mismo scroll donde estaba, y como cada pagina tiene
// distinto alto puede parecer que el link "no hizo nada".
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <CatalogProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
            <CartDrawer />
          </div>
        </CartProvider>
      </CatalogProvider>
    </Router>
  );
}

export default App;
