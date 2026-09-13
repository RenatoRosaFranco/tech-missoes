"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";

export function LazyTechnologies() {
  const ref = useRef<HTMLDivElement>(null);
  const [View, setView] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("./technologies").then(mod => setView(() => mod.Technologies));
    }, { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (View) return <View />;
  return <div ref={ref}><section className="technologies section tech-pending" id="tecnologias" aria-label="Tecnologias e ferramentas" /></div>;
}
