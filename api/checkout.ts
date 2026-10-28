import { handleCheckout } from '../server/checkout.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';

export default async function checkout(request: IncomingMessage, response: ServerResponse) {
  await handleCheckout(request, response);
}
