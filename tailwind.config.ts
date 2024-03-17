module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: ['transparent']
    }
  },
  variants: {
    extend: {
      backgroundClip: ['responsive']
    }
  },

  plugins: [
    require('@tailwindcss/typography')
  ],

}