"use client";

import { useEffect, useRef, useState } from "react";

type TypedLineProps = {
  strings: string[];
  className?: string;
  loop?: boolean;
  typeSpeed?: number;
  inView?: boolean;
};

export function TypedLine({ strings, className, loop = true, typeSpeed = 48, inView = false }: TypedLineProps) {
  const root = useRef<HTMLSpanElement>(null);
  const host = useRef<HTMLSpanElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(!inView);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!inView || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.35, rootMargin: "0px 0px -8% 0px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    if (reduceMotion || !visible) {
      element.textContent = strings[0];
      return;
    }

    element.textContent = "";
    let cancelled = false;
    let typed: { destroy: () => void } | undefined;

    import("typed.js").then(({ default: Typed }) => {
      if (cancelled || !element.isConnected) return;
      typed = new Typed(element, {
        strings,
        typeSpeed,
        backSpeed: 26,
        backDelay: 1600,
        startDelay: 200,
        smartBackspace: true,
        loop,
        showCursor: true,
        cursorChar: "|",
        onComplete(self) {
          if (!loop) self.cursor?.remove();
        },
      });
    }).catch(() => {
      element.textContent = strings[0];
    });

    return () => {
      cancelled = true;
      typed?.destroy();
    };
  }, [loop, reduceMotion, strings, typeSpeed, visible]);

  const longest = strings.reduce((current, next) => next.length > current.length ? next : current);
  const hideLive = loop && strings.length > 1;

  return (
    <span ref={root} className={className ? `typed-line ${className}` : "typed-line"}>
      {hideLive ? <span className="sr-only">{strings[0]}</span> : null}
      <span className="typed-sizer" aria-hidden="true">{longest}</span>
      <span className="typed-live" aria-hidden={hideLive || undefined}><span ref={host}>{strings[0]}</span></span>
    </span>
  );
}
