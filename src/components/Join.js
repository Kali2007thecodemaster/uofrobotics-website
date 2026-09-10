import React from 'react';
import { Link } from 'react-router-dom';

export default function Join() {
  return (
    <section className="join slide" id="join" data-slide="Join" data-reveal>
        <div className="join__left">
          <h2 className="join__title" data-item data-grow="0.8">Join the club.</h2>
          <p className="join__sub" data-item style={{ '--d': '160ms' }}>Bring nothing. We will find you a bench, a team and something that needs
            fixing before the night is over. Chapter one of yours starts on a Wednesday.</p>
          <a className="cta magnetic" href="https://discord.gg/wtTFD3qRTM" target="_blank" rel="noopener noreferrer" data-item style={{ '--d': '240ms' }}>
            <i aria-hidden="true" /> Join on Discord
          </a>
        </div>
        <div className="join__right">
          <div className="join__row" data-item style={{ '--d': '200ms' }}><span>When</span><span>Wednesdays, 6:00 pm</span></div>
          <div className="join__row" data-item style={{ '--d': '250ms' }}><span>Where</span><span>University of Regina — room posted on Discord</span></div>
          <div className="join__row" data-item style={{ '--d': '300ms' }}><span>Cost</span><span>Free for U of R students</span></div>
          <div className="join__row" data-item style={{ '--d': '350ms' }}><span>Sponsor</span><span><Link to="/support#sponsor">See the tiers</Link> — from $100, tax receipt on request</span></div>
        </div>
      </section>
  );
}
