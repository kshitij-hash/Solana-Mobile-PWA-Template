import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Solana Mobile PWA",
  description: "Production-ready PWA template for Solana Mobile with MWA integration",

  ignoreDeadLinks: [
    /localhost/,
  ],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#9945FF' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Solana Mobile PWA Template' }],
    ['meta', { property: 'og:description', content: 'Production-ready PWA template for Solana Mobile' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'TWA', link: '/twa/overview' },
      { text: 'Components', link: '/components/overview' },
      { text: 'CLI', link: '/cli/usage' },
      {
        text: 'Links',
        items: [
          { text: 'Live Demo', link: 'https://solana-pwa-template.vercel.app' },
          { text: 'npm Package', link: 'https://www.npmjs.com/package/create-solana-pwa' },
          { text: 'GitHub', link: 'https://github.com/kshitij-hash/Solana-Mobile-PWA-Template' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        },
        {
          text: 'Core Features',
          items: [
            { text: 'Mobile Wallet Adapter', link: '/guide/mwa' },
            { text: 'PWA Features', link: '/guide/pwa-features' },
            { text: 'Safe Areas', link: '/guide/safe-areas' }
          ]
        },
        {
          text: 'Customization',
          items: [
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Navigation', link: '/guide/navigation' },
            { text: 'Branding', link: '/guide/branding' }
          ]
        }
      ],
      '/twa/': [
        {
          text: 'TWA Guide',
          items: [
            { text: 'Overview', link: '/twa/overview' },
            { text: 'Setup', link: '/twa/setup' },
            { text: 'Building', link: '/twa/building' },
            { text: 'Chrome Preference', link: '/twa/chrome-preference' },
            { text: 'Digital Asset Links', link: '/twa/asset-links' },
            { text: 'Troubleshooting', link: '/twa/troubleshooting' }
          ]
        },
        {
          text: 'Publishing',
          items: [
            { text: 'dApp Store', link: '/twa/dapp-store' },
          ]
        }
      ],
      '/components/': [
        {
          text: 'UI Components',
          items: [
            { text: 'Overview', link: '/components/overview' },
            { text: 'Splash Screen', link: '/components/splash-screen' },
            { text: 'Bottom Navigation', link: '/components/bottom-nav' },
            { text: 'Pull to Refresh', link: '/components/pull-to-refresh' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'Animated Components', link: '/components/animated' }
          ]
        },
        {
          text: 'Wallet',
          items: [
            { text: 'Wallet Provider', link: '/components/wallet-provider' },
            { text: 'Wallet Button', link: '/components/wallet-button' }
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI Tool',
          items: [
            { text: 'Usage', link: '/cli/usage' },
            { text: 'Options', link: '/cli/options' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kshitij-hash/Solana-Mobile-PWA-Template' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/create-solana-pwa' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Built for the Solana Mobile ecosystem'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/kshitij-hash/Solana-Mobile-PWA-Template/edit/main/docs-site/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
