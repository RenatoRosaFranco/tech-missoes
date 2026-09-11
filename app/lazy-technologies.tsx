"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";

export function LazyTechnologies() {
  const ref = useRef<HTMLDivElement>(null);
  const [Technologies, setTechnologies] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("./technologies").then(mod => setTechnologies(() => mod.Technologies));
    }, { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (Technologies) return <Technologies />;
  return <div ref={ref}><section className="technologies section tech-pending" id="tecnologias" aria-label="Tecnologias e ferramentas" /></div>;
}
