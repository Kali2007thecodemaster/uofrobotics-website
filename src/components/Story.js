import React from 'react';

export default function Story() {
  return (
    <section className="sheet slide" id="story" data-slide="How it started" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter one<b>How it started</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">A competition</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>2018 to now:</p>
          <p className="sheet__lab" data-item style={{ '--d': '160ms' }}>&nbsp;</p>
        </div>
        <div className="sheet__body">
          <div className="sheet__lede" data-item style={{ '--d': '200ms' }}>
            <p><span className="paren">(How it started)</span>
            Two engineering students represented Saskatchewan at Skills Canada in 2018. The next
            year they went to the WorldSkills robotics final and finished sixth out of thirty-two
            teams. They came home and, instead of stopping, started a club.</p>
            <p style={{ marginTop: '1em' }}>Then the campus closed, and the club went quiet. It came back in 2022, ran, and
            then ran down again as that executive graduated — a student club dies every time its
            seniors walk across a stage.</p>
            <p style={{ marginTop: '1em' }}>We revived it in 2026, and the thing we revived it around was the SO-ARM101.
            A concrete arm on a bench gave people a reason to turn up on a Wednesday, and the club
            rebuilt itself around the work. That is the part nobody puts on a poster, and it is why
            everything we make is published: so the next revival starts further along than this one did.</p>
          </div>
          <ul className="tl">
            <li data-item data-line style={{ '--d': '240ms' }}><b>2018</b><span>Skills Canada. Two students carry Saskatchewan's entry.</span></li>
            <li data-item data-line style={{ '--d': '290ms' }}><b>2019</b><span>Sixth of thirty-two at the WorldSkills robotics final. The club starts when they land.</span></li>
            <li data-item data-line style={{ '--d': '340ms' }}><b>2020</b><span>Campus closes. Two years of nothing.</span></li>
            <li data-item data-line style={{ '--d': '390ms' }}><b>2022</b><span>Restarted by students who had never met the founders.</span></li>
            <li data-item data-line style={{ '--d': '440ms' }}><b>2025</b><span>That executive graduates. The room goes quiet again.</span></li>
            <li className="is-now" data-item data-line style={{ '--d': '490ms' }}><b>2026</b><span>Revived around the SO-ARM101 — and an arm that picks up a block on its own, most of the time.</span></li>
          </ul>
        </div>
      </section>
  );
}
