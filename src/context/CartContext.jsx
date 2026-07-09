import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'ayr-cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: productId, qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    setItems((prev) => prev.map((i) => (i.id === productId ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  // Cruza el carrito (solo id + cantidad) con la data real de productos,
  // asi si un producto se saca del catalogo no rompe el carrito guardado.
  const cartItems = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? { ...product, qty: i.qty } : null;
    })
    .filter(Boolean);

  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
