# Laynier Piedra, portfolio

Personal portfolio of Laynier Piedra, full-stack developer building AI-assisted and agentic products.

It presents four case studies (CodebaseXplorer, Architecter, MobileRoad and Vigil), a short bio, experience and contact details.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Motion for scroll-linked animation, Lenis for inertial scrolling
- Three.js with React Three Fiber for the hero particle field, loaded after the first paint
- Plain CSS design system, no UI framework

## Accessibility and performance

- Respects `prefers-reduced-motion`: no smooth scrolling, no boot sequence, a still particle field.
- The custom cursor is an overlay only; the native cursor is never hidden.
- Skip link, semantic landmarks, visible focus styles.
- The WebGL scene is lighter on small screens and loads after the first paint.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. All copy lives in `src/data/content.ts`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | Lint, typecheck and build |
