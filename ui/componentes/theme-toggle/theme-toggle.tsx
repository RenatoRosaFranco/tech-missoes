"use client";

import { useEffect, useState } from "react";
import "./theme-toggle.css";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("tech-missoes-theme", theme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }

  if (!mounted) {
    return <span className="theme-toggle" aria-hidden="true" />;
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema claro e escuro">
      <svg className="theme-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" /></svg>
      <svg className="theme-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></svg>
    </button>
  );
}
