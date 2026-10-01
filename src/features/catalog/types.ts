export type ProductCategory = 'Nootropics' | 'Rituals' | 'Bundles';
export type ProductTone = 'sage' | 'lavender' | 'peach' | 'butter' | 'rose';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  price: number;
  currency: 'CAD';
  format: string;
  tone: ProductTone;
  illustration: 'bottle' | 'pouch';
  tag: string;
};
