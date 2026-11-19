import { marquee } from "@/data/content";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <i className="marquee__sep" />
          </span>
        ))}
      </div>
    </div>
  );
}
