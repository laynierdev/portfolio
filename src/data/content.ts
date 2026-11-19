// All visible copy lives here. Facts come from the CV and from the project READMEs.

export const profile = {
  name: "Laynier Piedra",
  first: "Laynier",
  last: "Piedra",
  role: "Full-stack developer",
  location: "Havana, Cuba",
  timeZone: "America/Havana",
  email: "laynierpd@gmail.com",
  github: "https://github.com/laynierdev",
  linkedin: "https://linkedin.com/in/laynier-piedra-dieguez-b33209aa",
  headline: "I build AI-assisted products where the model explains and the code decides.",
  intro:
    "Full-stack developer with 10+ years shipping scheduling, payments and enterprise platforms. Since 2024 I design agentic workflows and AI features that stay grounded: every claim checked against source, every demo tested.",
} as const;

export const bootLines = [
  "init portfolio --agent laynier",
  "loading 4 case studies",
  "verifying claims against source",
  "ready",
] as const;

export const marquee = [
  "TypeScript",
  "Next.js",
  "Agentic workflows",
  "C# / .NET",
  "MCP",
  "Stripe",
  "Three.js",
  "WCAG 2.2 AA",
  "Semantic Kernel",
  "Playwright",
] as const;

export const story = {
  statement:
    "Fluent answers are cheap. I build the part that makes them trustworthy: deterministic analysis first, AI second, and every claim verified against the real data before it reaches a person.",
  stats: [
    { value: 10, suffix: "+", label: "years shipping production web platforms" },
    { value: 4, suffix: "", label: "case studies, each with a live demo" },
    { value: 82, suffix: "", label: "automated tests behind MobileRoad" },
    { value: 2, suffix: "", label: "papers on semantic text analysis, 2018 and 2019" },
  ],
  chapters: [
    {
      year: "2015",
      title: "Foundations",
      body: "Project-management suites on Rails, a virtual-learning platform and a C++ SCADA system that talks to field equipment.",
    },
    {
      year: "2020",
      title: "Payments & data",
      body: "Payment gateways, Pentaho reporting and integration APIs for an international client, from a remote team.",
    },
    {
      year: "2024",
      title: "SaaS & commerce",
      body: "Scheduling, Stripe billing and Auth0 at NTSprint, plus an AI conversational checkout built on Semantic Kernel.",
    },
    {
      year: "Now",
      title: "Agentic products",
      body: "Prototypes where agents do the work and verification decides what ships: four live demos, tests included.",
    },
  ],
} as const;

export type Project = {
  index: string;
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  highlights: readonly string[];
  stack: readonly string[];
  accent: string;
  image: { src: string; width: number; height: number; alt: string };
  video?: string;
  links: readonly { label: string; href: string }[];
};

export const projects: readonly Project[] = [
  {
    index: "01",
    slug: "codebasexplorer",
    name: "CodebaseXplorer",
    tag: "Developer tool",
    tagline: "Understand any codebase. Navigate with confidence.",
    description:
      "Parses a repository without ever running it and builds a model of files, symbols, imports, endpoints and call chains. The AI assistant only sees the few excerpts that matter, and every file and line it cites is checked against the real code.",
    highlights: ["Citations verified against the repo", "WCAG 2.2 AA audited", "CI and strict TypeScript"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Gemini"],
    accent: "#8b7bff",
    image: { src: "/work/codebasexplorer.webp", width: 1600, height: 1000, alt: "CodebaseXplorer workspace with a file tree, highlighted source and an AI answer citing exact lines" },
    links: [
      { label: "Live demo", href: "https://codebasexplorer.vercel.app" },
      { label: "Source", href: "https://github.com/laynierdev/codebasexplorer" },
    ],
  },
  {
    index: "02",
    slug: "architecter",
    name: "Architecter",
    tag: "System design studio",
    tagline: "From requirements to architecture.",
    description:
      "An AI-assisted design studio where the project is a structured document: components, decisions, risks and alternatives. The diagram is a view of it, and an animated simulation plays a request through the system one connection at a time.",
    highlights: ["Animated flow simulation", "ADR export", "Works with a built-in mock AI"],
    stack: ["Next.js", "React Flow", "TypeScript", "Gemini"],
    accent: "#4da3ff",
    image: { src: "/work/architecter-poster.webp", width: 1600, height: 1000, alt: "Architecter flow simulation: a pulse of light travelling along the connections of an architecture diagram" },
    video: "/work/architecter-flow.mp4",
    links: [
      { label: "Live demo", href: "https://architecter-rho.vercel.app" },
      { label: "Source", href: "https://github.com/laynierdev/architecter" },
    ],
  },
  {
    index: "03",
    slug: "mobileroad",
    name: "MobileRoad",
    tag: "Product",
    tagline: "From app idea to production.",
    description:
      "A roadmap and project tracker that guides non-technical founders through building, testing, publishing and maintaining a mobile app. Local-first by design, with Gemini when a key is present and an offline mock when it is not.",
    highlights: ["82 automated tests", "Local-first, no account needed", "Progress computed from real data"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Gemini"],
    accent: "#2fd1b9",
    image: { src: "/work/mobileroad.webp", width: 1600, height: 1000, alt: "MobileRoad dashboard with KPI cards, overall progress, milestones and a monthly timeline" },
    links: [{ label: "Live demo", href: "https://mobile-road.vercel.app" }],
  },
  {
    index: "04",
    slug: "vigil",
    name: "Vigil",
    tag: "Vertical SaaS demo",
    tagline: "Every case, three sources, one alert.",
    description:
      "A case-monitoring app for small immigration law firms. Simulated court, USCIS and custody sources feed a deterministic change-detection engine that raises an alert when something moves. Entirely fictional data, in English and Spanish.",
    highlights: ["Deterministic simulation engine", "EN / ES interface", "Playwright end-to-end tests"],
    stack: ["Next.js", "TypeScript", "Vitest", "Playwright"],
    accent: "#ffb454",
    image: { src: "/work/vigil.png", width: 1600, height: 1000, alt: "Vigil dashboard listing cases and the alerts raised after a simulated daily check" },
    links: [{ label: "Live demo", href: "https://vigil-and-docket.vercel.app/login" }],
  },
];

export const experience = [
  {
    years: "2024 — Now",
    company: "NTSprint LLC",
    role: "Software Developer Engineer",
    note: "Ryvar scheduling and bulk import, Stripe billing, Auth0 roles, and an AI conversational checkout with Semantic Kernel tool calling.",
    stack: ["Next.js", "Node.js", ".NET", "Prisma", "Stripe", "Auth0", "Azure"],
  },
  {
    years: "2020 — 2024",
    company: "Bidaiondo SL",
    role: "Software Developer Engineer",
    note: "A payment gateway, a Pentaho reporting dashboard and an enterprise management system for an international client.",
    stack: ["PHP", "Laravel", "MySQL", "Pentaho"],
  },
  {
    years: "2015 — 2020",
    company: "University of Informatics Sciences",
    role: "Software Developer Engineer",
    note: "XEDRO-GESPRO on Redmine and Rails, a virtual-learning platform, and Sainux, a C++ industrial SCADA system.",
    stack: ["Ruby on Rails", "C++", "PostgreSQL"],
  },
] as const;

export const capabilities = [
  {
    title: "AI & agents",
    items: ["Tool calling", "Agent loops", "MCP servers", "Semantic Kernel", "Gemini API", "Grounding and verification"],
  },
  {
    title: "Full-stack",
    items: ["TypeScript", "Next.js and React", "Node.js", "C# and .NET", "MySQL, PostgreSQL", "Prisma"],
  },
  {
    title: "Quality",
    items: ["Vitest", "Playwright", "CI", "WCAG audits", "Strict typing"],
  },
  {
    title: "Platform",
    items: ["Vercel", "Azure", "Stripe Connect", "Auth0", "Firebase", "REST APIs"],
  },
] as const;

export const research = [
  {
    year: "2019",
    title: "Semantic enrichment over words vector space in short texts generated by Project Management tools",
    venue: "CIbSE",
  },
  {
    year: "2018",
    title: "Contextual cosine to semantically enrich and compare short texts generated by Project Management tools",
    venue: "Cuban Journal of Computer Informatics",
  },
] as const;
