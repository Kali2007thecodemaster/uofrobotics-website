import React from 'react';

const STATS = [
  {
    figure: <>6<i>/32</i></>,
    note: 'WorldSkills robotics final, 2019. Sixth of thirty-two teams.',
  },
  {
    figure: <span data-count="44.9" data-suffix="%">44.9%</span>,
    note: 'Best autonomous success rate so far. The model we tried next scored zero.',
  },
  {
    figure: <>20<i>18</i></>,
    note: 'Skills Canada, representing Saskatchewan. Where all of this comes from.',
  },
  {
    figure: <span data-count="4">4</span>,
    note: 'Teams running at once: electronics, software, mechanical, external.',
  },
];

export default function Proof() {
  return (
    <section className="proof slide" id="proof" data-slide="Four numbers" data-reveal>
      <p className="ch" data-item style={{ position: 'static', color: 'rgba(255,255,255,.55)' }}>
        Chapter six
      </p>
      <h2 className="proof__lead" data-item data-grow="0.8">
        Four numbers, before we ask you for anything.{' '}
        <em>Every one of them is checkable.</em>
      </h2>

      <div className="proof__grid">
        {STATS.map((s, i) => (
          <div className="stat" key={s.note} data-item style={{ '--d': `${180 + i * 60}ms` }}>
            <b>{s.figure}</b>
            <span>{s.note}</span>
          </div>
        ))}
      </div>

      <p className="proof__foot" data-item style={{ '--d': '420ms' }}>
        Ratified campus group of the University of Regina Students&#39; Association.
        Own bank account, signing authority held jointly by the President and VP Finance.
      </p>
    </section>
  );
}
