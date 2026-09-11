"use client";

import { useEffect, useRef } from "react";

export function TechDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false };
    let reduce = media.matches;
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const theme = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        ink: styles.getPropertyValue("--foreground").trim() || "#252623",
        red: styles.getPropertyValue("--red").trim() || "#9b2635",
      };
    };

    const draw = () => {
      const { ink, red } = theme();
      ctx.clearRect(0, 0, width, height);
      const gap = width < 520 ? 17 : 20;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const originX = (width - (cols - 1) * gap) / 2;
      const originY = (height - (rows - 1) * gap) / 2;
      const radius = 118;
      const depth = 26;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const pointX = originX + col * gap;
          const pointY = originY + row * gap;
          const deltaX = pointX - pointer.x;
          const deltaY = pointY - pointer.y;
          const distance = Math.hypot(deltaX, deltaY) || 0.0001;
          let x = pointX;
          let y = pointY;
          let influence = 0;

          if (!reduce && pointer.active) {
            const falloff = Math.max(0, 1 - distance / radius);
            influence = falloff * falloff;
            x += (deltaX / distance) * influence * depth;
            y += (deltaY / distance) * influence * depth;
          }

          ctx.globalAlpha = influence > 0.05 ? 0.42 + influence * 0.45 : 0.15;
          ctx.fillStyle = influence > 0.12 ? red : ink;
          ctx.beginPath();
          ctx.arc(x, y, 1.05 + influence * 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce && pointer.active) {
        ctx.strokeStyle = red;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([2, 5]);
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 44, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.72;
        ctx.beginPath();
        ctx.moveTo(pointer.x - 7, pointer.y);
        ctx.lineTo(pointer.x + 7, pointer.y);
        ctx.moveTo(pointer.x, pointer.y - 7);
        ctx.lineTo(pointer.x, pointer.y + 7);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      canvas.dataset.ready = "true";
    };

    const tick = () => {
      draw();
      if (pointer.active && !reduce) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (reduce) draw();
      else start();
    };

    const onLeave = () => {
      pointer.active = false;
      draw();
    };

    const onMedia = () => {
      reduce = media.matches;
      cancelAnimationFrame(frame);
      running = false;
      if (!reduce && pointer.active) start();
      else draw();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    media.addEventListener("change", onMedia);
    const themeObserver = new MutationObserver(() => draw());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      media.removeEventListener("change", onMedia);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="tech-dot-field" aria-hidden="true" />;
}
