import React from 'react';

export default function Outreach() {
  return (
    <section className="sheet slide" id="outreach" data-slide="Outreach" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter eight<b>Working with us</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">Outreach</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>We come to you:</p>
          <p className="sheet__lab sheet__lab--end" data-item style={{ '--d': '160ms' }}>uofrobotics@gmail.com</p>
        </div>

        <div className="parts">
          <div className="part" data-item style={{ '--d': '220ms' }}>
            <h3>Schools and community groups</h3>
            <p>We bring a working robot, set it up, and let people drive it. We have run this for
              What is Engineering Day and for community groups in Regina, and we will run it for
              your classroom, your open house or your service club.</p>
            <span>What we need: a table, a wall socket, an hour.</span>
          </div>
          <div className="part" data-item style={{ '--d': '280ms' }}>
            <h3>Companies</h3>
            <p>Send an engineer to a build night, host a site visit, or set us a problem worth
              solving. Our members are the co-op students you will be interviewing in eighteen
              months, and you will have watched them work.</p>
            <span>What we need: your time, or a problem.</span>
          </div>
          <div className="part" data-item style={{ '--d': '340ms' }}>
            <h3>Faculty and other clubs</h3>
            <p>Joint builds, shared lab time, a course project that ends up on a real machine.
              Everything we produce is GPL v3, so collaborating with us costs nobody their
              intellectual property.</p>
            <span>What we need: a room, or a co-supervisor.</span>
          </div>
        </div>

        <div className="news">
          <div className="news__l">
            <h3 data-item style={{ '--d': '400ms' }}>The build log, monthly</h3>
            <p data-item style={{ '--d': '430ms' }}>One email a month: what got built, what broke, what the numbers did.
              No pitch, no calendar invitation. We are setting it up now.</p>
          </div>
          <div className="news__r">
            <div className="field" data-item style={{ '--d': '460ms' }}>
              <input type="email" placeholder="you@company.com" disabled aria-label="Email address, sign-up not open yet" />
              <button type="button" disabled>Coming soon</button>
            </div>
            <small data-item style={{ '--d': '490ms' }}>Not open yet — write to us and we will add you by hand.</small>
          </div>
        </div>
      </section>
  );
}
