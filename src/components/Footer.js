import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="foot">
        <div className="foot__col">
          <h4>Contact</h4>
          <a className="foot__mail" href="mailto:uofrobotics@gmail.com">uofrobotics@gmail.com</a>
          <p className="meta dim">University of Regina<br />Regina, Saskatchewan</p>
        </div>
        <div className="foot__col">
          <h4>Follow</h4>
          <a href="https://discord.gg/wtTFD3qRTM" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="https://www.instagram.com/uof_robotics/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/UofRobotics" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <div className="foot__col">
          <h4>Pages</h4>
          <Link to="/work#builds">Builds</Link>
          <Link to="/club#board">Board</Link>
          <Link to="/support#sponsor">Contribution and sponsorship</Link>
          <Link to="/support#outreach">Outreach and partnerships</Link>
        </div>
        <div className="foot__col">
          <h4>Colophon</h4>
          <p className="meta dim">Set in Anybody and Archivo.<br />Built by the software team.</p>
          <p className="meta dim">U—of—R</p>
        </div>
      </footer>
  );
}
