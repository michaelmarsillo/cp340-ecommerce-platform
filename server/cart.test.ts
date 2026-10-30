import assert from 'node:assert/strict';
import { test } from 'node:test';
import { addItem, cartTotalCents, restoreCart, setQuantity } from '../src/features/cart/cart.ts';

test('repeated additions, large quantities, removal, and CAD cents', () => {
  let items = addItem([], 'daily-focus');
  items = addItem(items, 'daily-focus');
  items = addItem(items, 'evening-unwind');
  assert.deepEqual(items, [
    { productId: 'daily-focus', quantity: 2 },
    { productId: 'evening-unwind', quantity: 1 },
  ]);
  assert.equal(cartTotalCents(items), 8200);
  assert.equal(setQuantity(items, 'daily-focus', 0), items);
  assert.equal(setQuantity(items, 'daily-focus', -1), items);
  assert.equal(setQuantity(items, 'daily-focus', 1.5), items);
  items = setQuantity(items, 'daily-focus', 11);
  items = addItem(items, 'daily-focus');
  assert.equal(items[0]?.quantity, 12);
  items = setQuantity(items, 'daily-focus', 1000);
  assert.equal(items[0]?.quantity, 1000);
  assert.equal(cartTotalCents(items), 2802600);
  assert.equal(setQuantity(items, 'daily-focus', Number.MAX_SAFE_INTEGER), items);
  assert.deepEqual(
    items.filter((item) => item.productId !== 'daily-focus'),
    [{ productId: 'evening-unwind', quantity: 1 }],
  );
});

test('restored data accepts only known, unique IDs and safe positive integer quantities', () => {
  assert.deepEqual(restoreCart('{bad'), []);
  assert.deepEqual(restoreCart('{}'), []);
  assert.deepEqual(
    restoreCart(
      JSON.stringify([
        { productId: 'daily-focus', quantity: 2 },
        { productId: 'daily-focus', quantity: 3 },
        { productId: 'unknown', quantity: 1 },
        { productId: 'evening-unwind', quantity: 1.5 },
        { productId: 'pause-tea', quantity: 11 },
        { productId: 'semester-set', quantity: Number.MAX_SAFE_INTEGER },
        { productId: 'mindful-matcha', quantity: 1, price: 0 },
      ]),
    ),
    [
      { productId: 'daily-focus', quantity: 2 },
      { productId: 'pause-tea', quantity: 11 },
    ],
  );
});
