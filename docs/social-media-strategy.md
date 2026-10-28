# Moss & Mind social media strategy

## Audience and platform

Reach university students aged approximately 17–25 who want practical support for study
habits, balanced routines, and everyday campus life. Instagram is the primary platform,
using carousels, short Reels, and still images that fit the site's calm, earthy design.
LinkedIn is a secondary platform for sharing course-project milestones and the student
team's work, with a footer link alongside Instagram.
Twitter / X is also linked in the footer for short study tips and project updates.
YouTube is linked for potential study-routine videos and project walkthroughs.

## Posting rhythm and voice

Propose **3 posts weekly**: a Monday study tip, a Wednesday wellness or student-life post,
and a Friday responsible product-education post. Adjust topics around midterms and exams.
Use a calm, approachable, supportive, and informative voice. Keep advice realistic and
avoid pressure, guaranteed results, or claims that a product improves grades or treats a
health condition. Encourage sustainable habits rather than all-night studying.

## Content pillars

- **Study habits:** manageable study blocks, planning, and breaks away from screens.
- **Wellness routines:** sleep routines, hydration reminders, and time to recharge.
- **Student life:** relatable campus moments, busy weeks, and affordable ways to unwind.
- **Responsible product education:** explain the fictional storefront's product concepts
  and descriptions without medical claims. Clearly identify course-demo content and
  never imply products can currently be purchased.

## Proposed promotional captions

These are draft examples, not evidence of published posts or campaigns.

1. **Study habits carousel:** “A little structure, a little breathing room. Before your
   next study session, choose one manageable task, fill your water bottle, and plan a
   short break. What helps you settle in? Explore the Moss & Mind student wellness
   concept through the link in our bio. 🌿 A CP340 course demo; no products for sale.”
2. **Product-education post:** “Meet Moss & Mind: a student-built storefront concept
   inspired by more balanced university routines. Curious about the ideas behind our
   fictional collection? Visit the link in our bio to browse and learn about the project.
   No purchases available, no promised results—just a course project thoughtfully growing.”

## Connecting Instagram to the website

Once a genuine team-owned account is confirmed, put https://mossandmind.vercel.app in
its bio. Use a clear “Explore the collection” or “Learn about the project” call to action
in relevant captions, directing students to that bio link. The site's footer will offer
a reciprocal Instagram link on every route. Keep the course-demo status clear on both
surfaces. No embeds, tracking scripts, campaign cookies, or analytics are needed.

## Account setup required before publishing

No social profile URL has been supplied or verified. No account activity or campaign
results are claimed. For the course demo, the footer buttons are visible and link to
`https://www.instagram.com/`, `https://www.linkedin.com/`, `https://x.com/`, and
`https://www.youtube.com/` as temporary destinations, as requested. Each button opens
its platform's homepage in a new tab. These are not Moss & Mind accounts.

1. Obtain the real Instagram, LinkedIn, Twitter / X, and YouTube profile URLs from the Moss & Mind team and
   open them to confirm the accounts' identity and ownership with the team.
2. In `src/config/social.ts`, replace the temporary homepage URLs with the full HTTPS
   profile URLs. Do not use guessed handles.
3. Set a value to `null` to hide its button if needed. Only add other platforms when
   genuine account URLs are supplied; extend the configuration and component together.
4. Run the project checks and complete the browser review below before publishing.

## Manual review and assignment screenshots

- Confirm the Instagram, LinkedIn, Twitter / X, and YouTube buttons are visible and open their respective
  homepages for the demo. Set any one to `null` to check that only that button disappears;
  with all set to `null`, no empty heading or social navigation should appear.
- Check the footer at 375px, 768px, and 1440px
  widths. Confirm readable spacing, no horizontal overflow, and a link at least 44px tall.
- Tab to each social button and confirm the visible focus outline. Activate it with Enter and
  click/tap it; both should open the configured destination in a new tab. Inspect the anchor for
  `target="_blank"` and `rel="noopener noreferrer"`. Check its accessible name announces
  the platform and the new tab. Decorative icons should be hidden from screen readers.
- Enable reduced motion and confirm the control remains usable; it adds no animation.
- Visit Home, Products, About, Blog, Privacy, and an unknown route. Confirm the shared
  footer remains present, navigation works, and “Back to the top” still works.
- For the report, capture the enabled desktop footer, mobile footer, and keyboard focus
  state, plus the configured destination opened from the link. Include the configuration
  and strategy as implementation evidence. Clearly identify the current destination as
  a placeholder and mark real account activation as pending.
