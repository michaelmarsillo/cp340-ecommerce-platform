export function flyToCart(source: Element | null, closeDialog?: () => void) {
  const cart = document.querySelector('.header-cart');
  const from = source?.getBoundingClientRect();
  const to = cart?.getBoundingClientRect();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const flyer =
    !reducedMotion && source instanceof HTMLElement && from && to
      ? (source.cloneNode(true) as HTMLElement)
      : null;

  closeDialog?.();
  if (!flyer || !from || !to) return;

  flyer.setAttribute('aria-hidden', 'true');
  Object.assign(flyer.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: '0',
    pointerEvents: 'none',
    zIndex: '9999',
  });
  document.body.append(flyer);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const flight = flyer.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0 },
      {
        transform: `translate(${dx * 0.55}px, ${dy * 0.35}px) scale(0.65)`,
        opacity: 1,
        offset: 0.5,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.2, offset: 1 },
    ],
    { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  );
  flight.finished
    .then(() => {
      flyer.remove();
      cart?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }],
        { duration: 280, easing: 'ease-out' },
      );
    })
    .catch(() => flyer.remove());
}
