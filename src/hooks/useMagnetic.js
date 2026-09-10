import { useEffect } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

/** Controls marked `.magnetic` lean toward the cursor. Pointer devices only. */
export default function useMagnetic(routeKey) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover:hover)').matches) return undefined;
    const els = Array.from(document.querySelectorAll('.magnetic'));
    const cleanups = els.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.32;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`;
      };
      const leave = () => {
        el.style.transform = '';
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        leave();
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [routeKey, reduced]);
}
