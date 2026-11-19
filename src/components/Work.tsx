"use client";

import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { projects, type Project } from "@/data/content";
import { usePrefersReducedMotion, useWideScreen } from "@/lib/hooks";

function Frame({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const { image, video } = project;
  return (
    <div className="frame">
      <div className="frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="mono">{project.slug}</span>
      </div>
      <div className="frame__screen">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 960px) 52vw, 92vw"
          className="frame__img"
        />
        {video && !reduced ? (
          <video className="frame__video" src={video} poster={image.src} autoPlay muted loop playsInline preload="none" aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
}

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const wide = useWideScreen();
  const isLast = index === total - 1;
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.93]);
  // Brightness, not opacity: stacked cards must stay opaque so the one below never shows through.
  const brightness = useTransform(progress, [start, end], [1, isLast ? 1 : 0.55]);
  const filter = useMotionTemplate`brightness(${brightness})`;
  const stacking = wide ? { top: `calc(var(--nav-h) + ${index * 18}px)`, scale, filter } : {};

  return (
    <motion.article className="card" style={{ ["--accent-card" as string]: project.accent, ...stacking }}>
      <div className="card__copy">
        <p className="card__index mono">
          {project.index} <span>/ {String(total).padStart(2, "0")}</span>
        </p>
        <p className="card__tag mono">{project.tag}</p>
        <h3 className="card__name">{project.name}</h3>
        <p className="card__tagline">{project.tagline}</p>
        <p className="card__desc">{project.description}</p>
        <ul className="card__points">
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <ul className="card__stack mono" aria-label="Stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="card__links">
          {project.links.map((link, linkIndex) => (
            <a
              key={link.href}
              className={linkIndex === 0 ? "btn btn--solid" : "btn btn--ghost"}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
            >
              {link.label}
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      <a className="card__visual" href={project.links[0].href} target="_blank" rel="noopener noreferrer" data-cursor="Open" tabIndex={-1} aria-hidden="true">
        <Frame project={project} />
      </a>
    </motion.article>
  );
}

export function Work() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start start", "end end"] });

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow mono">
            <span className="dot" /> Selected work
          </p>
          <h2 className="section-title" id="work-title">
            Four products, built with agents and checked by tests.
          </h2>
        </header>
        <div className="cards" ref={list}>
          {projects.map((project, index) => (
            <Card key={project.slug} project={project} index={index} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
