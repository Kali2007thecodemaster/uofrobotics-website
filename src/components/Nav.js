import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Nav({ menuOpen, onToggleMenu }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="nav">
      <Link className="brand" to="/" aria-label="UofRobotics, home">
        <span className="brand__mark" aria-hidden="true"><i /></span>
        <span>UofRobotics<sup>®</sup></span>
      </Link>

      <nav className="nav__links" aria-label="Primary">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/club">The club</NavLink>
        <NavLink to="/work">The work</NavLink>
        <NavLink to="/support">Support us</NavLink>
      </nav>

      <div className="nav__end">
        <button
          className="themer"
          id="themer"
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <i aria-hidden="true" />
        </button>
        <Link className="nav__pill" to="/support#sponsor">Sponsor us</Link>
        <button
          className="burger"
          id="burger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={onToggleMenu}
        >
          <span />
        </button>
      </div>
    </header>
  );
}
