import React from 'react';

/** The chapter rail on the right edge. Built from whatever `.slide` sections the route rendered. */
export default function SlideIndex({ slides, current, onGo }) {
  const dim = slides[current] && slides[current].id === 'lab';

  return (
    <nav className="index" id="index" aria-label="Sections" data-dim={dim ? 'true' : 'false'}>
      {slides.map((s, i) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Go to ${s.label}`}
          aria-current={i === current ? 'true' : 'false'}
          onClick={() => onGo(i)}
        >
          <span>{s.label}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}
