import { PageHeader } from '../../components/layout/PageHeader';
import { ProductCollection } from './components/ProductCollection';
import './collection-page.css';

export function CollectionPage() {
  return (
    <div className="collection-page">
      <PageHeader
        eyebrow="PRODUCTS / THE COMPLETE COLLECTION"
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
