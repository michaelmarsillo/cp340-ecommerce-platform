import { ArrowUpRight, Leaf, Sparkles } from 'lucide-react';
import { BrandMark } from '../../../components/ui/BrandMark';
import { ProductIllustration } from '../../catalog/components/ProductIllustration';

function BotanicalSprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 160 300" fill="none" aria-hidden="true">
      <path d="M81 290C83 228 40 169 99 33" stroke="currentColor" strokeWidth="3" />
      <path d="M76 241C29 236 4 216 9 186C47 182 76 207 76 241Z" fill="currentColor" />
      <path d="M76 211C119 204 143 179 137 148C104 151 78 177 76 211Z" fill="currentColor" />
      <path d="M72 169C31 168 12 140 20 114C54 121 71 138 72 169Z" fill="currentColor" />
      <path d="M81 137C119 129 136 105 124 79C94 83 83 106 81 137Z" fill="currentColor" />
      <path d="M89 93C56 85 46 66 56 40C84 53 91 69 89 93Z" fill="currentColor" />
      <path d="M97 55C99 24 115 5 139 10C145 37 120 54 97 55Z" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="hero-eyebrow">
          <span /> GOOD DAYS START WITH LITTLE THINGS
        </span>
        <h1 id="hero-title">
          Your mind.
          <br />
          Your pace.
          <br />
          <em>Your next chapter.</em>
        </h1>
        <p className="hero-description">
          Nootropics and everyday rituals, with students in mind. A little space for balance in a
          world that keeps you busy.
        </p>
        <div className="hero-actions">
          <a className="button" href="#collection">
            Explore the collection <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="hero-secondary" href="#philosophy">
            Get to know us <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-footnote">
          <Leaf size={16} aria-hidden="true" /> Rooted in simple rituals. Inspired by student life.
        </div>
      </div>
      <div
        className="hero-art"
        role="img"
        aria-label="Illustrated Daily Focus and Evening Unwind bottles surrounded by botanical leaves on a lavender background"
      >
        <div className="hero-art-grain" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <span className="art-note art-note-top">
          a little more
          <br />
          <em>balance.</em>
        </span>
        <Sparkles className="hero-sparkle" size={30} strokeWidth={1.2} />
        <BotanicalSprig className="botanical botanical-left" />
        <BotanicalSprig className="botanical botanical-right" />
        <div className="hero-pedestal" />
        <ProductIllustration
          className="hero-bottle hero-bottle-back"
          name="Evening Unwind"
          tone="lavender"
        />
        <ProductIllustration
          className="hero-bottle hero-bottle-front"
          name="Daily Focus"
          tone="sage"
        />
        <div className="hero-sticker">
          <BrandMark />
          <span>
            GROW AT
            <br />
            YOUR OWN PACE
          </span>
        </div>
        <span className="art-note art-note-bottom">
          For the beautifully
          <br />
          busy mind.
        </span>
        <span className="hero-art-caption">THE MOSS & MIND COLLECTION / 01</span>
      </div>
      <div className="hero-bottom">
        <span>LESS RUSH. MORE ROOM TO GROW.</span>
        <span>
          SCROLL TO FIND YOUR EVERYDAY <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
