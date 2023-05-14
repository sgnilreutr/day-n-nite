const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx'],
  theme: {
    fontFamily: {
      ...fontFamily,
    },
    extend: {
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /gap-/,
    },
    {
      pattern: /items-/,
    },
    {
      pattern: /justify-/,
    },
  ],
}
