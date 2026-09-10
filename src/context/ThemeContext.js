import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'uor-theme';
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

function read() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function ThemeProvider({ children }) {
  // public/index.html already resolved a theme before first paint; adopt it so the
  // two never disagree, and so navigating between routes never flashes.
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light'
  );

  const apply = useCallback((mode) => {
    document.documentElement.dataset.theme = mode;
    const meta = document.querySelector('meta[name=theme-color]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#0b0b0b' : '#ffffff');
    setTheme(mode);
  }, []);

  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* storage blocked: the toggle still works for this page, it just will not persist */
    }
  }, [apply]);

  useEffect(() => {
    apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, [apply]);

  // another tab changed it
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) apply(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [apply]);

  // follow the operating system, but only until the visitor chooses for themselves
  useEffect(() => {
    if (read() || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => apply(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
