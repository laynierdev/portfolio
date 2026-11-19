import { HeroCanvas } from "@/components/HeroCanvas";
import { LocalTime } from "@/components/LocalTime";
import { profile } from "@/data/content";

/** Splits a word into letters that rise out of a mask, staggered by CSS only. */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="hero__line" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span className="hero__char" key={`${char}-${index}`} style={{ ["--i" as string]: index + offset }}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero__glow" aria-hidden="true" />

      <div className="shell hero__inner">
        <p className="hero__kicker mono rise" style={{ ["--d" as string]: 0 }}>
          <span className="dot" /> {profile.role} · working remotely from {profile.location.split(",")[0]}
        </p>

        <h1 className="hero__title" id="hero-title">
          <span className="sr-only">{profile.name}</span>
          <span className="hero__row">
            <Letters text={profile.first.toUpperCase()} />
          </span>
          <span className="hero__row hero__row--outline">
            <Letters text={profile.last.toUpperCase()} offset={profile.first.length} />
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__headline rise" style={{ ["--d" as string]: 6 }}>
            {profile.headline}
          </p>
          <div className="hero__cta rise" style={{ ["--d" as string]: 8 }}>
            <a className="btn btn--solid" href="#work" data-cursor="Go">
              See the work
            </a>
            <a className="btn btn--ghost" href="#contact" data-cursor="Talk">
              Get in touch
            </a>
            <a className="btn btn--ghost" href="/Laynier-Piedra-CV.pdf" download data-cursor="Save">
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="hero__meta shell mono rise" style={{ ["--d" as string]: 10 }}>
        <LocalTime />
        <span className="hero__scroll">
          Scroll <span className="hero__scroll-line" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
