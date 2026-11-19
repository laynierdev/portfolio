import { capabilities, experience, research } from "@/data/content";

export function Experience() {
  return (
    <section className="experience" id="experience" aria-labelledby="exp-title">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow mono">
            <span className="dot" /> Experience
          </p>
          <h2 className="section-title" id="exp-title">
            Production work behind the prototypes.
          </h2>
        </header>

        <ol className="roles">
          {experience.map((job) => (
            <li className="role" key={job.company}>
              <span className="role__years mono">{job.years}</span>
              <div className="role__main">
                <h3 className="role__company">{job.company}</h3>
                <p className="role__title">{job.role}</p>
              </div>
              <div className="role__detail">
                <p>{job.note}</p>
                <ul className="role__stack mono" aria-label="Stack">
                  {job.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="caps">
          {capabilities.map((group) => (
            <div className="cap" key={group.title}>
              <h3 className="cap__title mono">{group.title}</h3>
              <ul className="cap__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="research">
          <h3 className="research__title mono">Before agents were a product</h3>
          <ul className="research__list">
            {research.map((paper) => (
              <li key={paper.year}>
                <span className="mono">{paper.year}</span>
                <span>
                  {paper.title}. <em>{paper.venue}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
