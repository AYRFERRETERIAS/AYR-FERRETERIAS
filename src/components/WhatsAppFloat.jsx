import { MessageCircle } from 'lucide-react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5491176613331?text=Hola,%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Consultar por WhatsApp"
    >
      <MessageCircle size={30} />
    </a>
  );
};

export default WhatsAppFloat;
