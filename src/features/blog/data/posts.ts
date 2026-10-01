// Static blog content. Keep post copy here, outside the presentation components,
// so a future CMS or API can return the same shape.
export type BlogPost = {
  id: string;
  number: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  topic: string;
  summary: string;
  body: readonly string[];
};

export const posts: readonly BlogPost[] = [
  {
    id: 'welcome',
    number: '001',
    title: 'Welcome to a little more balance.',
    author: 'The Moss & Mind team',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'From the founders',
    summary:
      'We’re a group of five students creating Moss & Mind for our CP340 e-commerce project. We wanted to imagine a store that understands the rhythm of student life: early classes, busy weeks, and all the moments in between.',
    body: [
      'Our starting point is a concept collection of nootropics, teas, and simple rituals, wrapped in a calmer corner of the internet. This first chapter is about the idea, the design, and the people we’re building it for.',
      'As the project grows, we’ll develop the store’s pages, share more field notes, and explore how an e-commerce platform works behind the scenes. For now, the products and packaging are fictional. We’re excited to learn together and give this idea room to grow.',
      'Thanks for being here at the beginning.',
    ],
  },
  {
    id: 'everyday-collection',
    number: '002',
    title: 'Meet the everyday collection.',
    author: 'The Moss & Mind team',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'The collection',
    summary:
      'Our concept collection has five pieces: two capsules, two teas, and a starter set. Each one is built around a small moment in a student day.',
    body: [
      'Daily Focus is for your next chapter, and Evening Unwind is for making room for slow. Mindful Matcha and The Pause Tea are the ritual side of the collection, a small green moment and a warm cup between classes. The Semester Set pairs Daily Focus with Mindful Matcha as a little of everything.',
      'Everything in the collection is fictional. The descriptions, prices, and packaging are illustrative, and we make no claims about sleep, stress relief, or treatment. A real product would need a real formulation, ingredient list, and qualified review before any sale.',
    ],
  },
  {
    id: 'how-its-built',
    number: '003',
    title: 'How the site is built.',
    author: 'The Moss & Mind team',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'Behind the scenes',
    summary:
      'Moss & Mind is a React and TypeScript app built with Vite and hosted on Vercel. Here is how we kept it simple.',
    body: [
      'Each part of the site lives in its own feature folder, such as home, catalog, blog, about, and privacy. Shared pieces like the header, footer, and brand mark sit in a common components folder, and the colors, fonts, and spacing come from one set of design tokens.',
      'Product content is kept in a static data file, separate from the components that display it. That means a future catalog API could return the same shape without changing how the product cards look.',
    ],
  },
];
