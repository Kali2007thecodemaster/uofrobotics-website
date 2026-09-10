import React, { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset';
import scorpionPath from '../lib/scorpionPath';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const FIELDS = [
  {
    id: 'mark',
    name: 'The mark',
    note: 'Drawn once, welded onto everything since.',
    mark: true,
  },
  {
    id: 'showcase',
    name: 'Showcase',
    note: 'The arm runs live, all day, in front of strangers.',
    img: 'showcase.jpg',
    alt: 'The SO-ARM101 demo set up beside a poster at a university showcase',
  },
  {
    id: 'hexapod',
    name: 'Hexapod',
    note: 'Six legs, eighteen servos, walking on its own.',
    video: 'hexapod.mp4',
    poster: 'hexapod-poster.jpg',
    alt: 'A six-legged robot walking across a shop floor',
  },
  {
    id: 'so-arm101',
    name: 'SO-ARM101',
    note: 'Pick and place, learned from demonstrations. The build the club came back for.',
    video: 'so-arm101.mp4',
    poster: 'so-arm101-poster.jpg',
    alt: 'The SO-ARM101 picking up a block and dropping it in a bin',
  },
  {
    id: 'founding-team',
    name: 'Founding team',
    note: 'The room, the banner, and the people who started it.',
    img: 'founding-team.jpg',
    alt: 'Club members standing under the U of Robotics banner with two rovers',
  },
  {
    id: 'field-rover',
    name: 'Field rover',
    note: 'The rolling test bed. Older, heavier, still running.',
    img: 'rover.jpg',
    alt: 'A tracked rover parked in a university hallway',
  },
];

const HEADLINE = ['UofRobotics®', 'Student-built', 'machines at', 'the U of R.'];

const DISCIPLINES = [
  'Mechanical', 'Electronics', 'Embedded systems', 'Computer vision',
  'Machine learning', 'Fabrication', 'CAD', '…',
];

function useClocks() {
  const fmt = (tz) => {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz,
      }).format(new Date());
    } catch (e) {
      return '--:--';
    }
  };
  const [times, setTimes] = useState(() => ({
    regina: fmt('America/Regina'),
    local: fmt(undefined),
  }));
  useEffect(() => {
    const id = setInterval(
      () => setTimes({ regina: fmt('America/Regina'), local: fmt(undefined) }),
      20000
    );
    return () => clearInterval(id);
  }, []);
  return times;
}

export default function Hero({ ready }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const hoverTimer = useRef(null);
  const pathRef = useRef(null);
  const videoRefs = useRef({});
  const times = useClocks();

  const open = useCallback((i) => setActive((i + FIELDS.length) % FIELDS.length), []);

  // the visitor taking control cancels the opening sequence
  useEffect(() => {
    const mark = () => { touched.current = true; };
    const opts = { once: true, passive: true };
    ['pointerdown', 'keydown', 'wheel'].forEach((e) => window.addEventListener(e, mark, opts));
    return () => ['pointerdown', 'keydown', 'wheel'].forEach((e) => window.removeEventListener(e, mark));
  }, []);

  // the mark draws itself, then hands over to the arm
  useEffect(() => {
    if (!ready || reduced) return undefined;
    const path = pathRef.current;
    if (!path) return undefined;

    let len = 0;
    try { len = path.getTotalLength(); } catch (e) { len = 0; }
    if (!len) return undefined;

    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    let raf = 0;
    let t0 = null;
    const step = (now) => {
      if (t0 === null) t0 = now;
      const t = Math.min((now - t0) / 2400, 1);
      path.style.strokeDashoffset = len * (1 - (1 - (1 - t) ** 3));
      if (t < 1) raf = requestAnimationFrame(step);
      else path.style.strokeDasharray = 'none';
    };
    raf = requestAnimationFrame(step);

    const handOver = setTimeout(() => {
      if (!touched.current) open(1);
    }, 3000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(handOver);
    };
  }, [ready, reduced, open]);

  // a clip only runs while its own field is open
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, v]) => {
      if (!v) return;
      if (Number(i) === active) {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const onEnter = (i) => (e) => {
    if (e.pointerType === 'touch') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => open(i), 70);
  };

  const onRailKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); open(active + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); open(active - 1); }
  };

  return (
    <section className="hero slide" id="home" data-slide="Home" data-reveal>
      <div className="hero__left">
        <h1 className="hero__title" data-grow="0.86">
          {HEADLINE.map((line, i) => (
            <span key={line}>
              <b style={{ '--d': `${i * 80}ms` }}>
                {line === 'UofRobotics®' ? <>UofRobotics<sup>®</sup></> : line}
              </b>
            </span>
          ))}
        </h1>

        <ul className="disciplines" data-item style={{ '--d': '480ms' }}>
          {DISCIPLINES.map((d) => <li key={d}>{d}</li>)}
        </ul>

        <p className="hero__hint" data-item style={{ '--d': '560ms' }}>
          A student club at the<br />University of Regina.<br />Open a field to start.
        </p>

        <div className="hero__foot" data-item style={{ '--d': '640ms' }}>
          <div className="pills">
            <span className="pill pill--solid" id="clock-regina">{times.regina} Regina</span>
            <span className="pill pill--out" id="clock-local">{times.local} Your time</span>
          </div>
          <p className="meta dim">U—of—R</p>
        </div>
      </div>

      <div className="hero__rail" id="rail" onKeyDown={onRailKey}>
        <div className="rail__arrows">
          <button
            className="arrow magnetic" id="prev" type="button" aria-label="Previous field"
            onClick={(e) => { e.stopPropagation(); open(active - 1); }}
          >
            &#8592;
          </button>
          <button
            className="arrow magnetic" id="next" type="button" aria-label="Next field"
            onClick={(e) => { e.stopPropagation(); open(active + 1); }}
          >
            &#8594;
          </button>
        </div>

        {FIELDS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            className={f.mark ? 'panel panel--mark' : 'panel'}
            data-active={i === active ? 'true' : 'false'}
            aria-label={f.name}
            onClick={() => open(i)}
            onFocus={() => open(i)}
            onPointerEnter={onEnter(i)}
            onPointerLeave={() => clearTimeout(hoverTimer.current)}
          >
            <span className="panel__media">
              {f.mark && (
                <svg className="scorpion" viewBox="0 0 531 799" role="img" aria-label="The club's scorpion mark, drawn in line">
                  <path id="scorpion-path" ref={pathRef} d={scorpionPath} />
                </svg>
              )}
              {f.video && (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={asset(f.video)}
                  poster={asset(f.poster)}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={f.alt}
                />
              )}
              {f.img && <img src={asset(f.img)} alt={f.alt} />}
            </span>
            <span className="panel__index">{String(i + 1).padStart(2, '0')}</span>
            <span className="panel__spine">{f.name}</span>
            <span className="panel__card">
              <span className="panel__name">{f.name}</span>
              <span className="panel__note">{f.note}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
