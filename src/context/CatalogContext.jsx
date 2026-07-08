import { createContext, useContext, useState } from 'react';

const CatalogContext = createContext(null);

export const CatalogProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToCatalog = () => {
    const section = document.getElementById('catalogo');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  // Selecciona una categoría, limpia una búsqueda que hubiera quedada activa
  // (si no, categoría y búsqueda se combinan con "Y" y pueden no mostrar nada)
  // y lleva la vista al catálogo.
  const selectCategory = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
    scrollToCatalog();
  };

  // Busca por texto en TODO el catálogo: si había una categoría distinta de
  // "Todas" activa, la resetea para que la búsqueda no quede restringida a
  // esa categoría (esa combinación era la causa de "a veces no aparece nada").
  const search = (term) => {
    setSearchTerm(term);
    if (term) {
      setActiveCategory('Todas');
      scrollToCatalog();
    }
  };

  // Para el logo/"ir al inicio": resetea categoría y búsqueda SIN scrollear
  // al catálogo (a diferencia de selectCategory), y lleva arriba del todo.
  const goHome = () => {
    setActiveCategory('Todas');
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CatalogContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        selectCategory,
        searchTerm,
        setSearchTerm,
        search,
        scrollToCatalog,
        goHome,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog debe usarse dentro de <CatalogProvider>');
  return ctx;
};
