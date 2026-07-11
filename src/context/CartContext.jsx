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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // lineKey identifica una linea del carrito: mismo producto pero distinto tier
  // (ej. Caja x50 vs Caja x100) son lineas separadas.
  const lineKey = (productId, tier) => `${productId}::${tier?.qty ?? 1}`;

  const addToCart = (productId, qty = 1, tier = null) => {
    setItems((prev) => {
      const key = lineKey(productId, tier);
      const existing = prev.find((i) => lineKey(i.id, i.tier) === key);
      if (existing) {
        return prev.map((i) => (lineKey(i.id, i.tier) === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: productId, qty, tier }];
    });
  };

  const removeFromCart = (productId, tier = null) => {
    const key = lineKey(productId, tier);
    setItems((prev) => prev.filter((i) => lineKey(i.id, i.tier) !== key));
  };

  const updateQty = (productId, qty, tier = null) => {
    if (qty < 1) return removeFromCart(productId, tier);
    const key = lineKey(productId, tier);
    setItems((prev) => prev.map((i) => (lineKey(i.id, i.tier) === key ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  // Cruza el carrito (solo id + cantidad + tier) con la data real de productos,
  // asi si un producto se saca del catalogo no rompe el carrito guardado.
  const cartItems = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      if (!product) return null;
      if (i.tier && i.tier.qty !== 1) {
        return {
          ...product,
          qty: i.qty,
          tier: i.tier,
          title: `${product.title} (Caja x${i.tier.qty})`,
          price: i.tier.price,
        };
      }
      return { ...product, qty: i.qty, tier: i.tier ?? null };
    })
    .filter(Boolean);

  // Cantidad de renglones distintos en el carrito (no la suma de unidades,
  // que se dispara con las cajas de tornillos x100/x200/x500).
  const totalCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
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
