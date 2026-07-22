import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

export default defineConfig({
  title: 'Ahmed Enterprise AI Workspace',
  description: 'Enterprise AI Engineering Workspace for OpenCode — 21 agents, 112 skills, 21 commands, 16 playbooks, 35 knowledge docs',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  base: '/Ahmed-Enterprise-AI-Workspace/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Ahmed-Enterprise-AI-Workspace/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Ahmed Enterprise AI Workspace' }],
    ['meta', { name: 'og:description', content: 'Enterprise AI Engineering Workspace for OpenCode — 21 agents, 112 skills, 21 commands, 16 playbooks' }],
    ['meta', { name: 'og:image', content: '/Ahmed-Enterprise-AI-Workspace/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Ahmed Enterprise AI Workspace' }],
    ['meta', { name: 'twitter:description', content: 'Enterprise AI Engineering Workspace for OpenCode' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/quick-start' },
          {
            text: 'Components',
            items: [
              { text: 'Agents', link: '/agents/' },
              { text: 'Skills', link: '/skills/' },
              { text: 'Commands', link: '/commands/' },
              { text: 'Playbooks', link: '/playbooks/' },
              { text: 'Generators', link: '/generators/' },
              { text: 'Knowledge Base', link: '/knowledge/' },
            ]
          },
          {
            text: 'Resources',
            items: [
              { text: 'Architecture', link: '/architecture' },
              { text: 'Tutorials', link: '/tutorials/' },
              { text: 'Examples', link: '/examples/' },
            { text: 'Release Notes', link: '/release-notes/v1.2' },
          ]
          },
          { text: 'v1.2', items: [
            { text: 'v1.2 Stable', link: '/release-notes/v1.2' },
            { text: 'v1.1', link: '/release-notes/v1.1' },
            { text: 'v1.0', link: '/release-notes/v1.0' },
          ]}
        ],
        sidebar,
        editLink: {
          pattern: 'https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright 2026 Ahmed Hassaan'
        },
        outline: {
          label: 'On this page',
          level: [2, 3]
        },
        lastUpdated: {
          text: 'Last updated',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
      }
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      dir: 'rtl',
      themeConfig: {
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'الدليل', link: '/ar/quick-start' },
          {
            text: 'المكونات',
            items: [
              { text: 'الوكلاء', link: '/ar/agents/' },
              { text: 'المهارات', link: '/ar/skills/' },
              { text: 'الأوامر', link: '/ar/commands/' },
              { text: 'كتب الإرشاد', link: '/ar/playbooks/' },
              { text: 'المولّدات', link: '/ar/generators/' },
              { text: 'قاعدة المعرفة', link: '/ar/knowledge/' },
            ]
          },
          {
            text: 'الموارد',
            items: [
              { text: 'الهيكلة', link: '/ar/architecture' },
              { text: 'الدروس التعليمية', link: '/ar/tutorials/' },
              { text: 'الأمثلة', link: '/ar/' },
              { text: 'سجل الإصدارات', link: '/ar/release-notes/v1.2' },
            ]
          },
          { text: 'v1.2', items: [
            { text: 'v1.2 مستقر', link: '/ar/release-notes/v1.2' },
            { text: 'v1.1', link: '/ar/release-notes/v1.1' },
            { text: 'v1.0', link: '/ar/release-notes/v1.0' },
          ]}
        ],
        sidebar: [
          {
            text: 'البدء',
            items: [
              { text: 'المقدمة', link: '/ar/' },
              { text: 'التثبيت', link: '/ar/installation' },
              { text: 'البدء السريع', link: '/ar/quick-start' },
              { text: 'الهيكلة العامة', link: '/ar/architecture' },
            ]
          },
          {
            text: 'مساحة العمل',
            items: [
              { text: 'نظرة عامة', link: '/ar/workspace-overview' },
              { text: 'هيكل المجلدات', link: '/ar/folder-structure' },
              { text: 'المعجم', link: '/ar/glossary' },
              { text: 'الأسئلة الشائعة', link: '/ar/faq' },
            ]
          },
          {
            text: 'الوكلاء',
            collapsed: false,
            items: [
              { text: 'نظرة عامة', link: '/ar/agents/' },
              { text: 'الوكلاء الـ 21', link: '/ar/agents/' },
            ]
          },
          {
            text: 'المهارات',
            collapsed: false,
            items: [
              { text: 'نظرة عامة', link: '/ar/skills/' },
              { text: 'المهارات الـ 112', link: '/ar/skills/' },
            ]
          },
          {
            text: 'الأوامر',
            collapsed: false,
            items: [
              { text: 'نظرة عامة', link: '/ar/commands/' },
              { text: 'الأوامر الـ 21', link: '/ar/commands/' },
            ]
          },
          {
            text: 'الدروس التعليمية',
            collapsed: false,
            items: [
              { text: 'نظرة عامة', link: '/ar/tutorials/' },
              { text: 'البدء السريع', link: '/ar/tutorials/getting-started' },
              { text: 'إضافةوكيل جديد', link: '/ar/tutorials/custom-agent' },
              { text: 'الأفضل', link: '/ar/tutorials/best-practices' },
            ]
          },
          {
            text: 'ملاحظات الإصدار',
            collapsed: false,
            items: [
              { text: 'v1.2 مستقر', link: '/ar/release-notes/v1.2' },
              { text: 'v1.1', link: '/ar/release-notes/v1.1' },
              { text: 'v1.0', link: '/ar/release-notes/v1.0' },
            ]
          },
        ],
        editLink: {
          pattern: 'https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace/edit/main/docs/:path',
          text: 'تعديل هذه الصفحة على GitHub'
        },
        footer: {
          message: 'released under the MIT License.',
          copyright: 'Copyright 2026 Ahmed Hassaan'
        },
        outline: {
          label: 'في هذه الصفحة',
          level: [2, 3]
        },
        lastUpdated: {
          text: 'آخر تحديث',
        },
        docFooter: {
          prev: 'السابق',
          next: 'التالي'
        },
        returnToTopLabel: 'العودة للأعلى',
        sidebarMenuLabel: 'القائمة',
        darkModeSwitchLabel: 'المظهر',
        lightModeSwitchTitle: 'التبديل إلى الوضع الفاتح',
        darkModeSwitchTitle: 'التبديل إلى الوضع الداكن',
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI Workspace',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search docs',
            buttonAriaLabel: 'Search docs'
          },
          modal: {
            displayDetails: 'Display details',
            resetButtonTitle: 'Clear query',
            backButtonTitle: 'Back',
            noResultsText: 'No results found',
            footer: {
              selectText: 'select',
              navigateText: 'navigate',
              closeText: 'close'
            }
          }
        }
      }
    },
  },

  markdown: {
    lineNumbers: true,
    math: false,
    config: (md) => {
      md.use((md) => {
        const defaultRender = md.renderer.rules.fence.bind(md.renderer.rules)
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          if (token.info === 'mermaid') {
            return `<div class="mermaid">${md.utils.escapeHtml(token.content)}</div>`
          }
          return defaultRender(tokens, idx, options, env, self)
        }
      })
    }
  },

  vite: {
    plugins: [],
  }
})
