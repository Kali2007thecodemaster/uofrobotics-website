import React from 'react';
import { Link } from 'react-router-dom';

export default function Drawer({ open, onNavigate }) {
  return (
    <div className="drawer" id="drawer" data-open={open ? 'true' : 'false'}>
      <nav aria-label="Mobile">
        <Link to="/" onClick={onNavigate}>Home</Link><br />
        <Link to="/club" onClick={onNavigate}>The club</Link><br />
        <Link to="/work" onClick={onNavigate}>The work</Link><br />
        <Link to="/support" onClick={onNavigate}>Support us</Link>
      </nav>
      <p className="meta">Build nights, Wednesdays 6pm<br />uofrobotics@gmail.com</p>
    </div>
  );
}
