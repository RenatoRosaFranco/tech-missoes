"use client";

import { useLayoutEffect } from "react";

export function ThemeBoot() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    let theme: string | null = null;
    try {
      theme = localStorage.getItem("tech-missoes-theme");
    } catch {
      theme = null;
    }
    root.dataset.theme = theme === "dark" || theme === "light"
      ? theme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  return null;
}
