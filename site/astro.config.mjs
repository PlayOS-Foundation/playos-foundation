import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repo = 'https://github.com/PlayOS-Foundation/playos-foundation';

export default defineConfig({
  site: 'https://playos.dev',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'PlayOS',
      description:
        'A fast, open, controller-first console operating system for handheld gaming PCs.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: true,
      },
      social: [{ icon: 'github', label: 'GitHub', href: repo }],
      lastUpdated: false,
      editLink: {
        baseUrl: `${repo}/edit/main/site/`,
      },
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0a0c0f' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://playos.dev/assets/og.png' },
        },
        {
          tag: 'script',
          content: 'document.documentElement.dataset.theme = "dark";',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'PlayOS',
          items: [
            { label: 'Home', link: '/' },
            { label: 'Features', link: '/features/' },
            { label: 'Screenshots', link: '/screenshots/' },
          ],
        },
        {
          label: 'Platform',
          items: [
            { label: 'Architecture', link: '/architecture/' },
            { label: 'Repositories', link: '/repositories/' },
          ],
        },
        {
          label: 'Project',
          items: [{ label: 'Roadmap', link: '/roadmap/' }],
        },
      ],
    }),
  ],
});
