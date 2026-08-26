# AGENTS.md — playos-foundation

Guidance for AI agents and contributors working in this repository.

## What this repository is

Organizational home of the **PlayOS Foundation**: public website, governance,
roadmap, community guidelines, branding, and press/organizational resources.
It contains **no platform code** and does **not** define platform behavior.

## Golden rules

1. **No platform behavior here.** Platform contracts live in `playos-spec`. If a
   change would define how PlayOS behaves, it belongs in the spec, not here.
2. **Governance and community.** Charter, governance model, code of conduct,
   community guidelines, and roadmap are the focus.
3. **Branding integrity.** Keep brand assets and usage guidelines consistent;
   do not introduce conflicting names or logos.
4. **Accuracy over hype.** Public materials should match the current state of
   the specification and implementations.

## Website (`site/`)

- Built with **Astro + Starlight** (npm project). Commands run in `site/`:
  `npm run dev` (dev server), `npm run build` (outputs `site/dist/`),
  `npm run check` (typecheck), `npm run preview` (serve the build).
- **Every push to `main` auto-deploys `site/dist/` to GitHub Pages** via
  `.github/workflows/deploy.yml` (npm ci + build + upload artifact). Changes to
  `site/` go live at <https://playos.dev/> as soon as they merge; review
  accuracy carefully.
- Content lives in `site/src/content/docs/*.mdx` — one page per section. The
  roadmap is `roadmap.mdx` — update it in place there, not in a separate doc.
- Theme is `site/src/styles/custom.css`, overriding Starlight tokens with the
  PlayOS dark skin. The site is **dark-only**: the theme toggle is hidden via
  CSS and `astro.config.mjs` forces `data-theme="dark"`.
- Static assets go in `site/public/` (screenshots in
  `site/public/assets/pos_screenshots/`, `og.png` in `public/assets/`). Keep
  `site/public/.nojekyll`.
- Starlight gotchas:
  - Raw HTML in MDX must be well-formed JSX: self-close void elements
    (`<img … />`).
  - Raw `<script>` blocks fail MDX parsing — put interactive JS in
    `src/components/*.astro` instead (see `Carousel.astro`).
  - YAML block scalars in frontmatter (e.g. `hero.image.html`) need consistent
    indentation, or the frontmatter silently breaks.
  - Do not add `src/pages/404.astro`; it collides with Starlight's built-in
    404 route.

## Where things go

- Website source, governance docs, branding assets, and community resources.
- Anything defining PlayOS behavior → `playos-spec`.

## Task workflow

- Issues use the `Task` template and are labeled `agent-ready`; acceptance
  criteria in the template are part of the contract.
- Keep `.github/copilot-instructions.md` in sync when changing rules here.
