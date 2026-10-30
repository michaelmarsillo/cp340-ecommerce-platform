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
  series: string;
  summary: string;
  body: readonly string[];
};

// Series headings. Posts with the same series are grouped under one heading on the blog page.
export const PROJECT_NOTES = 'About the project';
export const RITUALS_SERIES = 'Rituals for student life';

export const posts: readonly BlogPost[] = [
  // ===========================================================================
  // SERIES 1: ABOUT THE PROJECT (notes 001-004)
  // Welcome, the collection, how the site is built, and privacy.
  // ===========================================================================
  {
    id: 'welcome',
    series: PROJECT_NOTES,
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
    series: PROJECT_NOTES,
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
    series: PROJECT_NOTES,
    number: '003',
    title: 'How the site is built.',
    author: 'The Moss & Mind team',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'Behind the scenes',
    summary:
      'Moss & Mind is a React and TypeScript app built with Vite and hosted on Vercel. Here is how we kept it simple.',
    body: [
      'Each part of the site lives in its own feature folder, such as home, catalog, blog, about, and privacy. Shared pieces like the header, footer, and brand mark sit in a common components folder, and the colors, fonts, and spacing come from one set of design tokens. Sign-in is handled by Firebase Authentication.',
      'Product content is kept in a static data file, separate from the components that display it. That means a future catalog API could return the same shape without changing how the product cards look.',
    ],
  },
  {
    id: 'privacy-first',
    series: PROJECT_NOTES,
    number: '004',
    title: 'What we collect, and why.',
    author: 'The Moss & Mind team',
    date: 'October 2026',
    readTime: '1 min read',
    topic: 'Privacy',
    summary:
      'We keep the personal information on this site to a minimum. The only details are an email address and a password for the five demo accounts used by the project team.',
    body: [
      'Firebase Authentication handles sign-in and stores passwords in hashed form, so we can’t see them. We don’t collect usernames, names, addresses, or payment details, and Google Analytics isn’t enabled. Our privacy page explains the rest in plain words.',
    ],
  },
  // ===========================================================================
  // SERIES 2: RITUALS FOR STUDENT LIFE (notes 005-007)
  // Content marketing posts, written for Assignment 2 (Shailesh).
  // Each post: 150-200+ words. Products are fictional; no medical claims.
  // ===========================================================================

  // --- 005: Everyday rituals ---
  {
    id: 'five-minute-pause',
    series: RITUALS_SERIES,
    number: '005',
    title: 'The five-minute pause between classes.',
    author: 'Shailesh Mathrani',
    date: 'October 2026',
    readTime: '1 min read',
    topic: 'Everyday rituals',
    summary:
      'Student days tend to run back to back: lecture, lab, library, repeat. A five-minute pause between classes won’t clear your schedule, but it can give the day a little breathing room.',
    body: [
      'The idea is simple. Pick one small ritual and keep it the same every time. For many students that means a warm cup of something. Heat the kettle, steep a tea bag, or whisk a little matcha, and stay with the task until it’s done. There’s no screen, no notifications, and no inbox. The point is the routine itself, not the drink.',
      'A ritual works best when it’s easy. Keep your tea or matcha in your bag, use the same mug, and choose a spot you can reach between lectures, like a quiet bench or a corner of the library. If five minutes feels like too much, start with two.',
      'This is the thinking behind Mindful Matcha and The Pause Tea, two concept products in our collection. They’re fictional for now, but the habit is real: a small, repeatable moment that belongs to you.',
    ],
  },
  // --- 006: Student life ---
  {
    id: 'calmer-study-routine',
    series: RITUALS_SERIES,
    number: '006',
    title: 'Building a calmer study routine, one habit at a time.',
    author: 'Shailesh Mathrani',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'Student life',
    summary:
      'A calmer study routine doesn’t need a big reset. Most routines that last start with one small habit that is easy to repeat, even on a busy week.',
    body: [
      'Start with where you study. Choosing the same desk or library spot most days gives your brain a cue that it’s time to begin. Then decide how long you’ll work before you stop. Short blocks with planned breaks, such as 25 minutes on and five minutes off, are easier to start than an open-ended evening.',
      'Keep your phone out of reach while a block is running, and write down the one thing you want to finish before you sit down. Ending a session with a short note about where you stopped makes tomorrow’s start much easier.',
      'Pair the routine with something you enjoy. A favorite playlist, a snack, or a warm drink after each block turns the break into something to look forward to. Our concept Daily Focus is built around this idea of a small daily ritual. It is fictional, and we make no claims about what it does.',
      'Progress at your own pace. A routine you can keep is worth more than a perfect plan you abandon by Friday.',
    ],
  },
  // --- 007: Evening rituals ---
  {
    id: 'after-a-long-day',
    series: RITUALS_SERIES,
    number: '007',
    title: 'How to wind down after a long campus day.',
    author: 'Shailesh Mathrani',
    date: 'October 2026',
    readTime: '2 min read',
    topic: 'Evening rituals',
    summary:
      'After a full day of classes, work, and group chats, switching off isn’t automatic. A short evening ritual can help you mark the end of the day.',
    body: [
      'Try treating the end of the day as its own small event. Put your bag away, change into comfortable clothes, and close the tabs you don’t need. Doing the same few things in the same order each night turns them into a signal that the day is done.',
      'Next, choose something slow. Make a warm cup of herbal tea, stretch for a few minutes, read a few pages of something that isn’t a textbook, or write down tomorrow’s top three tasks so they’re out of your head. None of it has to take long. Ten minutes is plenty.',
      'Keep screens dim or out of the way for a while, and make the space feel calm with a lamp, a candle-free corner, or a favorite blanket. Small details help the ritual feel like yours.',
      'This is the spirit behind Evening Unwind, a fictional concept in our collection. We make no claims about sleep or stress, and nothing here is medical advice. It simply reflects how much we value slowing down after a busy day.',
    ],
  },
];
