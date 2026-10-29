import { useEffect, useState, type ReactNode } from 'react';
import type { CheckoutItem } from '../checkout/types';
import { addItem, CART_KEY, restoreCart, setQuantity } from './cart';
import { CartContext } from './context';

function initialCart(): CheckoutItem[] {
  try {
    return restoreCart(window.localStorage.getItem(CART_KEY));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CheckoutItem[]>(initialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // Browsers can disable storage; the in-memory cart still works for this visit.
    }
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        add: (productId) => setItems((current) => addItem(current, productId)),
        update: (productId, quantity) =>
          setItems((current) => setQuantity(current, productId, quantity)),
        remove: (productId) =>
          setItems((current) => current.filter((item) => item.productId !== productId)),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
