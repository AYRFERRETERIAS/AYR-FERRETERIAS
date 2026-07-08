import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import { CatalogProvider } from './context/CatalogContext';
import './App.css';

function App() {
  return (
    <Router>
      <CatalogProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </CatalogProvider>
    </Router>
  );
}

export default App;
