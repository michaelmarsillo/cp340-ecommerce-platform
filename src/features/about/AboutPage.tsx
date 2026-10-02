import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowUpRight, BookOpen, Leaf, Sparkles } from 'lucide-react';
import { BottleScene } from './BottleScene';
import './about.css';

export function AboutPage() {
  const visualRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="about-story" aria-labelledby="about-title">
        <div className="about-story-copy">
          <div className="about-intro">
            <span className="eyebrow">A LITTLE ABOUT MOSS & MIND</span>
            <h1 id="about-title">
              Made for minds <em>in motion.</em>
            </h1>
            <p>
              Between early lectures, late library sessions, and everything in between, student life
              asks a lot of you. Moss & Mind is a student-focused concept for nootropics and simple
              daily rituals, built around making space for your own pace.
            </p>
            <span className="about-scroll-cue">
              KEEP SCROLLING TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
          </div>

          <div className="about-chapter">
            <span className="about-chapter-number">01 / THE IDEA</span>
            <h2>
              A little room to <em>focus.</em>
            </h2>
            <p>
              Daily Focus is our take on the everyday nootropic bottle: a small ritual for the
              beautifully busy student. Its soft greens, familiar form, and thoughtful details are
              designed to feel at home on a desk, beside a notebook or a cup of tea.
            </p>
          </div>

          <div className="about-chapter about-chapter-last">
            <span className="about-chapter-number">02 / THE PHILOSOPHY</span>
            <h2>
              Progress at <em>your pace.</em>
            </h2>
            <p>
              We believe a good day can include ambition and a pause. Our collection takes its cues
              from real campus routines, with room for rest, curiosity, and the things that make you
              feel like yourself.
            </p>
          </div>
        </div>
        <div className="about-visual-column" ref={visualRef}>
          <BottleScene sectionRef={visualRef} />
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="container">
          <span className="eyebrow">WHAT ROOTS US</span>
          <h2 id="about-values-title">
            The little things <em>matter.</em>
          </h2>
          <div className="about-value-grid">
            <div>
              <Leaf size={25} strokeWidth={1.4} aria-hidden="true" />
              <h3>Everyday rituals</h3>
              <p>Small moments that fit naturally into a full schedule.</p>
            </div>
            <div>
              <BookOpen size={25} strokeWidth={1.4} aria-hidden="true" />
              <h3>Student life, understood</h3>
              <p>Inspired by the rhythms and realities of campus days.</p>
            </div>
            <div>
              <Sparkles size={25} strokeWidth={1.4} aria-hidden="true" />
              <h3>Room to be you</h3>
              <p>A gentler way to think about growth and possibility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-end container">
        <span className="eyebrow">A NOTE FROM OUR TEAM</span>
        <h2>
          For the beautifully <em>busy mind.</em>
        </h2>
        <p>
          Moss & Mind is a course concept. The products and packaging shown here are fictional;
          ingredients and health effects have not been established. We&apos;re sharing the idea and
          the intention behind it, one small step at a time.
        </p>
        <Link className="button" to="/collection">
          Explore the collection <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
