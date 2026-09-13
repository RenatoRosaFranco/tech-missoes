"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/ui/brand";
import { Arrow } from "@/components/ui/social-icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { NavCta, NavLink } from "@/lib/app-config-types";

export function SiteHeader({ links, cta }: { links: NavLink[]; cta: NavCta }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const resolve = (href: string) => (href.startsWith("/") ? href : isHome ? href : `/${href}`);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="header container">
      <Brand href={resolve("#inicio")} label="Tech Missões, início" />
      <ThemeToggle />
      <button
        className="menu-toggle"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        {menuOpen ? "Fechar −" : "Menu +"}
      </button>
      <nav id="navigation" className={menuOpen ? "navigation open" : "navigation"} aria-label="Navegação principal">
        {links.map(link => (
          <a
            key={link.href}
            href={resolve(link.href)}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a className="nav-cta" href={cta.href} onClick={() => setMenuOpen(false)}>
          {cta.label} <Arrow />
        </a>
      </nav>
    </header>
  );
}
