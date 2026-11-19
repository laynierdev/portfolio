import { profile } from "@/data/content";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
] as const;

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top" aria-label={`${profile.name}, back to top`}>
        <span className="nav__mark" aria-hidden="true">
          LP
        </span>
        <span className="nav__name">{profile.name}</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="nav__link">
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav__cta" data-cursor="Talk">
          Contact
        </a>
      </nav>
    </header>
  );
}
