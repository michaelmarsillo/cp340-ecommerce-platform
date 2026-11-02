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
        description="Explore fictional student wellness products for everyday wellness rituals, from Mindful Matcha to The Pause Tea. Details and prices are illustrative."
      />
      <ProductCollection variant="full" />
    </div>
  );
}
