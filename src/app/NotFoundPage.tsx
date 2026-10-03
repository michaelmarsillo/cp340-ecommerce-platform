import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';

export function NotFoundPage() {
  return (
    <section className="section-space">
      <PageHeader
        eyebrow="PAGE NOT FOUND"
        title="Let's find your way back."
        description="This page isn't part of our collection. You can explore our products or return Home."
      />
      <div className="container section-space">
        <Link className="button" to="/collection">
          Browse products
        </Link>{' '}
        <Link className="text-link" to="/">
          Return Home
        </Link>
      </div>
    </section>
  );
}
