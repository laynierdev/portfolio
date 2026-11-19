"use client";

import { useEffect, useRef, useState } from "react";

import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Follower ring for mouse users. The native cursor stays visible, so nothing is
 * hidden from anyone. Elements opt in with data-cursor="Label".
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine || reduced) return;
    const node = ring.current;
    if (!node) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      node.dataset.ready = "true";
    };
    const onOver = (event: PointerEvent) => {
      const host = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(host?.dataset.cursor ?? "");
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div ref={ring} className="cursor" data-active={label ? "true" : "false"} aria-hidden="true">
      <span className="cursor__ring">
        <span className="cursor__label">{label}</span>
      </span>
    </div>
  );
}
