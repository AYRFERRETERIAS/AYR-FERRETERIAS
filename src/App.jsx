import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CatalogProvider } from './context/CatalogContext';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <Router>
      <CatalogProvider>
        <CartProvider>
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
