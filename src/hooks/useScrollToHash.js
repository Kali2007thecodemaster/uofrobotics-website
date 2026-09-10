import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Router links carry the anchors the static site used (`/work#builds`). React
 * does not act on a hash by itself, so scroll to it after the route paints —
 * and go to the top when there is no hash, which is what a page change should do.
 */
export default function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    // one frame so the route's sections exist before we look for the target
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
}
