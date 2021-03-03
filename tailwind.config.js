module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'game': "url('/img/background/bg-game.png')"
      },
      backgroundColor: {
        'component': 'rgba(0, 0, 0, 0.7)'
      },
      gridTemplateRows: {
        'game': '80px 1fr 50px'
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
        '4-4': '100vw',
        '4-6': '100vw',
        '4-8': '100vw',
        '6-12': '100vw'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
