import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string; robots?: string }> = {
  '/checkout/success': {
    title: 'Test Order Confirmation | Moss & Mind',
    description:
      'Review the status of your Moss & Mind Stripe test checkout. This class project does not collect payment or ship products.',
    robots: 'noindex, follow',
  },
  '/checkout/cancel': {
    title: 'Checkout Paused | Moss & Mind',
    description:
      'Return to the Moss & Mind collection after leaving the Stripe test checkout. This class project does not collect payment.',
    robots: 'noindex, follow',
  },
  '/cart': {
    title: 'Your Cart | Moss & Mind',
    description:
      'Review Moss & Mind concept products, adjust quantities, and see the Canadian-dollar total before Stripe test checkout.',
    robots: 'noindex, follow',
  },
  '/': {
    title: 'Student Wellness Routines | Moss & Mind',
    description:
      'Explore Moss & Mind, a student wellness concept for everyday routines, mindful study breaks, and study balance. Products are fictional course concepts.',
  },
  '/collection': {
    title: 'Student Wellness Products | Moss & Mind',
    description:
      'Browse fictional student wellness products from Moss & Mind, including tea and nootropic concepts for everyday wellness rituals. Prices are for a course demo.',
  },
  '/about': {
    title: 'About Moss & Mind | Student Study Balance',
    description:
      'Meet Moss & Mind, a student-focused concept exploring everyday wellness rituals, campus routines, and study balance at your own pace.',
  },
  '/blog': {
    title: 'Mindful Study Breaks | Moss & Mind Field Notes',
    description:
      'Read Moss & Mind field notes on mindful study breaks, student life, and the ideas behind our fictional tea and nootropic concepts.',
  },
  '/privacy': {
    title: 'Privacy Notice | Moss & Mind',
    description:
      'Learn how the Moss & Mind student e-commerce course demo handles cart data, test checkout, hosting, and privacy settings.',
  },
};

export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const page = pages[pathname] ?? {
      title: 'Page Not Found | Moss & Mind',
      description: 'Find your way back to Moss & Mind products or the home page.',
      robots: 'noindex, follow',
    };
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute('content', page.robots ?? 'index, follow');

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
