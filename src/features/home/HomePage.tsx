import { Hero } from './components/Hero';
import { ProductCollection } from '../catalog/components/ProductCollection';
import { Philosophy } from './components/Philosophy';
import { FieldNote } from './components/FieldNote';
import './home.css';

export function HomePage() {
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
        <a className="button" href="#collection">
          Find your everyday ritual <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
