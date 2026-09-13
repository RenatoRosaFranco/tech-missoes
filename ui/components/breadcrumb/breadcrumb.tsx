"use client";

import { useEffect, useRef, useState } from "react";
import { HomeIcon } from "@/ui/components/social-icon/social-icon";
import "@/ui/components/page-trail/page-trail.scss";

export type HomeSection = {
  id: string;
  label: string;
  feature?: "partners";
};

export function Breadcrumb({ sections }: { sections: HomeSection[] }) {
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
  }, [sections]);

  const active = sections.find(section => section.id === activeId) ?? sections[0];

  return (
    <nav ref={navRef} className="breadcrumb-bar" aria-label="Localização na página">
      <ol className="container breadcrumb-list">
        <li>
          <a href="#inicio" aria-current={activeId === "inicio" ? "location" : undefined}>
            <HomeIcon />Início
          </a>
        </li>
        {active && activeId !== "inicio" ? (
          <li className="breadcrumb-current">
            <span aria-hidden="true">/</span>
            <a href={`#${active.id}`} aria-current="location">{active.label}</a>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
