import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import { CatalogProvider } from './context/CatalogContext';
import { CartProvider } from './context/CartContext';
import './App.css';

// Sin esto, al navegar entre paginas (ej. "Inicio" desde un producto) el
// navegador mantiene el mismo scroll donde estaba, y como cada pagina tiene
// distinto alto puede parecer que el link "no hizo nada".
// Excepcion: si la navegacion pide ir directo al catalogo (ej. elegir una
// categoria desde la ficha de un producto), no saltamos a arriba de todo,
// dejamos que Home haga su propio scroll al catalogo.
function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollToCatalog) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Depende solo de pathname a proposito: Home limpia el flag scrollToCatalog
    // con un navigate(replace) al mismo pathname despues de hacer su propio
    // scroll, y no queremos que ESE cambio de "state" dispare este efecto de
    // nuevo y pise el scroll al catalogo que se acaba de hacer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Route path="/carrito" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </CartProvider>
      </CatalogProvider>
    </Router>
  );
}

export default App;
