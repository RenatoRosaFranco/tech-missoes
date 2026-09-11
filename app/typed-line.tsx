"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

type TypedLineProps = {
  strings: string[];
  className?: string;
  loop?: boolean;
  typeSpeed?: number;
};

export function TypedLine({ strings, className, loop = true, typeSpeed = 52 }: TypedLineProps) {
  const host = useRef<HTMLSpanElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || !host.current) return;
    const typed = new Typed(host.current, {
      strings,
      typeSpeed,
      backSpeed: 28,
      backDelay: 1700,
      startDelay: 350,
      smartBackspace: true,
      loop,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, [loop, reduceMotion, strings, typeSpeed]);

  return <span className={className}><span ref={host}>{strings[0]}</span></span>;
}
