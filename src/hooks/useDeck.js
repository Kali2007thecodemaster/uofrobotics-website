import { useCallback, useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

/**
 * Everything that reacts to the scroll position on a page:
 *   - the list of chapters for the right-hand rail, and which one is current
 *   - the red progress hairline under the nav
 *   - PageUp / PageDown / Space stepping between chapters
 *   - headings that grow as their section arrives  (--grow)
 *   - photographs that drift                       (--py)
 *
 * It reads the DOM rather than a config object on purpose: sections are plain
 * markup, so adding one to a page is enough to make it join the rail.
 */
export default function useDeck(routeKey) {
  const reduced = usePrefersReducedMotion();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const nodes = useRef([]);

  // collect this route's chapters
  useEffect(() => {
    const found = Array.from(document.querySelectorAll('.slide'));
    nodes.current = found;
    setSlides(found.map((s) => ({ id: s.id, label: s.dataset.slide || s.id })));
    setCurrent(0);
  }, [routeKey]);

  const goTo = useCallback(
    (i) => {
      const list = nodes.current;
      if (!list.length) return;
      const clamped = Math.max(0, Math.min(list.length - 1, i));
      list[clamped].scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [reduced]
  );

  // progress bar + which chapter is current
  useEffect(() => {
    const bar = document.getElementById('bar');
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        const list = nodes.current;
        if (list.length) {
          const mid = window.scrollY + window.innerHeight * 0.35;
          let found = 0;
          list.forEach((s, i) => {
            if (s.offsetTop <= mid) found = i;
          });
          setCurrent(found);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [routeKey]);

  // deck keys
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.closest('.panel') || /input|textarea|select/i.test(t.tagName))) return;
      if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  // Type that grows and photographs that drift.
  //
  // The first version ran a rAF loop forever and measured every element on
  // every frame. That is what made scrolling stutter. Now the loop only runs
  // while the page is actually moving, it only measures elements that are on
  // screen, and it skips the write when the value has not visibly changed —
  // a redundant --grow write reflows a 100px heading for nothing.
  useEffect(() => {
    if (reduced) return undefined;
    const growers = Array.from(document.querySelectorAll('[data-grow]'));
    const parallax = Array.from(document.querySelectorAll('[data-parallax]')).map((el) => ({
      el,
      img: el.querySelector('img'),
      amount: parseFloat(el.dataset.parallax) || 0,
    }));
    if (!growers.length && !parallax.length) return undefined;

    const last = new WeakMap();
    let raf = 0;
    let idleFrames = 0;
    let running = false;

    const write = (el, prop, value) => {
      if (last.get(el) === value) return;
      last.set(el, value);
      el.style.setProperty(prop, value);
    };

    const frame = () => {
      const vh = window.innerHeight;

      growers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;   // off screen, skip
        const p = 1 - Math.min(Math.max((r.top - vh * 0.15) / (vh * 0.7), 0), 1);
        const from = parseFloat(el.dataset.grow) || 0.8;
        // quantise to 2% steps: below that the change is invisible but the
        // reflow of a 100px heading is not
        const v = from + (1 - from) * p;
        write(el, '--grow', (Math.round(v * 50) / 50).toFixed(2));
      });

      parallax.forEach(({ el, img, amount }) => {
        if (!img) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        write(img, '--py', `${(p * amount).toFixed(1)}px`);
      });

      // two idle frames after the last scroll event, then stand down
      idleFrames += 1;
      if (idleFrames > 2) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      idleFrames = 0;
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [routeKey, reduced]);

  return { slides, current, goTo };
}
