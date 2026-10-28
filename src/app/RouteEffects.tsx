import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string }> = {
  '/checkout/success': {
    title: 'Test order confirmation | Moss & Mind',
    description: 'Verify your Stripe test payment and view your Moss & Mind demonstration order.',
  },
  '/checkout/cancel': {
    title: 'Checkout paused | Moss & Mind',
    description: 'Return to the Moss & Mind collection after leaving Stripe test checkout.',
  },
  '/': {
    title: 'Home | Moss & Mind',
    description:
      'A student-focused concept for nootropics and everyday rituals. Explore our products, meet Moss & Mind, and read our Blog.',
  },
  '/collection': {
    title: 'Products | Moss & Mind',
    description:
      'Explore five concept products from Moss & Mind, with descriptions, formats, and prices in Canadian dollars.',
  },
  '/about': {
    title: 'About | Moss & Mind',
    description:
      'Meet the idea and philosophy behind Moss & Mind, a student-focused CP340 e-commerce project.',
  },
  '/blog': {
    title: 'Blog | Moss & Mind',
    description:
      'Read the Moss & Mind introduction and updates about our concept products and student e-commerce project.',
  },
  '/privacy': {
    title: 'Privacy | Moss & Mind',
    description:
      'How the Moss & Mind course demo handles data, hosting, browser permissions, and search indexing.',
  },
};

export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const page = pages[pathname] ?? {
      title: 'Page not found | Moss & Mind',
      description: 'Find your way back to the Moss & Mind products or Home page.',
    };
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
