import { useState, useEffect, useRef } from 'react';
import './BrandStrip.css';

// Marcas que trabaja la ferretería.
// El logo se busca en /public/marcas/<file>. Si no está el archivo (o file:null),
// se muestra el nombre como texto (fallback) para que la web no quede rota.
// invert:true => el logo original es blanco (para fondo oscuro); se invierte a
// negro para que se vea sobre el strip claro sin perder el branding.
const brands = [
  { name: 'Bosch', file: 'bosch.svg' },
  { name: 'DeWalt', file: 'dewalt.png' },
  { name: 'Stanley', file: 'stanley.png' },
  { name: 'Black+Decker', file: 'black-decker.png' },
  { name: 'Bremen', file: 'bremen.svg' },
  { name: 'Bahco', file: 'bahco.png' },
  { name: 'Aliafor', file: 'aliafor.png', invert: true },
  { name: 'Tacsa', file: 'tacsa.png' },
  { name: 'El Galgo', file: 'el-galgo.png' },
  { name: 'Sinteplast', file: 'sinteplast.png' },
  { name: 'Alba', file: 'alba.png' },
  { name: 'RIOPINT', file: 'rio.png' },
  { name: 'Awaduct', file: 'awaduct.png' },
  { name: 'Privé', file: 'prive.png' },
  { name: 'Trabex', file: 'trabex.png' },
  { name: 'SILOC', file: 'SILOC.png' },
  { name: 'Patroll', file: 'patroll.png' },
];

const BrandItem = ({ name, file, invert }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="brand-item">
      {!file || failed ? (
        <span className="brand-chip">{name}</span>
      ) : (
        <img
          src={`/marcas/${file}`}
          alt={name}
          title={name}
          className={`brand-logo ${invert ? 'brand-logo--invert' : ''}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const BrandStrip = () => {
  // Se duplica la lista para que el carrusel gire de forma infinita y sin cortes.
  const loop = [...brands, ...brands];
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  // Movimiento manual (rAF) para poder acelerar y cambiar de dirección al pasar
  // el mouse, sin los saltos que daría cambiar una animación CSS en caliente.
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!marquee || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const BASE = 55; // px/s: velocidad normal (hacia la izquierda)
    const FAST = 220; // px/s: al pasar el mouse (más rápido, punto intermedio)

    let half = track.scrollWidth / 2; // ancho de una copia de la lista
    let offset = 0;
    let velocity = -BASE;
    let target = -BASE;
    let raf;
    let last = performance.now();

    const recalc = () => {
      half = track.scrollWidth / 2;
    };
    const onMove = (e) => {
      const rect = marquee.getBoundingClientRect();
      // Acelera hacia el lado al que apunta el mouse.
      const dir = e.clientX - rect.left < rect.width / 2 ? -1 : 1;
      target = dir * FAST;
    };
    const onLeave = () => {
      target = -BASE;
    };

    marquee.addEventListener('mousemove', onMove);
    marquee.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', recalc);

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Suaviza el cambio de velocidad (acelera/desacelera de a poco).
      velocity += (target - velocity) * Math.min(1, dt * 6);
      offset += velocity * dt;
      if (half > 0) {
        while (offset <= -half) offset += half;
        while (offset > 0) offset -= half;
      }
      track.style.transform = `translateX(${offset}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      marquee.removeEventListener('mousemove', onMove);
      marquee.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', recalc);
    };
  }, []);

  return (
    <section className="brand-strip">
      <div className="container">
        <p className="brand-strip-title">Trabajamos con las mejores marcas</p>
      </div>
      <div className="brand-marquee" ref={marqueeRef}>
        <div className="brand-track" ref={trackRef}>
          {loop.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
