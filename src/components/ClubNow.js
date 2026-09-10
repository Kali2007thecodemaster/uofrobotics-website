import React from 'react';

export default function ClubNow() {
  return (
    <section className="sheet slide" id="about" data-slide="The club now" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter two<b>What the club is now</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">Four teams</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>You get:</p>
          <p className="sheet__lab" data-item style={{ '--d': '160ms' }}>Practical:</p>
        </div>
        <div className="sheet__body">
          <p className="sheet__lede" data-item style={{ '--d': '200ms' }}>
            <span className="paren">(The club now)</span>
            Electronics, software, mechanical and external run in parallel, and most members end up
            touching more than one. Membership is open to any University of Regina student — no
            application, no fee, no experience. Everything the club produces is published under
            GPL v3, which is a deliberate choice: the work has to outlive whoever made it, because
            every four years the entire club turns over.
          </p>
          <ul className="rows" data-label="You get:">
            <li data-item data-line style={{ '--d': '240ms' }}>Shop access, tools and the 3D printers</li>
            <li data-item data-line style={{ '--d': '300ms' }}>A team, and a competition to take it to</li>
            <li data-item data-line style={{ '--d': '360ms' }}>Work published under GPL v3 with your name on it</li>
            <li data-item data-line style={{ '--d': '420ms' }}>Something real to show an employer</li>
          </ul>
          <ul className="rows" data-label="Practical:">
            <li data-item data-line style={{ '--d': '270ms' }}>Build nights, Wednesdays 6pm</li>
            <li data-item data-line style={{ '--d': '330ms' }}>Open to every faculty</li>
            <li data-item data-line style={{ '--d': '390ms' }}>No experience, no fee, no application</li>
            <li data-item data-line style={{ '--d': '450ms' }}>Free for U of R students</li>
          </ul>
        </div>
      </section>
  );
}
