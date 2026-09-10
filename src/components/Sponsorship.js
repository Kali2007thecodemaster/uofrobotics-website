import React from 'react';

export default function Sponsorship() {
  return (
    <section className="sheet slide" id="sponsor" data-slide="Sponsorship" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter seven<b>What we are asking for</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">Sponsorship</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>Per academic year. Tax receipt on request.</p>
          <p className="sheet__lab sheet__lab--end" data-item style={{ '--d': '160ms' }}>uofrobotics@gmail.com</p>
        </div>

        <div className="ask">
          <p data-item style={{ '--d': '190ms' }}>A robotics club is a machine for turning money into people who can build things.
            Ours runs on about the cost of a used car per year, and every dollar is traceable to a part,
            a tool or a trip. Below is what each band pays for and what you get back — the same terms we
            have honoured for every sponsor since 2019.</p>
          <div data-item style={{ '--d': '220ms' }}>Sponsors are recognised for one academic year, from May to April.
            We will email you at every milestone, whether or not the milestone went well.</div>
        </div>

        <div className="tiers">
          <div className="tier" data-item style={{ '--d': '220ms' }}>
            <div className="tier__top">
              <p className="tier__range"><span data-count="100" data-prefix="$">$100</span>–499</p>
              <p className="tier__name">Bench</p>
            </div>
            <ul>
              <li>Small logo on our merchandise</li>
              <li>Recognition on our social pages</li>
              <li>~2″ sticker on a robot</li>
              </ul>
            <p className="tier__buys">Buys: filament and fasteners for a term, or half a follower arm.</p>
            <p className="tier__cta"><a href="mailto:uofrobotics@gmail.com?subject=Sponsorship%20%E2%80%94%20Bench">Sponsor a bench</a></p>
          </div>

          <div className="tier tier--pick" data-item style={{ '--d': '280ms' }}>
            <div className="tier__top">
              <p className="tier__range"><span data-count="500" data-prefix="$">$500</span>–999</p>
              <p className="tier__name">Bay</p>
            </div>
            <ul>
              <li>Everything in Bench</li>
              <li>Medium logo on merchandise</li>
              <li>~4″ sticker on a robot</li>
              <li>Named in any media interview</li>
            </ul>
            <p className="tier__buys">Buys: a complete leader-and-follower SO-ARM101 pair at $230, plus a wrist camera.</p>
            <p className="tier__cta"><a href="mailto:uofrobotics@gmail.com?subject=Sponsorship%20%E2%80%94%20Bay">Sponsor a bay</a></p>
          </div>

          <div className="tier" data-item style={{ '--d': '340ms' }}>
            <div className="tier__top">
              <p className="tier__range"><span data-count="1000" data-prefix="$">$1,000</span>–2,499</p>
              <p className="tier__name">Shop</p>
            </div>
            <ul>
              <li>Everything in Bay</li>
              <li>Large logo on merch and the robot</li>
              <li>Logo on the website and banners</li>
              <li>Progress emails at every milestone</li>
            </ul>
            <p className="tier__buys">Buys: the inference machine. A GPU desktop puts the control loop back to 30 Hz.</p>
            <p className="tier__cta"><a href="mailto:uofrobotics@gmail.com?subject=Sponsorship%20%E2%80%94%20Shop">Sponsor the shop</a></p>
          </div>

          <div className="tier" data-item style={{ '--d': '400ms' }}>
            <div className="tier__top">
              <p className="tier__range"><span data-count="2500" data-prefix="$">$2,500</span>+</p>
              <p className="tier__name">Shop floor</p>
            </div>
            <ul>
              <li>Everything in Shop</li>
              <li>~8″ mark on the robot, XL on merch</li>
              <li>Named in every speech and award</li>
              <li>We demo a robot at your office</li>
            </ul>
            <p className="tier__buys">Buys: a season — arms, compute, competition entry and travel for a team.</p>
            <p className="tier__cta"><a href="mailto:uofrobotics@gmail.com?subject=Sponsorship%20%E2%80%94%20Shop%20floor">Sponsor the floor</a></p>
          </div>
        </div>

        <div className="trust">
          <div data-item style={{ '--d': '440ms' }}>
            <h4>Who you pay</h4>
            <p>UofRobotics holds its own bank account. Signing authority is joint, President and VP Finance.</p>
          </div>
          <div data-item style={{ '--d': '470ms' }}>
            <h4>Standing</h4>
            <p>Ratified campus group of the University of Regina Students' Association, backed by RESS.</p>
          </div>
          <div data-item style={{ '--d': '500ms' }}>
            <h4>Track record</h4>
            <p>Previously supported by URSU, RESS and local companies. APEGS funding applied for in 2023.</p>
          </div>
          <div data-item style={{ '--d': '530ms' }}>
            <h4>Talk to a person</h4>
            <p>Fareed Usman, VP External — <a href="mailto:uofrobotics@gmail.com?subject=Sponsorship%20enquiry">uofrobotics@gmail.com</a></p>
          </div>
        </div>

        <div className="inkind">
          <div className="inkind__l">
            <h3 data-item data-grow="0.82">Or give us something<br />that isn't <em>money.</em></h3>
            <p data-item style={{ '--d': '560ms' }}>A retired GPU is worth more to us than its resale value. So is an afternoon of
              machine time, a box of servos, or an engineer willing to sit with four students and explain
              why their power budget is wrong. In-kind support is credited at the level it matches, and we
              will tell you exactly what it went into.</p>
            <a className="btn magnetic" href="mailto:uofrobotics@gmail.com?subject=In-kind%20support" data-item style={{ '--d': '620ms' }}>
              <i aria-hidden="true"></i> Offer something in kind
            </a>
          </div>
          <div className="inkind__r">
            <ul>
              <li data-item style={{ '--d': '580ms' }}>Filament, servos, bearings, sensors</li>
              <li data-item style={{ '--d': '610ms' }}>A GPU or a desktop you have retired</li>
              <li data-item style={{ '--d': '640ms' }}>Machine time, shop space, a spare bench</li>
              <li data-item style={{ '--d': '670ms' }}>An engineer for one evening</li>
            </ul>
          </div>
        </div>
      </section>
  );
}
