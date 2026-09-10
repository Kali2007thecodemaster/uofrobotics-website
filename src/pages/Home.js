import React, { useState } from 'react';
import Boot from '../components/Boot';
import Hero from '../components/Hero';
import Contents from '../components/Contents';
import Proof from '../components/Proof';
import Join from '../components/Join';

export default function Home() {
  // the intro runs on the cover only; internal navigation should not replay it
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      <Hero ready={booted} />
      <Contents />
      <Proof />
      <Join />
    </>
  );
}
