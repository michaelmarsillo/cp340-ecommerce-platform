import type { Product } from '../types';

// Fictional, static catalog. Keep product content outside presentation components.
// A future catalog API can return this shape without changing the card components.
export const products: readonly Product[] = [
  {
    id: 'daily-focus',
    name: 'Daily Focus',
    category: 'Nootropics',
    subtitle: 'For your next chapter.',
    description:
      'A fictional nootropic capsule concept for our student-focused collection. A real formulation, ingredient list, and qualified product review would be needed before any sale.',
    price: 28,
    currency: 'CAD',
    format: '60 capsules · concept',
    tone: 'sage',
    illustration: 'bottle',
    tag: 'The everyday edit',
  },
  {
    id: 'evening-unwind',
    name: 'Evening Unwind',
    category: 'Nootropics',
    subtitle: 'Make room for slow.',
    description:
      'A fictional evening capsule concept inspired by the pause after a busy day. This demo makes no claims about sleep, stress relief, or treatment.',
    price: 26,
    currency: 'CAD',
    format: '60 capsules · concept',
    tone: 'lavender',
    illustration: 'bottle',
    tag: 'The slower moments',
  },
  {
    id: 'mindful-matcha',
    name: 'Mindful Matcha',
    category: 'Rituals',
    subtitle: 'A small, green moment.',
    description:
      'A fictional matcha tea concept for a little pause between classes. Packaging, serving information, and supplier details are illustrative only.',
    price: 22,
    currency: 'CAD',
    format: '50 g tea · concept',
    tone: 'peach',
    illustration: 'pouch',
    tag: 'A fresh ritual',
  },
  {
    id: 'pause-tea',
    name: 'The Pause Tea',
    category: 'Rituals',
    subtitle: 'Steep. Sip. Be here.',
    description:
      'A fictional herbal tea concept, created around the simple ritual of making a warm cup. Ingredients and any allergen information remain to be developed.',
    price: 18,
    currency: 'CAD',
    format: '20 tea bags · concept',
    tone: 'butter',
    illustration: 'pouch',
    tag: 'Between the chapters',
  },
  {
    id: 'semester-set',
    name: 'The Semester Set',
    category: 'Bundles',
    subtitle: 'A little of everything.',
    description:
      'A fictional starter bundle concept pairing Daily Focus with Mindful Matcha. Demo pricing is illustrative, and the set is not available for purchase.',
    price: 44,
    currency: 'CAD',
    format: '2-piece set · concept',
    tone: 'rose',
    illustration: 'bottle',
    tag: 'Better together',
  },
];

export const catalogFilters = ['All rituals', 'Nootropics', 'Rituals', 'Bundles'] as const;
export type CatalogFilter = (typeof catalogFilters)[number];
