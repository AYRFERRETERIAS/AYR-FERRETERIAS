import { useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import './ContactForm.css';

// Codifica los campos como application/x-www-form-urlencoded, que es lo que
// espera Netlify Forms cuando se envía el formulario por fetch (sin recargar
// la página). El <form> oculto en index.html es lo que le permite a Netlify
// detectar este formulario en el momento del build (no puede "ver" el JSX).
const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const initialForm = { nombre: '', telefono: '', email: '', interes: '', mensaje: '' };

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contacto', ...form }),
    })
      .then(() => {
        setStatus('sent');
        setForm(initialForm);
      })
      .catch(() => setStatus('error'));
  };

  if (status === 'sent') {
    return (
      <div className="contact-success">
        <CheckCircle size={48} />
        <h3>¡Gracias por escribirnos!</h3>
        <p>Recibimos tus datos, en breve nos comunicamos con vos.</p>
      </div>
    );
  }

  return (
    <div className="contact-grid">
      <div className="contact-info">
        <span className="section-eyebrow">Contáctanos</span>
        <h2>¿Tenés una consulta?</h2>
        <p>
          Dejanos tus datos y te contactamos a la brevedad. También podés escribirnos
          directamente por WhatsApp o visitarnos en cualquiera de nuestras sucursales.
        </p>

        <ul className="contact-info-list">
          <li>
            <Phone size={18} />
            <a href="https://wa.me/5491176613331" target="_blank" rel="noopener noreferrer">
              11 7661-3331
            </a>
          </li>
          <li>
            <Mail size={18} />
            <span>VENTAS@FERRETERIAAYR.COM</span>
          </li>
          <li>
            <MapPin size={18} />
            <span>La Loma 1764 y Beruti 1161, Del Viso</span>
          </li>
          <li>
            <Clock size={18} />
            <span>Lun a Sáb 08:00 a 20:00hs</span>
          </li>
        </ul>
      </div>

      <form
        className="contact-form"
        name="contacto"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Honeypot anti-spam: invisible para personas, los bots lo completan. */}
        <p className="contact-hidden-field">
          <label>
            No completar: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <div className="contact-field">
          <label htmlFor="nombre">Nombre y apellido *</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contact-field-row">
          <div className="contact-field">
            <label htmlFor="telefono">Teléfono / WhatsApp *</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="interes">¿Qué estás buscando?</label>
          <input
            id="interes"
            name="interes"
            type="text"
            placeholder="Ej: herramientas eléctricas, pintura, presupuesto de obra..."
            value={form.interes}
            onChange={handleChange}
          />
        </div>

        <div className="contact-field">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={form.mensaje}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending'}>
          <Send size={18} /> {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
        </button>

        {status === 'error' && (
          <p className="contact-error">
            No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
