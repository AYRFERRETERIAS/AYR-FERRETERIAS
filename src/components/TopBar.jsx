import { Clock, MapPin, Building2, Info } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container topbar-container">
        <div className="topbar-left">
          <span className="topbar-item">
            <Clock size={14} /> Lun a Sáb 08:00 a 20:00hs
          </span>
          <a href="#nosotros" className="topbar-item topbar-link">
            <Info size={14} /> Quiénes Somos
          </a>
          <a href="#sucursales" className="topbar-item topbar-link">
            <MapPin size={14} /> Nuestras Sucursales
          </a>
        </div>
        <div className="topbar-right">
          <span className="topbar-item topbar-muted">Del Viso · Mayorista y Minorista</span>
          <a
            href="https://wa.me/5491176613331?text=Hola,%20quiero%20consultar%20por%20atenci%C3%B3n%20a%20empresas"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-empresas"
          >
            <Building2 size={14} /> ATENCIÓN A EMPRESAS
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
