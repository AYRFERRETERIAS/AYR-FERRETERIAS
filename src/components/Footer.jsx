import { MapPin, Mail } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsappIcon } from './SocialIcons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-section">
          <img src="/logo.jpg" alt="AYR Ferreterías Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '1rem' }} />
          <p className="footer-desc">
            Tu ferretería de confianza. Herramientas, materiales y asesoramiento experto para todos tus proyectos de construcción y hogar.
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/ayrferreterias/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link social-link--instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.facebook.com/AYRFERRETERIAS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link social-link--facebook"
            >
              <FacebookIcon size={20} />
            </a>
            <a
              href="https://wa.me/5491176613331"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-link social-link--whatsapp"
            >
              <WhatsappIcon size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section" id="sucursales">
          <h3>Nuestras Sucursales</h3>
          <div className="location-item">
            <MapPin className="text-primary" />
            <div>
              <strong>Sucursal La Loma</strong>
              <p>Lola Mora 1764, Del Viso</p>
              <a href="https://maps.app.goo.gl/TcQ8VBAzXw6V43Jj8" target="_blank" rel="noopener noreferrer" className="link-primary">Ver en Google Maps</a>
            </div>
          </div>
          <div className="location-item mt-3">
            <MapPin className="text-primary" />
            <div>
              <strong>Sucursal Centro</strong>
              <p>Beruti 1161, Del Viso</p>
              <a href="https://maps.app.goo.gl/UtAczgmBHn5ZFY2J8" target="_blank" rel="noopener noreferrer" className="link-primary">Ver en Google Maps</a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-icon contact-icon--whatsapp">
                <WhatsappIcon size={18} />
              </span>
              <a href="https://wa.me/5491176613331" target="_blank" rel="noopener noreferrer" className="link-primary">
                Consultas por WhatsApp al 11 7661-3331
              </a>
            </li>
            <li>
              <Mail className="text-primary" size={18} />
              <span>VENTAS@FERRETERIAAYR.COM</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} AYR Ferreterías. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
