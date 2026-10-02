import { useLayoutEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { ProductCollection } from './components/ProductCollection';
import './collection-page.css';

export function CollectionPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="collection-page">
      <title>Collection | Moss &amp; Mind</title>
      <PageHeader
        eyebrow="THE COMPLETE COLLECTION"
        title={
          <>
            Made for the <em>everyday ritual.</em>
          </>
        }
        description="For early lectures, slow evenings, and the moments in between. Find a little something for your own pace."
      />
      <ProductCollection variant="full" />
    </div>
  );
}
