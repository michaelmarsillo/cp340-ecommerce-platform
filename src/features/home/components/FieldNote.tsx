import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FieldNote() {
  return (
    <section
      className="field-note-section section-space container"
      id="field-notes"
      aria-labelledby="field-note-title"
    >
      <div className="field-note-intro">
        <span className="eyebrow">FROM THE BLOG / NO. 001</span>
        <h2 id="field-note-title">
          Good things
          <br />
          <em>start small.</em>
        </h2>
        <p>A few words from the people behind the idea.</p>
      </div>
      <article className="field-note-card">
        <div className="field-note-meta">
          <span>FROM THE FOUNDERS</span>
          <span>OCTOBER 2026 · 2 MIN READ</span>
        </div>
        <h3>Welcome to a little more balance.</h3>
        <p>
          We’re a group of five students creating Moss & Mind for our CP340 e-commerce project. We
          wanted to imagine a store that understands the rhythm of student life: early classes, busy
          weeks, and all the moments in between.
        </p>
        <p>
          Our starting point is a concept collection of nootropics, teas, and simple rituals,
          wrapped in a calmer corner of the internet. This first chapter is about the idea, the
          design, and the people we’re building it for.
        </p>
        <Link className="field-note-link" to="/blog">
          Read more on the Blog <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </article>
    </section>
  );
}
