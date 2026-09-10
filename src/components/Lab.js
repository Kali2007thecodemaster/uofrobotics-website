import React from 'react';
import { asset } from '../lib/asset';

export default function Lab() {
  return (
    <section className="lab slide" id="lab" data-slide="The lab" data-reveal>
        <figure className="cell cell--photo s7" data-item data-parallax="18">
          <img loading="lazy" decoding="async" src={asset('lab-bench.jpg')} alt="Members working around benches during a build night" />
          <figcaption className="cell__cap">Build night</figcaption>
        </figure>
        <figure className="cell cell--photo s5" data-item style={{ '--d': '80ms' }} data-parallax="-14">
          <img loading="lazy" decoding="async" src={asset('lab-demo-day.jpg')} alt="An audience seated for a club presentation" />
          <figcaption className="cell__cap">Demo day</figcaption>
        </figure>
        <figure className="cell cell--photo s4" data-item style={{ '--d': '160ms' }} data-parallax="12">
          <img loading="lazy" decoding="async" src={asset('lab-debug.jpg')} alt="Two members debugging code side by side on laptops" />
          <figcaption className="cell__cap">Debugging</figcaption>
        </figure>
        <figure className="cell cell--photo s4" data-item style={{ '--d': '220ms' }} data-parallax="-18">
          <img loading="lazy" decoding="async" src={asset('lab-arm.jpg')} alt="A partly assembled robot arm on a stand" />
          <figcaption className="cell__cap">Mid-assembly</figcaption>
        </figure>
        <figure className="cell cell--photo s4" data-item style={{ '--d': '280ms' }} data-parallax="14">
          <img loading="lazy" decoding="async" src={asset('lab-crowd.jpg')} alt="A room full of people watching a robotics demonstration" />
          <figcaption className="cell__cap">Full room</figcaption>
        </figure>
        <figure className="cell cell--photo s5" data-item style={{ '--d': '340ms' }} data-parallax="-12">
          <img loading="lazy" decoding="async" src={asset('lab-wiring.jpg')} alt="Two members wiring a chassis on a workbench" />
          <figcaption className="cell__cap">Wiring</figcaption>
        </figure>
        <figure className="cell cell--photo s3" data-item style={{ '--d': '400ms' }} data-parallax="16">
          <img loading="lazy" decoding="async" src={asset('lab-track.jpg')} alt="A small robot on a test track" />
          <figcaption className="cell__cap">Test track</figcaption>
        </figure>
        <div className="cell cell--note s4" data-item style={{ '--d': '460ms' }}>
          <h3 data-grow="0.82">The lab</h3>
          <p>One room, four benches, a printer that mostly works, and whatever the last team left
            clamped to the vice. Doors open at six on Wednesdays — come look at what is on the
            bench, and stay if you like it.</p>
        </div>
      </section>
  );
}
