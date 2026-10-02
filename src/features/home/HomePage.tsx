import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { Hero } from './components/Hero';
import { ProductCollection } from '../catalog/components/ProductCollection';
import { Philosophy } from './components/Philosophy';
import { FieldNote } from './components/FieldNote';
import './home.css';

export function HomePage() {
  useLayoutEffect(() => {
    // Home anchors may not exist yet when a client-rendered document first loads.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <>
      <Hero />
      <ProductCollection />
      <Philosophy />
      <FieldNote />
      <div className="closing-note">
        <p>
          A little more you.
          <br />
          <em>A little more possibility.</em>
        </p>
        <Link className="button" to="/collection">
          Find your everyday ritual <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}
