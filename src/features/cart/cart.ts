import { products } from '../catalog/data/products.ts';
import type { CheckoutItem } from '../checkout/types.ts';

export const CART_KEY = 'moss-and-mind-cart';
export const MAX_QUANTITY = 10;

export function restoreCart(raw: string | null): CheckoutItem[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.flatMap((item: unknown) => {
      if (
        typeof item !== 'object' ||
        item === null ||
        Array.isArray(item) ||
        Object.keys(item).some((key) => key !== 'productId' && key !== 'quantity') ||
        !('productId' in item) ||
        !('quantity' in item) ||
        typeof item.productId !== 'string' ||
        typeof item.quantity !== 'number' ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_QUANTITY ||
        !products.some((product) => product.id === item.productId) ||
        seen.has(item.productId)
      )
        return [];
      seen.add(item.productId);
      return [{ productId: item.productId, quantity: item.quantity }];
    });
  } catch {
    return [];
  }
}

export function addItem(items: CheckoutItem[], productId: string): CheckoutItem[] {
  if (!products.some((product) => product.id === productId)) return items;
  const existing = items.find((item) => item.productId === productId);
  if (existing?.quantity === MAX_QUANTITY) return items;
  return existing
    ? items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    : [...items, { productId, quantity: 1 }];
}

export function setQuantity(
  items: CheckoutItem[],
  productId: string,
  quantity: number,
): CheckoutItem[] {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) return items;
  return items.map((item) => (item.productId === productId ? { ...item, quantity } : item));
}

export function cartTotalCents(items: CheckoutItem[]): number {
  return items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return total + (product ? Math.round(product.price * 100) * item.quantity : 0);
  }, 0);
}
