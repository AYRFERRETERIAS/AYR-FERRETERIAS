import { useEffect, useState } from 'react';
import './HeroCarousel.css';

// Fotos reales de la ferretería, en public/fotos de portada/.
// "frente ferreteria.jpg" va primera a pedido de Rober.
const slides = [
  'frente ferreteria.jpg',
  'copia de llaes.jpg',
  'WhatsApp Image 2026-03-06 at 19.20.20.jpeg',
  'WhatsApp Image 2026-03-06 at 19.20.22 (1).jpeg',
  'WhatsApp Image 2026-03-06 at 19.20.22 (2).jpeg',
  'WhatsApp Image 2026-03-06 at 19.20.23.jpeg',
  'WhatsApp Image 2026-03-06 at 19.20.24.jpeg',
  'WhatsApp Image 2026-03-07 at 16.41.01.jpeg',
  'WhatsApp Image 2026-03-09 at 17.00.08.jpeg',
].map((name) => `/fotos de portada/${name}`);

const HOLD_MS = 1200; // cada foto queda menos de 1.5s, como pidió Rober

const HeroCarousel = () => {
  const [active, setActive] = useState(0);

  // Precarga todas las fotos apenas monta: son varios MB cada una, y sin
  // esto la primera vez que le toca el turno a una foto puede tardar en
  // decodificar y verse un cuadro en negro/vacío durante ese instante.
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = encodeURI(src);
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-carousel" aria-hidden="true">
      {slides.map((src, i) => (
        <div
          key={src}
          className="hero-carousel-slide"
          style={{
            // Comillas adentro del url(...): algunas fotos tienen paréntesis
            // en el nombre (ej. "... (1).jpeg") y sin comillas rompen la
            // sintaxis CSS, dejando el fondo vacío/negro para esa foto.
            backgroundImage: `url("${encodeURI(src)}")`,
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

export default HeroCarousel;
