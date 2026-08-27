# playos-foundation
Public website, governance, roadmap, community guidelines, branding, and organizational resources for the PlayOS Foundation.

## Website

The PlayOS website is a static, dependency-free site (hand-written HTML/CSS, no
build step) in [`site/`](site/). It is published to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`.

- Live: <https://playos.dev/>
- Local preview: open `site/index.html`, or run `python3 -m http.server -d site`
