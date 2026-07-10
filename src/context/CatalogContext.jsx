import { createContext, useContext, useState } from 'react';

const CatalogContext = createContext(null);

export const CatalogProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [activeSubcategory, setActiveSubcategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  // "instant" (no animado) a proposito: con scroll suave, si el usuario mueve
  // la rueda del mouse mientras anima o hay una imagen que carga y mueve el
  // layout, la animacion puede quedar cortada a mitad de camino y parecer
  // que el link "no funciona bien". Instantaneo siempre cae en el lugar justo.
  const scrollToCatalog = () => {
    const section = document.getElementById('catalogo');
    if (section) section.scrollIntoView({ behavior: 'instant' });
  };

  // Selecciona una categoría, limpia una búsqueda que hubiera quedada activa
  // (si no, categoría y búsqueda se combinan con "Y" y pueden no mostrar nada)
  // y lleva la vista al catálogo. Tambien resetea la subcategoria: si no,
  // quedaria una subcategoria de la categoria anterior filtrando de mas.
  const selectCategory = (category) => {
    setActiveCategory(category);
    setActiveSubcategory('Todas');
    setSearchTerm('');
    scrollToCatalog();
  };

  const selectSubcategory = (subcategory) => {
    setActiveSubcategory(subcategory);
    scrollToCatalog();
  };

  // Busca por texto en TODO el catálogo: si había una categoría distinta de
  // "Todas" activa, la resetea para que la búsqueda no quede restringida a
  // esa categoría (esa combinación era la causa de "a veces no aparece nada").
  const search = (term) => {
    setSearchTerm(term);
    if (term) {
      setActiveCategory('Todas');
      setActiveSubcategory('Todas');
      scrollToCatalog();
    }
  };

  // Para el logo/"ir al inicio": resetea categoría y búsqueda SIN scrollear
  // al catálogo (a diferencia de selectCategory), y lleva arriba del todo.
  const goHome = () => {
    setActiveCategory('Todas');
    setActiveSubcategory('Todas');
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CatalogContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        selectCategory,
        activeSubcategory,
        selectSubcategory,
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
