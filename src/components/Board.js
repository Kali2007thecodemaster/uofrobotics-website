import React from 'react';

export default function Board() {
  return (
    <section className="sheet slide" id="board" data-slide="Board" data-reveal>
        <div className="sheet__head">
          <p className="ch" data-item>Chapter five<b>Who is accountable</b></p>
          <h2 className="sheet__title" data-scramble data-grow="0.78">Board</h2>
          <p className="sheet__lab" data-item style={{ '--d': '120ms' }}>Role — term May 2026 to April 2027:</p>
          <p className="sheet__lab" data-item style={{ '--d': '160ms' }}>Looks after:</p>
        </div>
        <div className="board__row" data-item style={{ '--d': '220ms' }}>
          <p className="board__name">Benjamin Shupe</p>
          <p className="board__role">President</p>
          <p className="board__area">The club, the room, the calendar</p>
        </div>
        <div className="board__row" data-item style={{ '--d': '270ms' }}>
          <p className="board__name">Tyler Appel</p>
          <p className="board__role">VP Finance</p>
          <p className="board__area">Budget, parts orders, funding</p>
        </div>
        <div className="board__row" data-item style={{ '--d': '320ms' }}>
          <p className="board__name">Juan Minkoa</p>
          <p className="board__role">VP Software Integration</p>
          <p className="board__area">Code, control, this website</p>
        </div>
        <div className="board__row" data-item style={{ '--d': '370ms' }}>
          <p className="board__name">Fareed Usman</p>
          <p className="board__role">VP External</p>
          <p className="board__area">Sponsors, faculty, competitions</p>
        </div>
        <div className="board__row" data-item style={{ '--d': '420ms' }}>
          <p className="board__name">Tijesunimi Afolabi</p>
          <p className="board__role">VP Hardware</p>
          <p className="board__area">Shop, machining, electronics</p>
        </div>
      </section>
  );
}
