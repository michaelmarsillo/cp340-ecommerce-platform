export type CheckoutItem = { productId: string; quantity: number };

export type CheckoutConfirmation = {
  reference: string;
  currency: string;
  total: number;
  items: { name: string; quantity: number; total: number }[];
};
