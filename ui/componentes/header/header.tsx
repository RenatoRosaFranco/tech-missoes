"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Brand } from "@/ui/componentes/brand/brand";
import { Arrow } from "@/ui/componentes/social-icon/social-icon";
import { ThemeToggle } from "@/ui/componentes/theme-toggle/theme-toggle";
import { enabled, type FeatureName } from "@/ui/site/site";
import nav from "./header.json";
import "./header.css";

export type NavItem = {
  href: string;
  label: string;
  feature?: FeatureName;
  children?: NavItem[];
};

const links = enabled(nav.links as NavItem[]);
const cta = nav.cta;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const resolve = (href: string) => (href.startsWith("/") ? href : isHome ? href : `/${href}`);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setOpenGroup(null);
  }, [pathname, menuOpen]);

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
          <NavEntry
            key={link.href + link.label}
            link={link}
            open={openGroup === link.label}
            onOpen={() => setOpenGroup(link.label)}
            onClose={() => setOpenGroup(current => current === link.label ? null : current)}
            onToggle={() => setOpenGroup(current => current === link.label ? null : link.label)}
            resolve={resolve}
            isCurrent={isCurrent}
            onNavigate={() => {
              setMenuOpen(false);
              setOpenGroup(null);
            }}
          />
        ))}
        <a className="nav-cta" href={cta.href} onClick={() => setMenuOpen(false)}>
          {cta.label} <Arrow />
        </a>
      </nav>
    </header>
  );
}

function NavEntry({
  link,
  open,
  onOpen,
  onClose,
  onToggle,
  resolve,
  isCurrent,
  onNavigate,
}: {
  link: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  resolve: (href: string) => string;
  isCurrent: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const children = link.children ?? [];
  if (!children.length) {
    return (
      <a
        href={resolve(link.href)}
        aria-current={isCurrent(link.href) ? "page" : undefined}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }

  return (
    <NavGroup
      label={link.label}
      items={children}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      onToggle={onToggle}
      resolve={resolve}
      isCurrent={isCurrent}
      onNavigate={onNavigate}
    />
  );
}

function NavGroup({
  label,
  items,
  open,
  onOpen,
  onClose,
  onToggle,
  resolve,
  isCurrent,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  resolve: (href: string) => string;
  isCurrent: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const groupCurrent = items.some(item => isCurrent(item.href));
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      closeRef.current();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRef.current();
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={open ? "nav-group open" : "nav-group"}
      onPointerEnter={event => {
        if (event.pointerType === "mouse") onOpen();
      }}
      onPointerLeave={event => {
        if (event.pointerType === "mouse") onClose();
      }}
    >
      <button
        type="button"
        className="nav-group-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-current={groupCurrent ? "true" : undefined}
        onClick={() => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            onOpen();
            return;
          }
          onToggle();
        }}
      >
        {label} <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={menuId} className="nav-submenu" role="menu">
        {items.map(item => (
          <a
            key={item.href}
            role="menuitem"
            href={resolve(item.href)}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
