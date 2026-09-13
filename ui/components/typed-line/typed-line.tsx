"use client";

import { useEffect, useRef, useState } from "react";
import "./typed-line.scss";

type TypedLineProps = {
  strings: string[];
  className?: string;
  loop?: boolean;
  typeSpeed?: number;
  inView?: boolean;
};

export function TypedLine({ strings, className, loop = true, typeSpeed = 48, inView = false }: TypedLineProps) {
  const root = useRef<HTMLSpanElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(!inView);
  const [text, setText] = useState(strings[0] ?? "");
  const [cursor, setCursor] = useState(false);

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
    if (reduceMotion || !visible) {
      setText(strings[0] ?? "");
      setCursor(false);
      return;
    }

    let cancelled = false;
    let timeout = 0;
    let stringIndex = 0;
    let charIndex = 0;
    let deleting = false;
    setText("");
    setCursor(true);

    const wait = (ms: number) => new Promise<void>(resolve => {
      timeout = window.setTimeout(resolve, ms);
    });

    async function run() {
      await wait(200);
      while (!cancelled) {
        const current = strings[stringIndex] ?? "";
        if (!deleting) {
          charIndex += 1;
          setText(current.slice(0, charIndex));
          if (charIndex >= current.length) {
            if (!loop) {
              setCursor(false);
              return;
            }
            await wait(1600);
            if (cancelled) return;
            deleting = true;
            continue;
          }
          await wait(typeSpeed);
        } else {
          charIndex -= 1;
          setText(current.slice(0, Math.max(charIndex, 0)));
          if (charIndex <= 0) {
            deleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            charIndex = 0;
          }
          await wait(26);
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [loop, reduceMotion, strings, typeSpeed, visible]);

  const longest = strings.reduce((current, next) => next.length > current.length ? next : current);
  const hideLive = loop && strings.length > 1;

  return (
    <span ref={root} className={className ? `typed-line ${className}` : "typed-line"}>
      {hideLive ? <span className="sr-only">{strings[0]}</span> : null}
      <span className="typed-sizer" aria-hidden="true">{longest}</span>
      <span className="typed-live" aria-hidden={hideLive || undefined}>
        {text}
        {cursor ? <span className="typed-cursor typed-cursor--blink" aria-hidden="true">|</span> : null}
      </span>
    </span>
  );
}
