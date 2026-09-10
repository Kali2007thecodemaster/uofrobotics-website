import React from 'react';

export default function SoArm101() {
  return (
    <section className="sheet slide" id="so101" data-slide="SO-ARM101" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter three<b>The arm that learns</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">SO-ARM101</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>Open source, GPL v3.</p>
          <p className="sheet__lab sheet__lab--end" data-item style={{ '--d': '160ms' }}>Task: orange block into green bin.</p>
        </div>

        <div className="study__body">
          <div className="study__left">
            <p data-item style={{ '--d': '200ms' }}>The SO-101 is a 3D-printable six-axis arm from The Robot Studio and Hugging Face,
              built for the open LeRobot stack. A leader-and-follower pair costs about <b>$230 in parts</b>.
              We printed ours in PLA+, wired it, and now drive the follower by hand through the leader to
              record demonstrations — then train a policy on those recordings and let the arm try alone.</p>
            <p data-item style={{ '--d': '230ms' }}>The task is deliberately small: pick up an orange block, drop it in a green bin.
              Nobody writes the motion. The arm has to learn it from what it was shown, and it either
              manages or it does not. This is also the project the club was rebuilt around in 2026 —
              eight students, one bench, something that either works in front of you or doesn't.</p>

            <div className="study__made" data-item style={{ '--d': '260ms' }}>
              <span>Follower and leader build</span><span>Ben, Juan, Minh, Thanh, Yazan, Emmanuel</span>
              <span>Wrist camera mounts v1–v3</span><span>Emmanuel, TJ, Saffat</span>
              <span>Vertical camera mount v1</span><span>Ben</span>
              <span>Base build</span><span>Juan, Ben</span>
              <span>Policy training</span><span>Juan, Ben</span>
            </div>

            <p className="study__repo" data-item style={{ '--d': '320ms' }}>Hardware and print files:
              <a href="https://github.com/uofrobotics/SO-ARM101" target="_blank" rel="noopener noreferrer">github.com/uofrobotics/SO-ARM101</a>
              — our fork of The Robot Studio's design, where our mounts go back upstream.</p>
          </div>

          <div className="study__right">
            <div className="run run--win" data-item style={{ '--d': '240ms' }}>
              <p className="run__pct"><span data-count="44.9" data-suffix="%">44.9%</span></p>
              <div className="run__meta">
                <b>ACT #1 — 13 March 2026</b>
                <span>22 successes, 27 failures, 49 trials</span>
                <span>Trained on an A100</span>
              </div>
            </div>
            <div className="run run--fail" data-item style={{ '--d': '300ms' }}>
              <p className="run__pct">0.0%</p>
              <div className="run__meta">
                <b>VLA #1 — 17 March 2026</b>
                <span>0 successes, 30 failures, 30 trials</span>
                <span>Trained on an H100</span>
              </div>
            </div>
            <p className="study__note" data-item style={{ '--d': '360ms' }}><span>The policy trains on an A100 and then runs on a
              <b>fourth-generation Core i5 desktop</b>. That machine is why the control loop dropped from
              30 Hz to 20 Hz, and slow control is part of why the arm still misses more than half its
              attempts. Compute is the cheapest thing anyone could buy us.</span></p>
          </div>
        </div>
      </section>
  );
}
