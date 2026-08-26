# playos-foundation
Public website, governance, roadmap, community guidelines, branding, and organizational resources for the PlayOS Foundation.

## Website

The PlayOS website is built with [Astro](https://astro.build/) and
[Starlight](https://starlight.astro.build/) in [`site/`](site/). It is published
to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`.

- Live: <https://playos.dev/>
- Local dev: `cd site && npm install && npm run dev`
- Build: `npm run build` (outputs to `site/dist/`)
- Typecheck: `npm run check`
