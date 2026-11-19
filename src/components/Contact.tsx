"use client";

import { useState } from "react";

import { LocalTime } from "@/components/LocalTime";
import { profile } from "@/data/content";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; the mailto link above still works.
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <p className="eyebrow mono">
          <span className="dot" /> Contact
        </p>
        <h2 className="contact__title" id="contact-title">
          Let&rsquo;s build something that <em>holds up.</em>
        </h2>

        <div className="contact__row">
          <a className="contact__mail" href={`mailto:${profile.email}`} data-cursor="Write">
            {profile.email}
          </a>
          <button type="button" className="btn btn--ghost" onClick={copy} data-cursor="Copy">
            {copied ? "Copied" : "Copy email"}
          </button>
          <a className="btn btn--solid" href="/Laynier-Piedra-CV.pdf" download data-cursor="Save">
            Download CV
          </a>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? "Email copied to clipboard" : ""}
          </span>
        </div>

        <ul className="contact__links">
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor="Open">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="Open">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer shell mono">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <LocalTime />
        <span>Next.js · Three.js · Motion. Built with agentic workflows.</span>
      </footer>
    </section>
  );
}
