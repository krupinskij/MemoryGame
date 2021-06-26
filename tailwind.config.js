const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.svelte'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray
    },
    extend: {
      backgroundImage: {
        'game': "url('/img/background/bg-game.png')",
        'loading': "url('/img/background/bg-loading.webp')",
        'login': "url('/img/background/bg-login.gif')",
        'ranking': "url('/img/background/bg-ranking.gif')",
        'register': "url('/img/background/bg-register.gif')"
      },
      backgroundColor: {
        'component': 'rgba(0, 0, 0, 0.7)'
      },
      gridTemplateRows: {
        'game': '80px 1fr 50px'
      },
      gridTemplateColumns: {
        'modal': '2fr 1fr'
      },
      boxShadow: {
        'component': '3px 5px 7px black'
      },
      maxWidth: {
        '4-4': '40vw',
        '4-6': '60vw',
        '4-8': '75vw',
        '6-12': '75vw'
      },
      maxHeight: {
        'max-w': '100vw'
      },
      minHeight: {
        '1/2': '50%'
      },
      margin: {
        m4px: '-4px'
      }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      zIndex: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(function({ addVariant, e }) {
      addVariant('merged-middle', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.merged > .${e(`merged-middle${separator}${className}`)}:not(:first-child):not(:last-child)`
        })
      })
    }),
    plugin(function({ addVariant, e }) {
      addVariant('merged-first', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.merged > .${e(`merged-first${separator}${className}`)}:first-child`
        })
      })
    }),
    plugin(function({ addVariant, e }) {
      addVariant('merged-last', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.merged > .${e(`merged-last${separator}${className}`)}:last-child`
        })
      })
    })
  ],
}
