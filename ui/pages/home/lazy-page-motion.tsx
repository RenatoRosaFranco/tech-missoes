"use client";

import { type ComponentType, useEffect, useState } from "react";

export function LazyPageMotion() {
  const [Motion, setMotion] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      void import("./page-motion").then(mod => setMotion(() => mod.PageMotion));
    };
    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(load, { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(idleId);
      };
    }
    const timeoutId = window.setTimeout(load, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return Motion ? <Motion /> : null;
}
