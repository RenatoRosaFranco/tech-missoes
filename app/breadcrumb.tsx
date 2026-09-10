"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "inicio", label: "Início" },
  { id: "areas", label: "Áreas de estudo" },
  { id: "tecnologias", label: "Tecnologias e ferramentas" },
  { id: "comunidade", label: "A comunidade" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "participe", label: "Trilhas de estudo" },
  { id: "faca-parte", label: "Faça parte da comunidade" },
  { id: "starter-kit", label: "Kit da comunidade" },
];

export function Breadcrumb() {
  const [activeId, setActiveId] = useState("inicio");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const targets = sections.map(section => ({ ...section, element: document.getElementById(section.id) }));
    const header = navRef.current?.closest(".site-header");
    function update() {
      frame = 0;
      const threshold = (header?.getBoundingClientRect().bottom ?? 129) + 25;
      let current = "inicio";
      for (const target of targets) {
        if (target.element && target.element.getBoundingClientRect().top <= threshold) current = target.id;
      }
      setActiveId(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  const active = sections.find(section => section.id === activeId)!;
  return <nav ref={navRef} className="breadcrumb-bar" aria-label="Localização na página"><ol className="container breadcrumb-list"><li><a href="#inicio" aria-current={activeId === "inicio" ? "location" : undefined}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></svg>Início</a></li>{activeId !== "inicio" && <li className="breadcrumb-current"><span aria-hidden="true">/</span><a href={`#${active.id}`} aria-current="location">{active.label}</a></li>}</ol></nav>;
}
