import React, { useState } from 'react';

const BUILDS = [
  {
    name: 'Field rover',
    focus: 'Mobility and teleoperation',
    text: `A wheeled outdoor platform with an aluminium frame, brushed drive motors and a
      camera mast. It is the club's rolling test bed: every new controller, radio link or
      navigation experiment gets bolted to it before it goes anywhere else.`,
    specs: [
      ['Team', 'Mechanical'],
      ['Status', 'Running'],
      ['Stack', 'ROS 2, custom PCB'],
      ['Open to', 'New members'],
    ],
  },
  {
    name: 'Sensor bench',
    focus: 'Electronics',
    text: `A permanent bench in the club room for characterising the parts we keep burning out:
      motor drivers, IMUs, depth cameras and battery packs. Members book an hour, run the
      test script, and the numbers go into a shared sheet the whole club reads.`,
    specs: [
      ['Team', 'Electronics'],
      ['Status', 'In progress'],
      ['Stack', 'STM32, Python'],
      ['Open to', 'New members'],
    ],
  },
  {
    name: 'First-year builds',
    focus: 'Learn the tools',
    text: `Small line-followers and grabbers built in pairs over about six weeks. The point is
      not the robot — it is soldering something that works, reading a datasheet without
      panic, and finding out which part of the club you actually want to join.`,
    specs: [
      ['Team', 'Everyone'],
      ['Status', 'Starts in September'],
      ['Stack', 'Arduino, hand tools'],
      ['Open to', 'Complete beginners'],
    ],
  },
];

const DELAYS = ['220ms', '340ms', '400ms'];

export default function Builds() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="sheet slide" id="builds" data-slide="Builds" data-reveal>
      <div className="builds__head">
        <p className="ch" data-item>Chapter four<b>Everything else on the bench</b></p>
        <h2 className="sheet__title" data-scramble data-grow="0.78">Other builds</h2>
        <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>Focus:</p>
        <p className="sheet__lab sheet__lab--end" data-item style={{ '--d': '160ms' }}>Detail:</p>
      </div>

      <ul>
        {BUILDS.map((b, i) => {
          const isOpen = open === i;
          return (
            <li
              key={b.name}
              className="build"
              data-open={isOpen ? 'true' : 'false'}
              data-item
              style={{ '--d': DELAYS[i] }}
            >
              <button
                className="build__row"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="build__name">
                  <i className="build__i">{String(i + 1).padStart(2, '0')}</i> {b.name}
                </span>
                <span className="build__focus">{b.focus}</span>
                <span className="build__more"><span>{isOpen ? 'Close' : 'Read more'}</span></span>
              </button>
              <div className="build__panel">
                <div>
                  <div className="build__inner">
                    <p className="build__text">{b.text}</p>
                    <ul className="build__specs">
                      {b.specs.map(([k, v]) => (
                        <li key={k}><span>{k}</span><span>{v}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
