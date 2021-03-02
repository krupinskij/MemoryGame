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
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
