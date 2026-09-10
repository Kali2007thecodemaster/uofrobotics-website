import { useEffect } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

const NOISE = '0123456789/\\<>#*+=';

/** Section headings resolve out of noise instead of fading in. */
function scramble(el, reduced) {
  if (el.dataset.done === '1' || reduced) return;
  el.dataset.done = '1';
  const target = el.textContent.trim();
  let i = 0;
  const step = () => {
    let out = '';
    for (let c = 0; c < target.length; c += 1) {
      out += c < i || target[c] === ' '
        ? target[c]
        : NOISE[Math.floor(Math.random() * NOISE.length)];
    }
    el.textContent = out;
    i += Math.max(1, target.length / 22);
    if (i < target.length) requestAnimationFrame(step);
    else el.textContent = target;
  };
  step();
}

/** Sponsorship amounts count up when the slide arrives. */
function countUp(el, reduced) {
  if (el.dataset.done === '1' || reduced) return;
  el.dataset.done = '1';
  const end = parseFloat(el.dataset.count);
  const dec = (el.dataset.count.split('.')[1] || '').length;
  const pre = el.dataset.prefix || '';
  const suf = el.dataset.suffix || '';
  const show = (n) =>
    pre + (dec ? n.toFixed(dec) : Math.round(n).toLocaleString('en-CA')) + suf;
  let t0 = null;
  const step = (now) => {
    if (t0 === null) t0 = now;
    const t = Math.min((now - t0) / 1100, 1);
    el.textContent = show(end * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = show(end);
  };
  requestAnimationFrame(step);
}

/**
 * Watches every [data-reveal] section on the current route and fires its wipe,
 * scramble and count-up once. Re-runs when the route changes because each page
 * mounts a fresh set of sections.
 */
export default function useReveal(routeKey) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!sections.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      sections.forEach((s) => s.classList.add('is-in'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          e.target.querySelectorAll('[data-scramble]').forEach((n) => scramble(n, reduced));
          e.target.querySelectorAll('[data-count]').forEach((n) => countUp(n, reduced));
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [routeKey, reduced]);
}
