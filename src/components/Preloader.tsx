"use client";

import { useEffect, useRef } from "react";

import { bootLines } from "@/data/content";

/**
 * Boot sequence. The overlay leaves through a CSS animation, so it can never
 * get stuck if JavaScript fails; the component only animates the counter.
 * Hidden entirely for visitors who prefer reduced motion.
 */
export function Preloader() {
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 2100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (counter.current) counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__terminal">
        {bootLines.map((line, index) => (
          <p key={line} className="preloader__line" style={{ ["--i" as string]: index }}>
            <span className="preloader__prompt">{index === 0 ? ">" : "✓"}</span> {line}
          </p>
        ))}
      </div>
      <span className="preloader__count" ref={counter}>
        000
      </span>
    </div>
  );
}
