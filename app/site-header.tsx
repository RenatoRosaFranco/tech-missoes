"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

function Mark() {
  return <svg viewBox="0 0 46 42" fill="currentColor" aria-hidden="true"><path d="M0 0h27v8h-9v34H9V8H0zM23 13h8v29h-8zM35 0h9v42h-9z" /></svg>;
}

const links = [
  { href: "#comunidade", label: "A comunidade" },
  { href: "#areas", label: "Áreas de estudo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#starter-kit", label: "Nosso kit" },
];

export function SiteHeader({ variant = "home" }: { variant?: "home" | "page" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const resolve = (hash: string) => variant === "home" ? hash : `/${hash}`;

  return (
    <header className="header container">
      <a className="brand" href={resolve("#inicio")} aria-label="Tech Missões, início"><Mark /><span>tech<span>missões<span className="brand-period">.</span></span></span></a>
      <ThemeToggle />
      <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Fechar −" : "Menu +"}</button>
      <nav id="navigation" className={menuOpen ? "navigation open" : "navigation"} aria-label="Navegação principal">
        {links.map(link => <a key={link.href} href={resolve(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        <a className="nav-cta" href="/entrar" aria-current={variant === "page" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Entrar <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
