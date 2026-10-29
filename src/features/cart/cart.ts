import { products } from '../catalog/data/products.ts';
import type { CheckoutItem } from '../checkout/types.ts';

export const CART_KEY = 'moss-and-mind-cart';

export function validQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0;
}

function safeTotal(items: CheckoutItem[]): boolean {
  return Number.isSafeInteger(cartTotalCents(items));
}

export function restoreCart(raw: string | null): CheckoutItem[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    const restored: CheckoutItem[] = [];
    for (const item of value) {
      if (
        typeof item !== 'object' ||
        item === null ||
        Array.isArray(item) ||
        Object.keys(item).some((key) => key !== 'productId' && key !== 'quantity') ||
        !('productId' in item) ||
        !('quantity' in item) ||
        typeof item.productId !== 'string' ||
        typeof item.quantity !== 'number' ||
        !validQuantity(item.quantity) ||
        !products.some((product) => product.id === item.productId) ||
        seen.has(item.productId)
      )
        continue;
      const next = { productId: item.productId, quantity: item.quantity };
      if (!safeTotal([...restored, next])) continue;
      seen.add(item.productId);
      restored.push(next);
    }
    return restored;
  } catch {
    return [];
  }
}

export function addItem(items: CheckoutItem[], productId: string): CheckoutItem[] {
  if (!products.some((product) => product.id === productId)) return items;
  const existing = items.find((item) => item.productId === productId);
  if (existing && !validQuantity(existing.quantity + 1)) return items;
  const next = existing
    ? items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    : [...items, { productId, quantity: 1 }];
  return safeTotal(next) ? next : items;
}

export function setQuantity(
  items: CheckoutItem[],
  productId: string,
  quantity: number,
): CheckoutItem[] {
  if (!validQuantity(quantity)) return items;
  const next = items.map((item) => (item.productId === productId ? { ...item, quantity } : item));
  return safeTotal(next) ? next : items;
}

export function cartTotalCents(items: CheckoutItem[]): number {
  return items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return total + (product ? Math.round(product.price * 100) * item.quantity : 0);
  }, 0);
}
