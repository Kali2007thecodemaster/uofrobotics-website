import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Rails from './components/Rails';
import Progress from './components/Progress';
import Nav from './components/Nav';
import Drawer from './components/Drawer';
import SlideIndex from './components/SlideIndex';
import Footer from './components/Footer';

import Home from './pages/Home';
import Club from './pages/Club';
import Work from './pages/Work';
import Support from './pages/Support';

import { ThemeProvider } from './context/ThemeContext';
import useDeck from './hooks/useDeck';
import useReveal from './hooks/useReveal';
import useMagnetic from './hooks/useMagnetic';
import useScrollToHash from './hooks/useScrollToHash';

import './styles/styles.css';

/**
 * Everything that has to run *after* a route's sections are in the DOM lives here.
 * Child effects fire before parent effects in React, so by the time these run the
 * page has mounted and the hooks can read `.slide`, `[data-reveal]` and friends.
 */
function Shell() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { slides, current, goTo } = useDeck(pathname);
  useReveal(pathname);
  useMagnetic(pathname);
  useScrollToHash();

  // the drawer locks the page behind it
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Rails />
      <Progress />
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <Drawer open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <SlideIndex slides={slides} current={current} onGo={goTo} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/work" element={<Work />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Shell />
      </Router>
    </ThemeProvider>
  );
}
