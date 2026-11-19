"use client";

import { useEffect, useState } from "react";

import { profile } from "@/data/content";

/** Live clock for the visitor's "where is he now" detail. Renders nothing until mounted. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timeZone,
      }).format(new Date());
    const update = () => setTime(format());
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="mono">
      {profile.location.split(",")[0]} {time ?? "--:--"}
    </span>
  );
}
