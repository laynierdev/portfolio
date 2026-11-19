import { useSyncExternalStore } from "react";

function useMedia(query: string, serverValue: boolean): boolean {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True when the visitor asked the system to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)", false);
}

/** True on devices with a precise hover pointer (mouse, trackpad). */
export function useFinePointer(): boolean {
  return useMedia("(hover: hover) and (pointer: fine)", false);
}

/** True from the width where the work cards stack and scale on scroll. */
export function useWideScreen(): boolean {
  return useMedia("(min-width: 960px) and (min-height: 700px)", true);
}

/** True on narrow screens. Used to lighten the WebGL scene. */
export function useCompactScreen(): boolean {
  return useMedia("(max-width: 767px)", false);
}
