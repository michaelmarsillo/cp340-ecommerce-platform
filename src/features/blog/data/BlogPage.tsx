import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { posts } from './data/posts';
import './blog.css';

export function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="FIELD NOTES"
        title={
          <>
            Notes from the <em>growing</em> project.
          </>
        }
        description="Short updates from the Moss & Mind team about the ideas, design, and the things we're learning along the way."
      />
      <section className="blog-list container" aria-label="Field notes">
        {posts.map((post) => (
          <article className="blog-post" key={post.id} aria-labelledby={`post-${post.id}`}>
            <div className="blog-post-side">
              <span className="eyebrow">FIELD NOTES / NO. {post.number}</span>
              <p className="blog-post-topic">{post.topic}</p>
            </div>
            <div className="blog-post-card">
              <div className="blog-post-meta">
                <span>{post.author}</span>
                <span>
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h2 id={`post-${post.id}`}>{post.title}</h2>
              <p>{post.summary}</p>
              <details className="blog-post-details">
                <summary>
                  Read the rest <ArrowUpRight size={17} aria-hidden="true" />
                </summary>
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </details>
            </div>
          </article>
        ))}
      </section>
      <p className="blog-footnote container">
        All products and prices mentioned here are fictional and part of a class project.
      </p>
    </>
  );
}
