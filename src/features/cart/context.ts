import { createContext, useContext } from 'react';
import type { CheckoutItem } from '../checkout/types';

type CartState = {
  items: CheckoutItem[];
  add: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
};

export const CartContext = createContext<CartState | null>(null);

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('CartProvider is missing.');
  return cart;
}
