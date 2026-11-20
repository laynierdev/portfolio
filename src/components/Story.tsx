"use client";

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { profile, story } from "@/data/content";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="story__word">
      {word}{" "}
    </motion.span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = story.statement.split(" ");

  return (
    <section className="story" id="about" aria-labelledby="about-title">
      <div className="story__pin" ref={ref}>
        <div className="story__sticky">
          <div className="shell">
            <p className="eyebrow mono" id="about-title">
              <span className="dot" /> About
            </p>
            <p className="story__statement" aria-label={story.statement}>
              <span aria-hidden="true">
                {words.map((word, index) => {
                  const start = 0.05 + (index / words.length) * 0.65;
                  return <Word key={`${word}-${index}`} word={word} range={[start, start + 0.08]} progress={scrollYProgress} />;
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="shell">
        <dl className="stats">
          {story.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <dt className="stat__label">{stat.label}</dt>
              <dd className="stat__value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="history">
          <figure className="portrait">
            <div className="portrait__glow" aria-hidden="true" />
            <Image
              className="portrait__img"
              src="/laynier.webp"
              alt="Portrait of Laynier Piedra, smiling, wearing glasses and a dark pullover"
              width={960}
              height={960}
              sizes="(min-width: 960px) 36vw, 80vw"
            />
            <figcaption className="portrait__cap mono">
              <span className="dot" /> {profile.name} · {profile.location}
            </figcaption>
          </figure>

          <ol className="chapters">
            {story.chapters.map((chapter, index) => (
              <motion.li
                className="chapter"
                key={chapter.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="chapter__year mono">{chapter.year}</span>
                <h3 className="chapter__title">{chapter.title}</h3>
                <p className="chapter__body">{chapter.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
