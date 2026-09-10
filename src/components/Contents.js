import React from 'react';
import { Link } from 'react-router-dom';

export default function Contents() {
  return (
    <section className="slide" id="contents" data-slide="Contents" data-reveal>
        <div className="toc">
          <Link to="/club">
            <em data-item>Chapters one to three</em>
            <h3 data-item style={{ '--d': '60ms' }}>The club</h3>
            <p data-item style={{ '--d': '120ms' }}>How a Skills Canada entry turned into a room with four benches, twice
              rebuilt from nothing. Who runs it, and what a Wednesday looks like.</p>
            <span data-item style={{ '--d': '180ms' }}>Read the story</span>
          </Link>
          <Link to="/work">
            <em data-item style={{ '--d': '60ms' }}>Chapters four and five</em>
            <h3 data-item style={{ '--d': '120ms' }}>The work</h3>
            <p data-item style={{ '--d': '180ms' }}>The SO-ARM101 and the numbers it actually posts, plus everything else
              currently clamped to a bench.</p>
            <span data-item style={{ '--d': '240ms' }}>See the builds</span>
          </Link>
          <Link to="/support">
            <em data-item style={{ '--d': '120ms' }}>Chapters six to eight</em>
            <h3 data-item style={{ '--d': '180ms' }}>Support us</h3>
            <p data-item style={{ '--d': '240ms' }}>What sponsorship buys, from $100. What we can give you that isn't a logo.
              And what we will come and do for your people.</p>
            <span data-item style={{ '--d': '300ms' }}>See the tiers</span>
          </Link>
        </div>
      </section>
  );
}
