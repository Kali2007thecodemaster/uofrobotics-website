import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/** A 5x7 block font, so the counter is drawn rather than typeset. */
const GLYPH = {
  0: ['█████', '█   █', '█   █', '█   █', '█   █', '█   █', '█████'],
  1: ['   █ ', '  ██ ', '   █ ', '   █ ', '   █ ', '   █ ', '  ███'],
  2: ['█████', '    █', '    █', '█████', '█    ', '█    ', '█████'],
  3: ['█████', '    █', '    █', '█████', '    █', '    █', '█████'],
  4: ['█   █', '█   █', '█   █', '█████', '    █', '    █', '    █'],
  5: ['█████', '█    ', '█    ', '█████', '    █', '    █', '█████'],
  6: ['█████', '█    ', '█    ', '█████', '█   █', '█   █', '█████'],
  7: ['█████', '    █', '    █', '    █', '    █', '    █', '    █'],
  8: ['█████', '█   █', '█   █', '█████', '█   █', '█   █', '█████'],
  9: ['█████', '█   █', '█   █', '█████', '    █', '    █', '█████'],
};

const LOG = [
  'reading mark.svg',
  'loading so-arm101.mp4',
  'mounting the lab',
  'checking the bench',
  'wiring the grid',
  'ready',
];

const DURATION = 2100;

/** Renders the number, last digit in red, as pre-formatted block characters. */
function asciiRows(str) {
  const rows = ['', '', '', '', '', '', ''];
  const red = ['', '', '', '', '', '', ''];
  for (let c = 0; c < str.length; c += 1) {
    const g = GLYPH[str[c]] || GLYPH[0];
    const last = c === str.length - 1;
    for (let r = 0; r < 7; r += 1) {
      if (last) red[r] += `${g[r]}  `;
      else rows[r] += `${g[r]}  `;
    }
  }
  return { plain: rows, accent: red };
}

export default function Boot({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);
  const barRef = useRef(null);

  const finish = React.useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setDone(true);
    document.body.setAttribute('data-loading', 'false');
    onDone();
  }, [onDone]);

  useEffect(() => {
    document.body.setAttribute('data-loading', 'true');
    if (reduced) {
      finish();
      return undefined;
    }

    let raf = 0;
    let timer = 0;
    let t0 = null;
    const run = (now) => {
      if (finished.current) return;
      if (t0 === null) t0 = now;
      const t = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - (1 - t) ** 2.2;
      setPct(Math.round(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) raf = requestAnimationFrame(run);
      else timer = setTimeout(finish, 260);
    };
    raf = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduced, finish]);

  const label = String(pct).padStart(3, '0');
  const { plain, accent } = asciiRows(label);
  const rows = plain.map((line, i) => ({ line, red: accent[i] }));

  return (
    <div className="boot" id="boot" data-done={done ? 'true' : 'false'}>
      <div className="boot__top">
        <span>UofRobotics<sup>®</sup></span>
        <span id="boot-pct">{label}</span>
      </div>
      <div className="boot__mid">
        <pre className="boot__digits" id="boot-digits">
          {rows.map((r, i) => (
            <React.Fragment key={i}>
              {r.line}
              <b>{r.red}</b>
              {i < rows.length - 1 ? '\n' : ''}
            </React.Fragment>
          ))}
        </pre>
      </div>
      <div>
        <div className="boot__bottom">
          <span className="boot__log" id="boot-log">
            {LOG[Math.min(LOG.length - 1, Math.floor((pct / 100) * LOG.length))]}
          </span>
          <button
            id="boot-skip"
            type="button"
            style={{ fontSize: '11px', borderBottom: '1px solid currentColor' }}
            onClick={finish}
          >
            Skip
          </button>
        </div>
        <div className="boot__bar">
          <i id="boot-bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
}
