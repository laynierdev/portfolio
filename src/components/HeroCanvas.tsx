"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useCompactScreen, usePrefersReducedMotion } from "@/lib/hooks";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Loads the WebGL scene after the first paint, so the headline never waits for it. */
export function HeroCanvas() {
  const compact = useCompactScreen();
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(() => setReady(true)) : window.setTimeout(() => setReady(true), 400);
    return () => {
      if (!idle) window.clearTimeout(id);
    };
  }, []);

  if (!ready) return <div className="hero__canvas hero__canvas--fallback" aria-hidden="true" />;
  return <HeroScene compact={compact} animate={!reduced} />;
}
