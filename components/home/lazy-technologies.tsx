"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import type { TechnologiesProps } from "./technologies";

export function LazyTechnologies(props: TechnologiesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [View, setView] = useState<ComponentType<TechnologiesProps> | null>(null);

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

  if (View) return <View {...props} />;
  return <div ref={ref}><section className="technologies section tech-pending" id="tecnologias" aria-label="Tecnologias e ferramentas" /></div>;
}
