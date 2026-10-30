import { Minus, Plus } from 'lucide-react';
import { useCart } from './context';
import { setQuantity } from './cart';

export function QuantityControl({
  productId,
  name,
  quantity,
}: {
  productId: string;
  name: string;
  quantity: number;
}) {
  const { items, update } = useCart();

  function commit(input: HTMLInputElement) {
    const next = Number(input.value);
    if (setQuantity(items, productId, next) === items) {
      input.value = String(quantity);
      return;
    }
    update(productId, next);
  }

  return (
    <div className="quantity-control" role="group" aria-label={`${name} quantity`}>
      <button
        type="button"
        onClick={() => update(productId, quantity - 1)}
        disabled={quantity <= 1}
        aria-label={`Decrease ${name} quantity`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <input
        key={quantity}
        type="number"
        min="1"
        step="1"
        inputMode="numeric"
        defaultValue={quantity}
        aria-label={`${name} quantity`}
        onBlur={(event) => commit(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur();
        }}
      />
      <button
        type="button"
        onClick={() => update(productId, quantity + 1)}
        disabled={setQuantity(items, productId, quantity + 1) === items}
        aria-label={`Increase ${name} quantity`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
